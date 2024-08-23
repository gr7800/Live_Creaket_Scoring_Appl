import React, { useState, useEffect } from 'react';
import { getMatchById, updateMatch } from '../services/Api';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateMatchComponent = () => {
  const [match, setMatch] = useState(null);
  const [message, setMessage] = useState('');
  const [expandedBatsmen, setExpandedBatsmen] = useState({});
  const [expandedBowlers, setExpandedBowlers] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchMatch = async () => {
      const data = await getMatchById(id);
      setMatch(data);
    };
    fetchMatch();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedMatch = await updateMatch(id, match);
      setMatch(updatedMatch);
      toast.success('Match updated successfully!');
    } catch (error) {
      toast.error(error.message);
      setMessage('Failed to update match');
    }
  };

  const handleInputChange = (field, value) => {
    setMatch((prevMatch) => ({
      ...prevMatch,
      [field]: value,
    }));
  };

  const handleNestedInputChange = (path, value) => {
    const updatedMatch = { ...match };
    let field = updatedMatch;
    const keys = path.split('.');
    keys.slice(0, -1).forEach((key) => {
      field = field[key];
    });
    field[keys[keys.length - 1]] = value;
    setMatch(updatedMatch);
    updateTotals(updatedMatch, keys);
  };

  const updateTotals = (updatedMatch, keys) => {
    if (keys.includes('batsmen') || keys.includes('bowlers')) {
      const inningIndex = keys[1];
      const inning = updatedMatch.innings[inningIndex];

      const totalRuns = inning.batsmen.reduce((acc, batsman) => acc + Number(batsman.runs || 0), 0);
      const totalWickets = inning.bowlers.reduce((acc, bowler) => acc + Number(bowler.wickets || 0), 0);

      inning.runs = totalRuns;
      inning.wickets = totalWickets;

      setMatch({ ...updatedMatch });
    }
  };

  const toggleBatsmanExpansion = (inningIndex, batsmanIndex) => {
    setExpandedBatsmen((prevExpanded) => ({
      ...prevExpanded,
      [`${inningIndex}-${batsmanIndex}`]: !prevExpanded[`${inningIndex}-${batsmanIndex}`],
    }));
  };

  const toggleBowlerExpansion = (inningIndex, bowlerIndex) => {
    setExpandedBowlers((prevExpanded) => ({
      ...prevExpanded,
      [`${inningIndex}-${bowlerIndex}`]: !prevExpanded[`${inningIndex}-${bowlerIndex}`],
    }));
  };

  const addPlayer = (type, inningIndex) => {
    const updatedMatch = { ...match };
    if (type === 'batsman') {
      updatedMatch.innings[inningIndex].batsmen.push({
        name: '',
        runs: 0,
        balls: 0,
      });
    } else if (type === 'bowler') {
      updatedMatch.innings[inningIndex].bowlers.push({
        name: '',
        overs: 0,
        runs: 0,
        wickets: 0,
      });
    }
    setMatch(updatedMatch);
  };

  const removePlayer = (type, inningIndex, playerIndex) => {
    const updatedMatch = { ...match };
    if (type === 'batsman') {
      updatedMatch.innings[inningIndex].batsmen.splice(playerIndex, 1);
    } else if (type === 'bowler') {
      updatedMatch.innings[inningIndex].bowlers.splice(playerIndex, 1);
    }
    updateTotals(updatedMatch, []);
  };

  console.log(match,"match")

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Update Match</h2>
      {match ? (
        <form onSubmit={handleUpdate} className="space-y-8">
          {/* Update Match Status */}
          <div className="p-6 border border-gray-200 rounded-lg bg-gray-50 shadow-sm">
            <h3 className="text-lg font-bold text-blue-600 mb-4">Match Status</h3>
            <select
              value={match.matchStatus}
              onChange={(e) => handleInputChange('matchStatus', e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="scheduled">Scheduled</option>
              <option value="in_progress">Live</option>
              <option value="completed">Completed</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>

          {/* Update Teams */}
          <div className="p-6 border border-gray-200 rounded-lg bg-gray-50 shadow-sm">
            <h3 className="text-lg font-bold text-blue-600 mb-4">Teams</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Team A</label>
                <input
                  type="text"
                  value={match.teams.teamA}
                  onChange={(e) => handleNestedInputChange('teams.teamA', e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Team B</label>
                <input
                  type="text"
                  value={match.teams.teamB}
                  onChange={(e) => handleNestedInputChange('teams.teamB', e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Update Innings */}
          {match.innings.map((inning, inningIndex) => (
            <div key={inningIndex} className="p-6 border border-gray-200 rounded-lg bg-gray-50 shadow-sm">
              <h3 className="text-lg font-bold text-blue-600 mb-4">Inning {inningIndex + 1}</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Batting Team</label>
                  <input
                    type="text"
                    value={inning.battingTeam}
                    onChange={(e) => handleNestedInputChange(`innings.${inningIndex}.battingTeam`, e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Bowling Team</label>
                  <input
                    type="text"
                    value={inning.bowlingTeam}
                    onChange={(e) => handleNestedInputChange(`innings.${inningIndex}.bowlingTeam`, e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Runs</label>
                  <input
                    type="number"
                    value={inning.runs}
                    onChange={(e) => handleNestedInputChange(`innings.${inningIndex}.runs`, e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Wickets</label>
                  <input
                    type="number"
                    value={inning.wickets}
                    onChange={(e) => handleNestedInputChange(`innings.${inningIndex}.wickets`, e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Overs</label>
                  <input
                    type="number"
                    value={inning.overs}
                    onChange={(e) => handleNestedInputChange(`innings.${inningIndex}.overs`, e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Update Batsmen */}
              <h4 className="text-md font-bold text-blue-500 mt-6">Batsmen</h4>
              {inning.batsmen.map((batsman, batsmanIndex) => (
                <div key={batsmanIndex} className="mt-4">
                  <div
                    className="cursor-pointer text-gray-700 font-semibold mb-1"
                    onClick={() => toggleBatsmanExpansion(inningIndex, batsmanIndex)}
                  >
                    Batsman {batsmanIndex + 1}: {batsman.name || 'New Batsman'}{' '}
                    <span className="text-blue-500">{expandedBatsmen[`${inningIndex}-${batsmanIndex}`] ? '▲' : '▼'}</span>
                  </div>
                  {expandedBatsmen[`${inningIndex}-${batsmanIndex}`] && (
                    <div className="grid grid-cols-2 gap-6 mt-2">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-1">Name</label>
                        <input
                          type="text"
                          value={batsman.name}
                          onChange={(e) =>
                            handleNestedInputChange(`innings.${inningIndex}.batsmen.${batsmanIndex}.name`, e.target.value)
                          }
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-1">Runs</label>
                        <input
                          type="number"
                          value={batsman.runs}
                          onChange={(e) =>
                            handleNestedInputChange(`innings.${inningIndex}.batsmen.${batsmanIndex}.runs`, e.target.value)
                          }
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-1">Balls</label>
                        <input
                          type="number"
                          value={batsman.balls}
                          onChange={(e) =>
                            handleNestedInputChange(`innings.${inningIndex}.batsmen.${batsmanIndex}.balls`, e.target.value)
                          }
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removePlayer('batsman', inningIndex, batsmanIndex)}
                        className="col-span-2 mt-2 px-4 py-2 bg-red-500 text-white font-semibold rounded-md shadow hover:bg-red-700 focus:outline-none"
                      >
                        Remove Batsman
                      </button>
                    </div>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addPlayer('batsman', inningIndex)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none"
              >
                Add Batsman
              </button>

              {/* Update Bowlers */}
              <h4 className="text-md font-bold text-blue-500 mt-6">Bowlers</h4>
              {inning.bowlers.map((bowler, bowlerIndex) => (
                <div key={bowlerIndex} className="mt-4">
                  <div
                    className="cursor-pointer text-gray-700 font-semibold mb-1"
                    onClick={() => toggleBowlerExpansion(inningIndex, bowlerIndex)}
                  >
                    Bowler {bowlerIndex + 1}: {bowler.name || 'New Bowler'}{' '}
                    <span className="text-blue-500">{expandedBowlers[`${inningIndex}-${bowlerIndex}`] ? '▲' : '▼'}</span>
                  </div>
                  {expandedBowlers[`${inningIndex}-${bowlerIndex}`] && (
                    <div className="grid grid-cols-2 gap-6 mt-2">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-1">Name</label>
                        <input
                          type="text"
                          value={bowler.name}
                          onChange={(e) =>
                            handleNestedInputChange(`innings.${inningIndex}.bowlers.${bowlerIndex}.name`, e.target.value)
                          }
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-1">Overs</label>
                        <input
                          type="number"
                          value={bowler.overs}
                          onChange={(e) =>
                            handleNestedInputChange(`innings.${inningIndex}.bowlers.${bowlerIndex}.overs`, e.target.value)
                          }
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-1">Runs</label>
                        <input
                          type="number"
                          value={bowler.runs}
                          onChange={(e) =>
                            handleNestedInputChange(`innings.${inningIndex}.bowlers.${bowlerIndex}.runs`, e.target.value)
                          }
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-1">Wickets</label>
                        <input
                          type="number"
                          value={bowler.wickets}
                          onChange={(e) =>
                            handleNestedInputChange(`innings.${inningIndex}.bowlers.${bowlerIndex}.wickets`, e.target.value)
                          }
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removePlayer('bowler', inningIndex, bowlerIndex)}
                        className="col-span-2 mt-2 px-4 py-2 bg-red-500 text-white font-semibold rounded-md shadow hover:bg-red-700 focus:outline-none"
                      >
                        Remove Bowler
                      </button>
                    </div>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addPlayer('bowler', inningIndex)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none"
              >
                Add Bowler
              </button>
            </div>
          ))}

          {/* Save Button */}
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none"
            >
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <p>Loading...</p>
      )}
      {message && <p className="text-red-600 mt-4 text-center">{message}</p>}
    </div>
  );
};

export default UpdateMatchComponent;

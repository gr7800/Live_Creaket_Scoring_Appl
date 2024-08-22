// src/components/UpdateMatch.js
import React, { useState, useEffect } from 'react';
import { getMatch, getMatchById, updateMatch} from '../services/Api';
import { useParams } from 'react-router-dom';

const UpdateMatchComponent = () => {
  const [match, setMatch] = useState(null);
  const [message, setMessage] = useState('');
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
      let temp=await updateMatch(id, match);
      setMatch(temp);
      if(temp){
        alert('Match updated successfully');
      }
    } catch (error) {
      setMessage('Failed to update match');
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedMatch = { ...match };
    updatedMatch.innings[index][field] = value;
    setMatch(updatedMatch);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Update Match</h2>
      {match ? (
        <form onSubmit={handleUpdate}>
          {match.innings.map((inning, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold">Inning {index + 1}</h3>
              <div className="mb-2">
                <label className="block text-gray-700">Runs</label>
                <input
                  type="number"
                  value={inning.runs}
                  onChange={(e) => handleInputChange(index, 'runs', e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Wickets</label>
                <input
                  type="number"
                  value={inning.wickets}
                  onChange={(e) => handleInputChange(index, 'wickets', e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Overs</label>
                <input
                  type="number"
                  value={inning.overs}
                  onChange={(e) => handleInputChange(index, 'overs', e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Balls</label>
                <input
                  type="number"
                  value={inning.balls}
                  onChange={(e) => handleInputChange(index, 'balls', e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          ))}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Update Match
          </button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default UpdateMatchComponent;

import React, { useState } from 'react';
import { createMatch } from '../services/Api'; // Assume this is your API service
import { toast } from 'react-toastify';

const ScheduleMatchComponent = () => {
    const [match, setMatch] = useState({
        teams: {
            teamA: 'Team A',
            teamB: 'Team B',
        },
        innings: [
            {
                battingTeam: 'Team A',
                bowlingTeam: 'Team B',
                runs: 0,
                wickets: 0,
                overs: 0,
                balls: 0,
                batsmen: [
                    {
                        name: 'Batsman1',
                        runs: 0,
                        balls: 0,
                    },
                ],
                bowlers: [
                    {
                        name: 'Bowler1',
                        overs: 0,
                        runs: 0,
                        wickets: 0,
                    },
                ],
            },
            {
                battingTeam: 'Team B',
                bowlingTeam: 'Team A',
                runs: 0,
                wickets: 0,
                overs: 0,
                balls: 0,
                batsmen: [
                    {
                        name: 'Batsman1',
                        runs: 0,
                        balls: 0,
                    },
                ],
                bowlers: [
                    {
                        name: 'Bowler1',
                        overs: 0,
                        runs: 0,
                        wickets: 0,
                    },
                ],
            },
        ],
        currentInning: 0,
        matchStatus: 'scheduled',
    });

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
    };

    const handleAddInning = () => {
        setMatch((prevMatch) => ({
            ...prevMatch,
            innings: [
                ...prevMatch.innings,
                {
                    battingTeam: '',
                    bowlingTeam: '',
                    runs: 0,
                    wickets: 0,
                    overs: 0,
                    balls: 0,
                    batsmen: [
                        {
                            name: '',
                            runs: 0,
                            balls: 0,
                        },
                    ],
                    bowlers: [
                        {
                            name: '',
                            overs: 0,
                            runs: 0,
                            wickets: 0,
                        },
                    ],
                },
            ],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const temp = await createMatch(match);
            if (temp) {
                toast.success('Match scheduled successfully!');
                setMatch({
                    teams: { teamA: '', teamB: '' },
                    innings: [],
                    currentInning: 0,
                    matchStatus: 'scheduled',
                });
            }
        } catch (error) {
            toast.error('Failed to schedule match');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Schedule Match</h2>
            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Team Inputs */}
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
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Team B</label>
                            <input
                                type="text"
                                value={match.teams.teamB}
                                onChange={(e) => handleNestedInputChange('teams.teamB', e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Match Status */}
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

                {/* Innings Section */}
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
                        </div>

                        <div className="grid grid-cols-2 gap-6 mt-4">
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Runs</label>
                                <input
                                    type="number"
                                    value={inning.runs}
                                    onChange={(e) => handleNestedInputChange(`innings.${inningIndex}.runs`, e.target.value)}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Wickets</label>
                                <input
                                    type="number"
                                    value={inning.wickets}
                                    onChange={(e) => handleNestedInputChange(`innings.${inningIndex}.wickets`, e.target.value)}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mt-4">
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Overs</label>
                                <input
                                    type="number"
                                    value={inning.overs}
                                    onChange={(e) => handleNestedInputChange(`innings.${inningIndex}.overs`, e.target.value)}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Balls</label>
                                <input
                                    type="number"
                                    value={inning.balls}
                                    onChange={(e) => handleNestedInputChange(`innings.${inningIndex}.balls`, e.target.value)}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        {/* Batsmen Section */}
                        {inning.batsmen.map((batsman, batsmanIndex) => (
                            <div key={batsmanIndex} className="grid grid-cols-2 gap-6 mt-4">
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-1">Batsman Name</label>
                                    <input
                                        type="text"
                                        value={batsman.name}
                                        onChange={(e) => handleNestedInputChange(`innings.${inningIndex}.batsmen.${batsmanIndex}.name`, e.target.value)}
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-1">Runs</label>
                                    <input
                                        type="number"
                                        value={batsman.runs}
                                        onChange={(e) => handleNestedInputChange(`innings.${inningIndex}.batsmen.${batsmanIndex}.runs`, e.target.value)}
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-1">Balls</label>
                                    <input
                                        type="number"
                                        value={batsman.balls}
                                        onChange={(e) => handleNestedInputChange(`innings.${inningIndex}.batsmen.${batsmanIndex}.balls`, e.target.value)}
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>
                        ))}

                        {/* Bowlers Section */}
                        {inning.bowlers.map((bowler, bowlerIndex) => (
                            <div key={bowlerIndex} className="grid grid-cols-2 gap-6 mt-4">
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-1">Bowler Name</label>
                                    <input
                                        type="text"
                                        value={bowler.name}
                                        onChange={(e) => handleNestedInputChange(`innings.${inningIndex}.bowlers.${bowlerIndex}.name`, e.target.value)}
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-1">Overs</label>
                                    <input
                                        type="number"
                                        value={bowler.overs}
                                        onChange={(e) => handleNestedInputChange(`innings.${inningIndex}.bowlers.${bowlerIndex}.overs`, e.target.value)}
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-1">Runs</label>
                                    <input
                                        type="number"
                                        value={bowler.runs}
                                        onChange={(e) => handleNestedInputChange(`innings.${inningIndex}.bowlers.${bowlerIndex}.runs`, e.target.value)}
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-1">Wickets</label>
                                    <input
                                        type="number"
                                        value={bowler.wickets}
                                        onChange={(e) => handleNestedInputChange(`innings.${inningIndex}.bowlers.${bowlerIndex}.wickets`, e.target.value)}
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                ))}

                <div className="flex justify-between mt-8">
                    <button
                        type="button"
                        onClick={handleAddInning}
                        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
                    >
                        Add Inning
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none"
                    >
                        Schedule Match
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ScheduleMatchComponent;

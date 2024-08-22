// src/components/CreateMatch.js
import React, { useState } from 'react';
import { createMatch } from '../services/Api';

const CreateMatch = () => {
  const [teamA, setTeamA] = useState('');
  const [teamB, setTeamB] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const matchData = {
      teams: {
        teamA,
        teamB
      },
      innings: [],
      matchStatus: 'not_started'
    };
    try {
      await createMatch(matchData);
      setMessage('Match created successfully');
    } catch (error) {
      setMessage('Failed to create match');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Create Match</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Team A</label>
          <input
            type="text"
            value={teamA}
            onChange={(e) => setTeamA(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Team B</label>
          <input
            type="text"
            value={teamB}
            onChange={(e) => setTeamB(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Create Match
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default CreateMatch;

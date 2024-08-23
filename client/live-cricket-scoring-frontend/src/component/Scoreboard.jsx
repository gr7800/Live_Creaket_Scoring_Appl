import React, { useState, useEffect } from 'react';
import { getMatchById } from '../services/Api'; // Assuming you have a function to get match by id
import { Link, useParams } from 'react-router-dom';
import vsgif from "../utils/img/vs.jfif";

const StatusBadge = ({ status }) => {
  const getStatusClass = () => {
    switch (status) {
      case 'canceled':
        return 'bg-red-500 text-white';
      case 'not_started':
        return 'bg-yellow-500 text-black';
      case 'scheduled':
        return 'bg-yellow-500 text-black';
      case 'completed':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-300 text-black';
    }
  };

  return (
    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusClass()}`}>
      {status.replace('_', ' ').toUpperCase()}
    </span>
  );
};

const Scoreboard = () => {
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    let intervalId;

    const fetchMatch = async () => {
      try {
        const data = await getMatchById(id);
        setMatch(data);
      } catch (error) {
        console.error('Error fetching match data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatch(); // Initial fetch

    if (match && match.matchStatus === 'in_progress') {
      intervalId = setInterval(() => {
        fetchMatch();
      }, 30000); // Fetch data every 30 seconds
    }

    return () => {
      if (intervalId) clearInterval(intervalId); // Clear the interval on component unmount
    };
  }, [id, match?.matchStatus]);

  if (loading) return <div className="text-center py-4">Loading...</div>;

  if (!match) return <div className="text-center py-4">No match data available</div>;

  if (match.matchStatus === 'scheduled') {
    return (
      <div className="bg-gray-100 p-4 rounded-lg shadow-lg mb-4 flex flex-col items-center">
        <h2 className="text-lg font-bold mb-2">Match Scheduled</h2>
        <p className="text-gray-700 pb-5">This match has not started yet. Please check back later.</p>
        <Link to={`/update/${match._id}`} className="p-3 bg-blue-600 text-white rounded-lg shadow-md text-center">
          Update Match
        </Link>
      </div>
    );
  }

  const currentInning = match.innings[match.currentInning - 1] || {};
  const otherInning = match.innings[match.currentInning % 2] || {};

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-4 flex flex-col">
      <div className="w-full flex justify-between items-center mb-4">
        <StatusBadge status={match.matchStatus} />
      </div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">{match.teams.teamA}</h3>
        <img src={vsgif} alt="Vs" width="100" height="100" className="rounded-full" />
        <h3 className="text-xl font-semibold">{match.teams.teamB}</h3>
      </div>
      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-2">Inning {match.currentInning}: {currentInning.battingTeam || 'N/A'}</h4>
        <p className="text-sm font-medium">Runs: {currentInning.runs || 0} | Wickets: {currentInning.wickets || 0} | Overs: {currentInning.overs || 0}</p>
      </div>
      <div className="mb-4">
        <h4 className="text-md font-semibold mb-2">Batsmen:</h4>
        <ul className="list-disc list-inside">
          {currentInning.batsmen?.length ? (
            currentInning.batsmen.map(batsman => (
              <li key={batsman._id}>
                {batsman.name}: {batsman.runs} runs ({batsman.balls} balls)
              </li>
            ))
          ) : (
            <li>No batsmen data available</li>
          )}
        </ul>
      </div>
      <div className="mb-4">
        <h4 className="text-md font-semibold mb-2">Bowlers:</h4>
        <ul className="list-disc list-inside">
          {otherInning.bowlers?.length ? (
            otherInning.bowlers.map(bowler => (
              <li key={bowler._id}>
                {bowler.name}: {bowler.wickets} wickets, {bowler.runs} runs ({bowler.overs} overs)
              </li>
            ))
          ) : (
            <li>No bowlers data available</li>
          )}
        </ul>
      </div>
      <div className="mb-4">
        <h4 className="text-md font-semibold mb-2">Inning {match.currentInning % 2 + 1}: {otherInning.battingTeam || 'N/A'}</h4>
        <p className="text-sm font-medium">Runs: {otherInning.runs || 0} | Wickets: {otherInning.wickets || 0} | Overs: {otherInning.overs || 0}</p>
      </div>
      <div className="mb-4">
        <h4 className="text-md font-semibold mb-2">Batsmen:</h4>
        <ul className="list-disc list-inside">
          {otherInning.batsmen?.length ? (
            otherInning.batsmen.map(batsman => (
              <li key={batsman._id}>
                {batsman.name}: {batsman.runs} runs ({batsman.balls} balls)
              </li>
            ))
          ) : (
            <li>No batsmen data available</li>
          )}
        </ul>
      </div>
      <div className="mb-4">
        <h4 className="text-md font-semibold mb-2">Bowlers:</h4>
        <ul className="list-disc list-inside">
          {currentInning.bowlers?.length ? (
            currentInning.bowlers.map(bowler => (
              <li key={bowler._id}>
                {bowler.name}: {bowler.wickets} wickets, {bowler.runs} runs ({bowler.overs} overs)
              </li>
            ))
          ) : (
            <li>No bowlers data available</li>
          )}
        </ul>
      </div>
      <Link to={`/update/${match._id}`} className="p-3 bg-blue-600 text-white rounded-lg shadow-md text-center">
        Update Match
      </Link>
    </div>
  );
};

export default Scoreboard;

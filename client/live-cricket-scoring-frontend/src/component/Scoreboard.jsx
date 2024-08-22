import React, { useState, useEffect } from 'react';
import { getMatchById } from '../services/Api'; // Assuming you have a function to get match by id
import { Link, useParams } from 'react-router-dom';
import vsgif from "../utils/img/vs.jfif"

const StatusBadge = ({ status }) => {
  const getStatusClass = () => {
    switch (status) {
      case 'not_started':
        return 'bg-yellow-300 text-black';
      case 'in_progress':
        return 'bg-red-300 text-white';
      case 'completed':
        return 'bg-green-300 text-white';
      default:
        return 'bg-gray-200 text-black';
    }
  };

  return (
    <p className={`p-1 font-medium ${getStatusClass()}`}>
      {status.replace('_', ' ').toUpperCase()}
    </p>
  );
};

const Scoreboard = () => {
  const [match, setMatch] = useState(null); // Initialize with null to handle loading state
  const [loading, setLoading] = useState(true); // Add a loading state
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

    if (match && match.matchStatus === 'in_progress') { // Only set up polling if match is live
      intervalId = setInterval(() => {
        fetchMatch();
      }, 30000); // Fetch data every 30 seconds
    }

    return () => {
      if (intervalId) clearInterval(intervalId); // Clear the interval on component unmount
    };
  }, [id, match?.matchStatus]); // Depend on matchStatus to trigger polling when the match becomes live

  if (loading) return <div>Loading...</div>; // Show loading state

  if (!match) return <div>No match data available</div>; // Handle no data case

  const currentInning = match.innings[match.currentInning - 1]; // Adjust for 0-based indexing
  const otherInning = match.innings[match.currentInning % 2]; // Get the other inning's data

  return (
    <div className="bg-gray-300 p-4 rounded-lg shadow-lg mb-4 flex flex-col">
      <div className="w-full flex justify-end">
        <StatusBadge status={match.matchStatus} />
      </div>
      <div className="w-full flex justify-between text-center max-h-[200px] items-center">
        <h3 className="text-lg font-bold mb-2">{match.teams.teamA}</h3>
        <div>
          <img src={vsgif} alt="Vs" width={"100px"} height={"100px"} className="rounded-full" />
        </div>
        <h3 className="text-lg font-bold mb-2">{match.teams.teamB}</h3>
      </div>
      <h3 className="text-lg font-semibold mb-2">Inning {match.currentInning}: {currentInning.battingTeam}</h3>
      <div className="mb-2">
        <span className="font-medium">Runs: {currentInning.runs}</span> |
        <span className="font-medium"> Wickets: {currentInning.wickets}</span> |
        <span className="font-medium"> Overs: {currentInning.overs}</span>
      </div>

      <h4 className="text-md font-semibold mb-2">Batsmen:</h4>
      <ul className="list-disc list-inside mb-4">
        {currentInning.batsmen.map((batsman) => (
          <li key={batsman._id}>
            {batsman.name}: {batsman.runs} runs ({batsman.balls} balls)
          </li>
        ))}
      </ul>

      <h4 className="text-md font-semibold mb-2">Bowlers:</h4>
      <ul className="list-disc list-inside mb-4">
        {otherInning.bowlers.map((bowler) => (
          <li key={bowler._id}>
            {bowler.name}: {bowler.wickets} wickets, {bowler.runs} runs ({bowler.overs} overs)
          </li>
        ))}
      </ul>

      <h3 className="text-lg font-semibold mb-2">Inning {match.currentInning % 2 + 1}: {otherInning.battingTeam}</h3>
      <div className="mb-2">
        <span className="font-medium">Runs: {otherInning.runs}</span> |
        <span className="font-medium"> Wickets: {otherInning.wickets}</span> |
        <span className="font-medium"> Overs: {otherInning.overs}</span>
      </div>

      <h4 className="text-md font-semibold mb-2">Batsmen:</h4>
      <ul className="list-disc list-inside mb-4">
        {otherInning.batsmen.map((batsman) => (
          <li key={batsman._id}>
            {batsman.name}: {batsman.runs} runs ({batsman.balls} balls)
          </li>
        ))}
      </ul>

      <h4 className="text-md font-semibold mb-2">Bowlers:</h4>
      <ul className="list-disc list-inside mb-4">
        {currentInning.bowlers.map((bowler) => (
          <li key={bowler._id}>
            {bowler.name}: {bowler.wickets} wickets, {bowler.runs} runs ({bowler.overs} overs)
          </li>
        ))}
      </ul>

      <Link to={`/update/${match?._id}`} className="p-2 w-fit m-auto bg-blue-600 text-white shadow-md rounded-sm cursor-pointer">
        Update Match
      </Link>

    </div>
  );
};

export default Scoreboard;

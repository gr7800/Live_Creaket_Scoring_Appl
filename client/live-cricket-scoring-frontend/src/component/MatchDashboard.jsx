import React, { useEffect, useState } from 'react';
import Scoreboard from "./Scoreboard"
import { getAllMatch } from '../services/Api';
import vsgif from "../utils/img/vs.jfif"
import { Link } from 'react-router-dom';

const MatchCard = ({ match }) => (
  <div className="bg-gray-400 p-4 rounded-lg shadow-lg mb-4">
    <div className="w-full flex justify-end"><p className="bg-white text-sm p-1 font-medium">{match.matchStatus}</p></div>
    <div className="w-full flex justify-between text-center max-h-[200px] items-center">
      <h3 className="text-lg font-bold mb-2">{match.teams.teamA}</h3>
      <div>
        <img src={vsgif} alt="Vs" width={"100px"} height={"100px"} className="rounded-full" />
      </div>
      <h3 className="text-lg font-bold mb-2">{match.teams.teamB}</h3>
    </div>
  </div>
);

const MatchDashboard = ({ matchId }) => {
  const [matches, setMatches] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      const data = await getAllMatch(matchId);
      console.log(data);
      setMatches(data);
    };
    fetchMatches();
  }, [matchId]);

  console.log(matches);

  return (
    <div className="container mx-auto p-4">
      {matches ? matches.map((match) => (
        <Link to={`/match/${match?._id}`}>
          <MatchCard key={match._id} match={match} />
        </Link>
      )) : <div>Loading...</div>}
    </div>
  );
};

export default MatchDashboard;
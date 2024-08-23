import React from 'react';
import MatchDashboard from "../component/MatchDashboard";
import Scoreboard from '../component/Scoreboard';
import { Navigate, useLocation } from 'react-router-dom';

const MatchDetails = ({ matchId }) => {
  const userAuth = localStorage.getItem('auth');
  const location = useLocation();

  // Redirect to login page if the user is not authenticated
  if (userAuth !== "true") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div>
      <Scoreboard />
    </div>
  );
};

export default MatchDetails;

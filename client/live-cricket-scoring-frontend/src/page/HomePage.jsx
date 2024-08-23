import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import MatchDashboard from '../component/MatchDashboard';

const Home = () => {
  const adminAuth = localStorage.getItem('adminauth');
  const userAuth = localStorage.getItem('auth');
  const location = useLocation();

  // Redirect to login page if the user is not authenticated
  if (userAuth !== "true") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="w-full text-2xl text-center font-bold mb-4">Live Cricket Scoring</h1>
      <MatchDashboard />
    </div>
  );
};

export default Home;

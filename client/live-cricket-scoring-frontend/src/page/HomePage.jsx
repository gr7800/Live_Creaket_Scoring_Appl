import React from 'react';
import { Link } from 'react-router-dom';
import MatchDashboard from '../component/MatchDashboard';

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="w-full text-2xl text-center font-bold mb-4">Live Cricket Scoring</h1>
      <MatchDashboard />
    </div>
  );
};

export default Home;

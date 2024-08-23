import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../page/HomePage";
import MatchDetails from "../page/MatchDetails";
import UpdateMatch from "../page/UpdateMatch";
import ScheduleMatchComponent from "../page/Create";
import LoginPage from "../page/Login";
import PrivateRoute from "./PrivateRoute";

const MainRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} /> */}
      <Route path="/" element={<Home />} />
      <Route path="/match/:id" element={<MatchDetails />} />
      <Route
        path="/update/:id"
        element={
          <PrivateRoute>
            <UpdateMatch />
          </PrivateRoute>
        }
      />
      <Route
        path="/create"
        element={
          <PrivateRoute>
            <ScheduleMatchComponent />
          </PrivateRoute>
        }
      />
      {/* <Route path="/register" element={<Signup />} /> */}
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default MainRoutes;

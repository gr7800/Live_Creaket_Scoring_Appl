import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../page/HomePage'
import MatchDetails from '../page/MatchDetails'
import UpdateMatch from '../page/UpdateMatch'

const MainRoutes = () => {
    return (
        <Routes>
            {/* <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} /> */}
            <Route path="/" element={<Home />} />
            <Route path="/match/:id" element={<MatchDetails />} />
            <Route path="/update/:id" element={<UpdateMatch />} />
            {/* <Route path="/register" element={<Signup />} /> */}
            {/* <Route path="/login" element={<Login />} /> */}
        </Routes>
    )
}

export default MainRoutes
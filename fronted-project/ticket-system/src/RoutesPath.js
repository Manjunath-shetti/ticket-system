import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./Pages/Login/Login";
import Home from './Pages/Home/Home'
import Project from "./Pages/Project/Project";
import Ticket from "./Pages/Ticket/Ticket";
import SignIn from "./Pages/Login/SignIn"
import AddDepartment from './Pages/AddEntity/AddDepartment'
import AddProject from './Pages/AddEntity/AddProject'
import AddTicket from './Pages/AddEntity/AddTicket'

const RoutesPath = () => (

    <Router>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/projects" element={<Project />} />
            <Route path="/ticket" element={<Ticket />} />
            <Route path="/signup" element={<SignIn />} />
            <Route path="/adddepartment" element={<AddDepartment />} />
            <Route path="/addproject" element={<AddProject />} />
            <Route path="/addticket" element={<AddTicket />} />
        </Routes>
    </Router>
)

export default RoutesPath;
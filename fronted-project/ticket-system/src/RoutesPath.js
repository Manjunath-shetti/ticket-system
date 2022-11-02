import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./Pages/Login/Login";
import Home from "./Pages/Login/Home/Home";


// function Routes() {
//     return (
//         <div>
//             <p>Hello</p>
//         </div>
//     )
// }
const RoutesPath = () => (

    <Router>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
        </Routes>
    </Router>
)

export default RoutesPath;
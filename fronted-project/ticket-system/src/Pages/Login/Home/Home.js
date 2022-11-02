import React, { useEffect, useState } from "react";
import useHistory from "react-router-dom"
import { Button } from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux"

function Home() {
    return (
        <div>
            <p>Welcome to home page</p>
        </div>
    )
}

export default Home;
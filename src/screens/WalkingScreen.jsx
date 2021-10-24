import React from "react";

import "../App.css";

import {useParams} from "react-router-dom";
import {loggedInAtom} from "../atoms";
import Login from "../components/Walking/Login";
import {useRecoilValue} from "recoil";

function WalkingScreen() {
    const id = useParams();
    const loggedIn = useRecoilValue(loggedInAtom);

    return <div>
        {loggedIn ? <></> : <Login/>}

    </div>;
}

export default WalkingScreen;

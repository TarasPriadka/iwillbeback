import React from "react";

import "../App.css";

import {useParams} from "react-router-dom";
import {loggedInAtom, sessionIdAtom} from "../atoms";
import Login from "../components/Walking/Login";
import {useRecoilValue} from "recoil";
import SimpleMap from "../components/Map";
import AppNavbar from "../components/AppNavbar";
import {Button, ButtonGroup} from "react-bootstrap";
import {postData} from "../utils";

function TrusteeScreen() {
    const id = useParams();
    const sessionId = useRecoilValue(sessionIdAtom);

    const handleDanger = () => {
        postData("/api/help", {'sessionid': sessionId})
    }

    const handleEnd = () => {
        postData("/api/end", {'sessionid': sessionId})
    }

    return <div>
        {sessionId !=="" ? <></> :
            <>
            <Login/>
        </>}
        <SimpleMap />
    </div>;
}

export default TrusteeScreen;

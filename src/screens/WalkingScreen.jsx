import React, {useEffect} from "react";

import "../App.css";

import {useHistory, useParams} from "react-router-dom";
import {loggedInAtom, sessionIdAtom} from "../atoms";
import Login from "../components/Walking/Login";
import {useRecoilValue} from "recoil";
import SimpleMap from "../components/Map";
import AppNavbar from "../components/AppNavbar";
import {Button, ButtonGroup} from "react-bootstrap";
import {postData} from "../utils";

function WalkingScreen() {
    const id = useParams();
    const sessionId = useRecoilValue(sessionIdAtom);
    const history = useHistory();

    useEffect(()=>{
        if (sessionId==="") {
            history.push("/");
        }
    },[])

    const handleDanger = () => {
        postData("/api/help", {'sessionid': sessionId})
    }

    const handleEnd = () => {
        postData("/api/end", {'sessionid': sessionId})
        history.push("/")
        window.location.reload(false);
    }

    return <div>
        {sessionId !=="" ? <>
            <SimpleMap />
            <div className="m-2 pb-2 mb-0" style={{backgroundColor: "white"}}>
                <Button variant="danger" onClick={handleDanger}>Notify Trustee</Button> {' '}
                <Button className="float-end" variant="light" onClick={handleEnd}>End</Button>
            </div>
        </> : <>
            <Login/>
            <SimpleMap/>
        </>}
    </div>;
}

export default WalkingScreen;

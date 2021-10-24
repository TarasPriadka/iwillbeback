import React from "react";

import "../App.css";

import {useParams} from "react-router-dom";
import {loggedInAtom} from "../atoms";
import Login from "../components/Walking/Login";
import {useRecoilValue} from "recoil";
import SimpleMap from "../components/Map";
import AppNavbar from "../components/WalkerSetup/AppNavbar";
import {Button, ButtonGroup} from "react-bootstrap";

function WalkingScreen() {
    const id = useParams();
    const loggedIn = useRecoilValue(loggedInAtom);

    return <div>
        <AppNavbar/>
        {loggedIn ? <>
            <SimpleMap />
            <div className="m-2">
                <Button variant="danger">Notify Trustee</Button> {' '}
                <Button className="float-end" variant="light">End</Button>
            </div>
        </> : <>
            <Login/>
            <SimpleMap default/>
        </>}

    </div>;
}

export default WalkingScreen;

import React, {useState} from "react";

import "../App.css";
import TrusteeForm from "../components/WalkerSetup/TrusteeForm";
import {goingOutAtom} from "../atoms";

import {useRecoilState} from "recoil";
import SimpleMap from "../components/Map";
import AppNavbar from "../components/AppNavbar";

function WalkerSetupScreen() {
    return <>
        <div className="main"/>
        <div>
        {/*<AppNavbar/>*/}
        <TrusteeForm/>
    </div></>
}

export default WalkerSetupScreen;

import React, {useState} from "react";

import "../App.css";
import TrusteeForm from "../components/WalkerSetup/TrusteeForm";
import {goingOutAtom} from "../atoms";

import {useRecoilState} from "recoil";
import SimpleMap from "../components/Map";
import AppNavbar from "../components/AppNavbar";

function WalkerSetupScreen() {
    return <div className="">
        <AppNavbar isIndex={true}/>
        <SimpleMap/>
    </div>
}

// <div className="m-2">
//     <Button onClick={() => {
//         navigator.geolocation.getCurrentPosition((position) => {
//             setLatitude(position.coords.latitude);
//             setLongitude(position.coords.longitude);
//         });
//     }}>Get my geolocation</Button>
//
//     <p>Latitude {latitude}; Longitude {longitude}</p>
// </div>

export default WalkerSetupScreen;

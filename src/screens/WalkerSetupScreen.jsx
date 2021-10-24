import React, {useState} from "react";

import "../App.css";

import AppNavbar from "../components/WalkerSetup/AppNavbar";
import TrusteeForm from "../components/WalkerSetup/TrusteeForm";
import {goingOutAtom} from "../atoms";

import {useRecoilState} from "recoil";
import {Button} from "react-bootstrap";

function WalkerSetupScreen() {

    const [goingOut, setGoingOut] = useRecoilState(goingOutAtom);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);


    return <div className="">
        <Button className="m-2" onClick={() => {
            setGoingOut(!goingOut)
        }}>{goingOut ? "Stop Going Out" : "Go out"}</Button>
        {goingOut ?
            <TrusteeForm/> : <></>
        }

        <div className="m-2">
            <Button onClick={() => {
                navigator.geolocation.getCurrentPosition((position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                });
            }}>Get my geolocation</Button>

            <p>Latitude {latitude}; Longitude {longitude}</p>
        </div>
    </div>
}

export default WalkerSetupScreen;

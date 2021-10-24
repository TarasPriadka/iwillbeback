import React, {useState} from "react";

import "./App.css";

import AppNavbar from "./components/AppNavbar";
import {Button} from "react-bootstrap";
import TrusteeForm from "./components/TrusteeForm";
import {goingOutAtom} from "./atoms";
import {useRecoilState} from "recoil";

function App() {

    const [goingOut, setGoingOut] = useRecoilState(goingOutAtom);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);


    return <div className="">
        <AppNavbar/>
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

export default App;

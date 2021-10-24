import React, {useState} from "react";

import "./App.css";

import AppNavbar from "./components/AppNavbar";
import {Button} from "react-bootstrap";
import TrusteeForm from "./components/TrusteeForm";
import {goingOutAtom} from "./atoms";
import {useRecoilState} from "recoil";

function App() {

    const [goingOut, setGoingOut] = useRecoilState(goingOutAtom);

    return <div className="">
        <AppNavbar/>
        <Button onClick={()=> {
            setGoingOut(!goingOut)
        }}>{goingOut ? "Stop Going Out" : "Go out"}</Button>
        { goingOut ?
            <TrusteeForm/> : <></>
        }

    </div>
}

export default App;

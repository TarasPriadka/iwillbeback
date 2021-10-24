import React, {useEffect, useState} from "react";

import "../App.css";

import {useParams} from "react-router-dom";
import {sessionIdAtom} from "../atoms";
import Login from "../components/Walking/Login";
import {useRecoilState, useRecoilValue} from "recoil";
import SimpleMap from "../components/Map";
import {postData} from "../utils";
import TrusteeMap from "../components/TrusteeMap";

function TrusteeScreen(props) {
    const id = useParams();

    const DEFAULT_LAT = 37.8778072;
    const DEFAULT_LNG = -122.2672373;

    const [sessionId, setSessionId] = useState(props.id);
    const [curLoc, setCurLoc] = useState({
        lng: DEFAULT_LNG,
        lat: DEFAULT_LAT,
    });

    useEffect(async () => {
        let curUrl = new URL(window.location.href);
        let sid = curUrl.pathname.split("/")[2];
        let info = null;
        if (props.id == null){
            info= postData("/api/trustee", {sessionid: sid});
        } else {
            console.log("PID: ", props)
            info = await postData("/api/trustee", {sessionid: props.id});
        }
        console.log(info)
        setCurLoc(info.loc)
        console.log(curLoc)
    }, []);

    return <div>
        {sessionId !== "" ? <></> :
            <>
                <Login setCurLoc={setCurLoc}/>
            </>}
        <TrusteeMap loc={curLoc}/>
    </div>;
}

export default TrusteeScreen;

import React, {useEffect} from "react";

import "../App.css";

import {useParams} from "react-router-dom";
import {sessionIdAtom} from "../atoms";
import Login from "../components/Walking/Login";
import {useRecoilState, useRecoilValue} from "recoil";
import SimpleMap from "../components/Map";
import {postData} from "../utils";

function TrusteeScreen() {
    const id = useParams();

    const [sessionId, setSessionId] = useRecoilState(sessionIdAtom);

    // useEffect(() => {
    //     let curUrl = new URL(window.location.href);
    //     let sid = curUrl.pathname.split("/")[2];
    //     // let info = postData("/api/trustee", {sessionid: sid});
    //     setSessionId(sid);
    // }, []);

    return <div>
        {sessionId !== "" ? <></> :
            <>
                <Login/>
            </>}
        <TrusteeScreen/>
    </div>;
}

export default TrusteeScreen;

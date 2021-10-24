import React, {useEffect} from "react";

import "../App.css";
import {curLocAtom} from "../atoms";
import Login from "../components/Login";
import {useSetRecoilState} from "recoil";
import {postData} from "../utils";
import TrusteeMap from "../components/TrusteeMap";

function TrusteeScreen(props) {
    const setCurLoc = useSetRecoilState(curLocAtom);

    useEffect(async () => {
        let curUrl = new URL(window.location.href);
        let sid = curUrl.pathname.split("/")[2];
        console.log(sid)
        let info = await postData("/api/trustee", {sessionid: sid});
        console.log("Trustee info: ", info);
        setCurLoc(info.loc)
    }, []);

    return <div>
        {"1" !== "" ? <></> :
            <>
                <Login setCurLoc={setCurLoc}/>
            </>}
        <TrusteeMap/>
    </div>;
}

export default TrusteeScreen;

import React from "react";
import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";
import WalkerSetupScreen from "./screens/WalkerSetupScreen";
import WalkingScreen from "./screens/WalkingScreen";
import TrusteeScreen from "./screens/TrusteeScreen";

export default function App() {

    const url = new URL(window.location.href);

    // const history = useHistory();
    // if (url.searchParams.get("type") === "trustee" && url.searchParams.get("id") !== null) {
    //     history.push(`/trustee/${url.searchParams.get("id")}`)
    //     // window.location.href = `/trustee/${url.searchParams.get("id")}`;
    // }

    return <Router>
        <div>
            <Switch>
                <Route exact path="/trustee/:id"><TrusteeScreen/></Route>
                <Route exact path="/walking/:id"><WalkingScreen/></Route>
                <Route path="/">
                    {url.searchParams.get("type") === "trustee" && url.searchParams.get("id") !== null ?
                        <>
                            <TrusteeScreen id={url.searchParams.get("id")}/>
                        </> : <WalkerSetupScreen/>} </Route>
            </Switch>
        </div>
    </Router>
}
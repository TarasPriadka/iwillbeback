import React from "react";
import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";
import WalkerSetupScreen from "./screens/WalkerSetupScreen";
import AppNavbar from "./components/AppNavbar";
import WalkingScreen from "./screens/WalkingScreen";

export default function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/walking/:id"><WalkingScreen/></Route>
                    <Route path="/"> <WalkerSetupScreen/> </Route>
                </Switch>
            </div>
        </Router>
    );
}
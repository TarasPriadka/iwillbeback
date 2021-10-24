import React from "react";
import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";
import WalkerSetupScreen from "./screens/WalkerSetupScreen";
import AppNavbar from "./components/WalkerSetup/AppNavbar";
import WalkingScreen from "./screens/WalkingScreen";

export default function App() {
    return (
        <Router>
            <div>
                <AppNavbar/>
                <Switch>
                    <Route path="/walking/:id"><WalkingScreen/></Route>
                    <Route path="/"> <WalkerSetupScreen/> </Route>
                </Switch>
            </div>
        </Router>
    );
}

function Home() {
    return <h2>Home</h2>;
}

function About() {
    return <h2>About</h2>;
}

function Users() {
    return <h2>Users</h2>;
}

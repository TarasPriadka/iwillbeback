import React from "react";

import "./App.css";

import AppNavbar from "./components/AppNavbar";
import {iguanaClickedAtom} from "./atoms";
import {useRecoilValue} from "recoil";
import {Form, Button} from "react-bootstrap";


function App() {

    return <div className="">
        <AppNavbar/>
        <Form>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Enter Trustee Name</Form.Label>
                <Form.Control type="phone" placeholder="Enter Name:" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="phoneNumber">
                <Form.Label>Enter Trustee Phone Number</Form.Label>
                <Form.Control type="phone" placeholder="Enter Phone:" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </div>
}

export default App;

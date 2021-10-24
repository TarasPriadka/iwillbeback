import React, {useState} from "react";
import "../../App.css";
import {Button, Form, Dropdown} from "react-bootstrap";
import {goingOutAtom, loggedInAtom} from "../../atoms";
import {postData} from "../../utils";

import {useRecoilState, useSetRecoilState} from "recoil";
import { useHistory } from 'react-router-dom';


function TrusteeForm() {
    const setLoggedIn = useSetRecoilState(loggedInAtom);

    const [trusteeName, setTrusteeName] = useState("");
    const [trusteePhone, setTrusteePhone] = useState("");
    const [name, setName] = useState("");
    // const [where, setWhere] = useState("");
    const [when, setWhen] = useState("");
    const [message, setMessage] = useState("");

    const currentHours = `${new Date().getHours().toString()}:00`;
    console.log(currentHours); // => 9
    // currentTime.getMinutes(); // =>  30
    // currentTime.getSeconds(); // => 51


    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        let where = {}

        await navigator.geolocation.getCurrentPosition((position) => {
            where = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
        });

        let resp = await postData("/api/start", {
            trusteeName: trusteeName,
            trusteePhone: trusteePhone,
            name: name,
            where: where,
            when: when,
            message: message,
        });

        setLoggedIn(true);
        history.push(`/walking/test`);
        // history.push(`/walking/${resp.sessionId}`);

    }

    return <div className="trust-form m-2 p-3">
        <h1>I Will Be Back</h1>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
                <Form.Label style={{color:"white"}}>Trustee Info:</Form.Label>
                <Form.Control className="mb-1" type="name" placeholder="Trustee Name:" value={trusteeName}
                              onChange={(e) => {
                                  setTrusteeName(e.target.value)
                              }}/>
                <Form.Control className="mb-1" type="phone" placeholder="Trustee Phone Number:" value={trusteePhone}
                              onChange={(e) => {
                                  setTrusteePhone(e.target.value)
                              }}/>
                <Form.Label style={{color:"white"}}>My info:</Form.Label>
                <Form.Control className="mb-1" type="phone" placeholder="Your Name:"
                              value={name}
                              onChange={(e) => {
                                  setName(e.target.value)
                              }}/>
                <Form.Text className="float-start" style={{color:"white"}}>How long are you going to be out:</Form.Text>
                <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        Duration:
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Form.Control as="textarea" rows={3} className="mb-1" type="phone" placeholder="Short Note:"
                              value={message}
                              onChange={(e) => {
                                  setMessage(e.target.value)
                              }}/>
            </Form.Group>

            <Button variant="primary" type="submit">
                Go out!
            </Button>
        </Form></div>
}

export default TrusteeForm;

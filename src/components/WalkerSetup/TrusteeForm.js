import React, {useState} from "react";
import "../../App.css";
import {Button, Form} from "react-bootstrap";
import {goingOutAtom, loggedInAtom} from "../../atoms";
import {postData} from "../../utils";

import {useRecoilState, useSetRecoilState} from "recoil";
import { useHistory } from 'react-router-dom';
function TrusteeForm() {
    const setLoggedIn = useSetRecoilState(loggedInAtom);

    const [trusteeName, setTrusteeName] = useState("");
    const [trusteePhone, setTrusteePhone] = useState("");
    const [name, setName] = useState("");
    const [where, setWhere] = useState("");
    const [when, setWhen] = useState("");
    const [message, setMessage] = useState("");

    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

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
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
                <Form.Text>Trustee Info:</Form.Text>
                <Form.Control className="mb-1" type="name" placeholder="Trustee Name:" value={trusteeName}
                              onChange={(e) => {
                                  setTrusteeName(e.target.value)
                              }}/>
                <Form.Control className="mb-1" type="phone" placeholder="Trustee Phone Number:" value={trusteePhone}
                              onChange={(e) => {
                                  setTrusteePhone(e.target.value)
                              }}/>
                <Form.Text>My info:</Form.Text>
                <Form.Control className="mb-1" type="phone" placeholder="Your Name:"
                              value={name}
                              onChange={(e) => {
                                  setName(e.target.value)
                              }}/>
                <Form.Control className="mb-1" type="phone" placeholder="When are you coming back?"
                              value={when}
                              onChange={(e) => {
                                  setWhen(e.target.value)
                              }}/>
                <Form.Control className="mb-1" type="phone" placeholder="Where are you coming back?"
                              value={where}
                              onChange={(e) => {
                                  setWhere(e.target.value)
                              }}/>
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

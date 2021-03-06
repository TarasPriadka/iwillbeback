import React, {useState} from "react";
import "../App.css";
import {loggedInAtom, sessionIdAtom, socketAtom} from "../atoms";
import {Button, Form} from "react-bootstrap";
import {postData} from "../utils";

import {useSetRecoilState} from "recoil";
import {useHistory} from 'react-router-dom';
import {io} from 'socket.io-client';

function TrusteeForm() {
    const setSessionId = useSetRecoilState(sessionIdAtom);
    const setSocket = useSetRecoilState(socketAtom)
    const setLoggedIn = useSetRecoilState(loggedInAtom)

    const [trusteeName, setTrusteeName] = useState("");
    const [trusteePhone, setTrusteePhone] = useState("");
    const [name, setName] = useState("");
    const [when, setWhen] = useState("");
    const [message, setMessage] = useState("");

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
            // where: where,
            when: parseInt(when),
            message: message,
            loc: where,
            startLoc: where
        });

        console.log(resp.sessionid)
        setSessionId(resp.sessionid);
        setLoggedIn(true);
        console.log("updating socket")
        const socket = io()
        socket.on('disconnect', () => {
            console.log(`removing ${resp.sessionid}`)
            socket.emit('remove', {"sessionid": resp.sessionid})
        })
        setSocket(socket);
        history.push(`/walking/${resp.sessionid}`);
    }

    return <div className="trust-form m-2 p-3">
        <h1>I Will Be Back</h1>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
                <Form.Label style={{color: "white"}}>Trustee Info:</Form.Label>
                <Form.Control className="mb-1" type="name" placeholder="Trustee Name:" value={trusteeName}
                              onChange={(e) => {
                                  setTrusteeName(e.target.value)
                              }}/>
                <Form.Control className="mb-1" type="phone" placeholder="Trustee Phone Number:" value={trusteePhone}
                              onChange={(e) => {
                                  setTrusteePhone(e.target.value)
                              }}/>
                <Form.Label style={{color: "white"}}>My info:</Form.Label>
                <Form.Control className="mb-1" type="phone" placeholder="Your Name:"
                              value={name}
                              onChange={(e) => {
                                  setName(e.target.value)
                              }}/>
                <Form.Control className="mb-1" type="phone" placeholder="How long will you be out in minutes?"
                              value={when}
                              onChange={(e) => {
                                  setWhen(e.target.value)
                              }}/>

                <Form.Control as="textarea" rows={3} className="mb-1" type="phone" placeholder="Short Note:"
                              value={message}
                              onChange={(e) => {
                                  setMessage(e.target.value)
                              }}/>
                <Form.Label className="float-start">Note: You will be sharing your location with your
                    trustee.</Form.Label>
            </Form.Group>

            <Button className="float-end" variant="success" type="submit">
                Go out!
            </Button>
        </Form></div>
}

export default TrusteeForm;

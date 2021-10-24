import React, {useState} from "react";
import "../../App.css";
import {Button, Form} from "react-bootstrap";
import {useHistory} from 'react-router-dom';
import {postData} from "../../utils";
import {useSetRecoilState, useRecoilValue} from "recoil";
import {loggedInAtom, sessionIdAtom} from "../../atoms";

function Login() {
    const history = useHistory();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const setLoggedIn = useSetRecoilState(loggedInAtom);
    const sessionId = useRecoilValue(sessionIdAtom);


    const handleSubmit = async (e) => {
        e.preventDefault();
        let response = postData("api/verify", {
            trusteeName: name,
            trusteePhone: phone,
            sessionId: sessionId
        });

        if (response.valid) {
            setLoggedIn(true);
        } else {
            window.location.href = "/";
        }
    }

    return <div className="trust-form m-2 p-3">
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
                <Form.Text>Trustee Info:</Form.Text>
                <Form.Control className="mb-1" type="name" placeholder="Your Name:" value={name}
                              onChange={(e) => {
                                  setName(e.target.value)
                              }}/>
                <Form.Control className="mb-1" type="phone" placeholder="Your Phone Number:" value={phone}
                              onChange={(e) => {
                                  setPhone(e.target.value)
                              }}/>
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form></div>
}

export default Login;

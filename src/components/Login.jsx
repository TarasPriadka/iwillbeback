import React, {useState} from "react";
import "../App.css";
import {Button, Form} from "react-bootstrap";
import {postData} from "../utils";
import {useRecoilValue} from "recoil";
import {sessionIdAtom} from "../atoms";

function Login(props) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const sessionId = useRecoilValue(sessionIdAtom);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let curUrl = new URL(window.location.href);
        let sid = curUrl.pathname.split("/")[2];

        let response = postData("api/verify", {
            trusteeName: name,
            trusteePhone: phone,
            sessionId: sid
        });

        if (response.valid) {
            props.setCurLoc({
                lat: response.loc.lat,
                lng: response.loc.lng
            })
        } else {
            window.location.href = "/";
        }
    }

    return <div className="trust-form m-2 p-3">
        <Form onSubmit={handleSubmit}>
            <h1 style={{color: "white"}}>I'll be back</h1>
            <Form.Group controlId="name">
                <Form.Text style={{size: "10px", color: "white"}}>Please validate your trustee information:</Form.Text>
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

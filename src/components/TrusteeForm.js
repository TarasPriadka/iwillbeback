import React, {useState} from "react";
import "../App.css";
import {Button, Form} from "react-bootstrap";
import {goingOutAtom} from "../atoms";
import {useRecoilState} from "recoil";

function TrusteeForm() {

    const [_, setGoingOut] = useRecoilState(goingOutAtom);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [where, setWhere] = useState("");
    const [when, setWhen] = useState("");

    const handleSubmit = (e) => {
        console.log(
            name,phone,where,when
        )
        setGoingOut(false);
        e.preventDefault();
    }

    return <div className="trust-form m-2 p-3">
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
                <Form.Text>Trustee Info:</Form.Text>
                <Form.Control className="mb-1" type="name" placeholder="Trustee Name:" value={name} onChange={(e) => {
                    setName(e.target.value)
                }}/>
                <Form.Control className="mb-1" type="phone" placeholder="Trustee Phone Number:" value={phone}
                              onChange={(e) => {
                                  setPhone(e.target.value)
                              }}/>
                <Form.Text>Out info:</Form.Text>
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
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form></div>
}

export default TrusteeForm;

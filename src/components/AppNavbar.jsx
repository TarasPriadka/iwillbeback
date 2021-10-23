import React, {useState} from "react";
import "../App.css";
import {Col, Form, Row} from "react-bootstrap";


function AppNavbar() {
    const [user, setUser] = useState("Test");

    return <div className="app-header m-2">
        <Row>
            <Col>
                <h2>I will be back</h2>
            </Col>
        </Row>
    </div>


}

export default AppNavbar;

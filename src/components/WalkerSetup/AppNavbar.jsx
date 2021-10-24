import React, {useState} from "react";
import "../../App.css";
import {Col, Row} from "react-bootstrap";
import {useHistory} from "react-router-dom";


function AppNavbar() {
    const [user, setUser] = useState("Test");
    const history = useHistory();

    return <div className="app-header m-2">
        <Row>
            <Col>
                <h2 onClick={() => {
                    history.push("/")
                }} style={{cursor: "pointer", width: "200px"}}>I will be back</h2>
            </Col>
        </Row>
    </div>


}

export default AppNavbar;

import React, {useState} from "react";
import "../App.css";
import {Button, Col, Collapse, Row} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import TrusteeForm from "./WalkerSetup/TrusteeForm";


function AppNavbar(props) {
    const history = useHistory();
    const [open, setOpen] = useState(false);

    return <div className="app-header m-2">
        <Row className="p-1">
            <Col>
                <h2 className="m-auto float-start" onClick={() => {
                    history.push("/")
                }} style={{cursor: "pointer", width: "200px"}}>ILLBeBack</h2>
            </Col>
            {props.isIndex ?
                <Col>
                    <Button className="m-auto float-end" onClick={() => {
                        setOpen(!open)
                    }}>Be Back</Button>
                </Col> : <></>}
        </Row>

        <Collapse in={open}>
            <div id="example-collapse-text">
                <TrusteeForm/>
            </div>
        </Collapse>
    </div>


}

export default AppNavbar;

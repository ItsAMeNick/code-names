import React, { Component } from 'react';
import { connect } from "react-redux";
import cookie from "react-cookies";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Join from "./Join.js";
import Host from "./Host.js"

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: "",
        };
    }

    componentDidMount() {
        let session = cookie.load("session");
        let name = cookie.load("player");
        if (session && session.key && session.db_id && name) {
                this.props.setSession(session);
                this.props.setPlayer(name);
        }
    }

    genBody() {
        switch(this.state.mode) {
            case "join":
                return (
                    <Card.Body>
                        <Join/>
                    </Card.Body>
                );
            case "host":
                return (
                    <Card.Body>
                        <Host/>
                    </Card.Body>
                );
            default:
                return (
                    <Card.Body>
                    <Row>
                        <Col/>
                        <Col>
                            <Button variant="success" onClick={() => this.setState({mode: "join"})}>
                                Join
                            </Button>
                        </Col>
                        <Col/>
                        <Col>
                            <Button variant="warning" onClick={() => this.setState({mode: "host"})}>
                                Host
                            </Button>
                        </Col>
                        <Col/>
                    </Row>
                    </Card.Body>
                );
        }
    }

    render() {
        return (
            <div>
                <Card>
                    <Card.Header>
                        The Chameleon Game
                    </Card.Header>
                    {this.genBody()}
                    <Card.Footer>
                        {this.state.mode !== "" ?
                            <Button variant="dark" onClick={() => this.setState({mode: ""})}>
                                Back
                            </Button>
                        :
                            null
                        }
                    </Card.Footer>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    setSession: (session) => dispatch({
        type: "set_session",
        payload: session
    }),
    setPlayer: (name) => dispatch({
        type: "set_player",
        payload: name
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

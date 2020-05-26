import React, { Component } from 'react';
import { connect } from "react-redux";
import firestore from "../modules/firestore.js";
import cookie from "react-cookies";
import firebase from "firebase/app";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";

function titleCase(string) {
    if (!string) return "";
    let sentence = string.toLowerCase().split(" ");
    for(let i = 0; i< sentence.length; i++){
        sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
    }
    return sentence.join(" ");
}

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        //Set up listener (May need to put this in a promise later)
        firestore.collection("sessions").doc(this.props.session.db_id)
            .onSnapshot({includeMetadataChanges: true}, (doc) => {
                if (doc.exists) {
                    this.props.updateGame(doc.data());
                } else {
                    cookie.remove("player");
                    cookie.remove("session");
                    this.props.clearGame();
                }
            })
    }

    genBody() {
        switch(this.props.stage) {
            case "lobby":
                return this.lobby();
            case "hints":
                return <Row>{this.hints()}</Row>;
            case "voting":
                if (this.props.voting.voters.length === this.props.players.length) {
                    return this.results();
                } else {
                    return this.voting();
                }
            default:
                return null
        }
    }

    genFooter() {
        switch(this.props.stage) {
            case "lobby":
                if (this.props.players[0] === this.props.player_name) {
                    //HOST ONLY
                    return (<Row>
                        <Col>
                            <Button onClick={() => {
                                //Start Game
                                let topic = Object.keys(this.props.topics)[Math.floor(Math.random()*Object.keys(this.props.topics).length)];
                                let word = this.props.topics[topic][Math.floor(Math.random()*this.props.topics[topic].length)];
                                let new_chameleon = Math.floor(Math.random()*this.props.players.length);
                                firestore.collection("sessions").doc(this.props.session.db_id).update({
                                    stage: "hints",
                                    "round.topic": topic,
                                    "round.word": word,
                                    "round.chameleon": new_chameleon,
                                    "round.voting": []
                                })
                            }}>Start Game</Button>
                        </Col>
                        <Col>
                            <Button onClick={() => {
                                //End Game
                                firestore.collection("sessions").doc(this.props.session.db_id).delete()
                            }}>End Game</Button>
                        </Col>
                    </Row>)
                } else {
                    return (<Button onClick={() => {
                        firestore.collection("sessions").doc(this.props.session.db_id).update({
                            players: firebase.firestore.FieldValue.arrayRemove(this.props.player_name),
                        }).then(() => {
                            cookie.remove("player");
                            cookie.remove("session");
                            this.props.clearGame();
                        })
                    }}>
                        Leave Game
                    </Button>)
                }
            case "hints":
                if (this.props.players[0] === this.props.player_name) {
                    //HOST ONLY
                    return (<Row>
                        <Col>
                            <Button onClick={() => {
                                //Next Round
                                firestore.collection("sessions").doc(this.props.session.db_id).update({
                                    stage: "voting"
                                })
                            }}>To Voting</Button>
                        </Col>
                        <Col>
                            <Button onClick={() => {
                                firestore.collection("sessions").doc(this.props.session.db_id).update({
                                    stage: "lobby",
                                })
                            }}>
                                Return to Lobby
                            </Button>
                        </Col>
                    </Row>)
                }
                break;
            case "voting":
                if (this.props.players[0] === this.props.player_name) {
                    //HOST ONLY
                    return (<Row>
                        <Col>
                            <Button onClick={() => {
                                //Next Round
                                let topic = Object.keys(this.props.topics)[Math.floor(Math.random()*Object.keys(this.props.topics).length)];
                                let word = this.props.topics[topic][Math.floor(Math.random()*this.props.topics[topic].length)];
                                let new_chameleon = Math.floor(Math.random()*this.props.players.length);
                                firestore.collection("sessions").doc(this.props.session.db_id).update({
                                    stage: "hints",
                                    "round.id": this.props.round+1,
                                    "round.topic": topic,
                                    "round.word": word,
                                    "round.chameleon": new_chameleon,
                                    "round.voting": []
                                })
                            }}>Next Round</Button>
                        </Col>
                        <Col>
                            <Button onClick={() => {
                                firestore.collection("sessions").doc(this.props.session.db_id).update({
                                    stage: "lobby",
                                })
                            }}>
                                Return to Lobby
                            </Button>
                        </Col>
                    </Row>)
                }
                break;
            default:
                return null;
        }
    }

    lobby() {
        let lobby = [];
        lobby.push(<Alert variant="info" key="code">{"Room Code: "+this.props.session.key}</Alert>)
        for (let p in this.props.players) {
            lobby.push(<ListGroup.Item key={p} active={this.props.player_name === this.props.players[p]}>
                {this.props.players[p]}
            </ListGroup.Item>)
        }
        return lobby;
    }

    hints() {
        let hints = []
        let counter = -1;
        hints.push(<Col key={"players"}>
                {this.props.players.map((p) => {
                    counter += 1;
                    return (<ListGroup.Item key={p}variant={this.props.round % this.props.players.length === counter ? "secondary" : ""}>
                        {titleCase(p)}
                    </ListGroup.Item>);
                })}
            </Col>);
        hints.push(<br key={"break"}/>);
        hints.push(<Col key="board+role">
            <Row>
                <Table bordered striped>
                    <tbody>
                        {this.genBoard()}
                    </tbody>
                </Table>
            </Row>
                <Alert variant="info">
                    {this.props.role ?
                        "Secret Word: " + titleCase(this.props.role)
                    :
                        "You are the Chameleon!"
                    }
                </Alert>
            <Row>
            </Row>
        </Col>)
        return hints;
    }

    genBoard() {
        let rows = []
        rows.push(<tr key={"head"}>
            <th colSpan="4">{titleCase(this.props.topic)}</th>
        </tr>)
        for (let r in [0,1,2,3]) {
            let row = <tr key={"r"+r}>
                {[0,1,2,3].map((c) => {
                    return <td key={"i"+(r*4 + c)}>
                        {titleCase(this.props.topics[this.props.topic][r*4 + c])}
                    </td>
                })}
            </tr>
            rows.push(row)
        }
        return rows;
    }

    voting() {
        let voting = [];
        if (this.props.voting.voters.includes(this.props.player_name)) {
            voting.push(<Alert variant={"info"} key="vote cast">
                {"Your vote has been counted."}
            </Alert>);
        } else {
            for (let p in this.props.players) {
                voting.push(<ListGroup.Item key={p} id={p} onClick={() => {
                    firestore.collection("sessions").doc(this.props.session.db_id).update({
                        "round.voting": firebase.firestore.FieldValue.arrayUnion(this.props.player_name+"|"+this.props.players[p]),
                    })
                }}>
                    {this.props.players[p]}
                </ListGroup.Item>)
            }
        }
        return voting;
    }

    results() {
        let results = [];
        let counts = {};
        for (let v in this.props.voting.votes) {
            if (this.props.voting.votes[v] in counts) {
                counts[this.props.voting.votes[v]] += 1;
            } else {
                counts[this.props.voting.votes[v]] = 1;
            }
        }
        for (let c in Object.keys(counts)) {
            c = Object.keys(counts)[c];
            results.push(<ListGroup.Item key={c} id={c}>
                {c+": "+counts[c]}
            </ListGroup.Item>)
        }
        results.push(<br/>);
        results.push(<Table bordered striped>
            <tbody>
                {this.genBoard()}
            </tbody>
        </Table>);

        return results;
    }

    render() {
        return (
            <div>
                <Card>
                    <Card.Header>
                        {titleCase(this.props.stage)}
                    </Card.Header>
                    <Card.Body>
                        {this.genBody()}
                    </Card.Body>
                    <Card.Footer>
                        {this.genFooter()}
                    </Card.Footer>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    session: state.session,
    player_name: state.player_name,
    stage: state.stage,
    players: state.players,
    topics: state.topics,
    topic: state.round.topic,
    role: state.round.role,
    round: state.round.id,
    voting: state.voting,
});

const mapDispatchToProps = dispatch => ({
    updateGame: (doc) => dispatch({
        type: "update_game",
        payload: doc
    }),
    clearGame: () => dispatch({
        type: "clear_game",
        payload: null
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

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

const BASIC_CARD = {
    background: "white",
    textAlign: "center"
}

const CIV_CARD = {
    background: "#ffeecc",
    textAlign: "center"
}

const BLACK_CARD = {
    background: "black",
    color: "white",
    textAlign: "center"
}

const RED_CARD = {
    background: "#ffb3b3",
    textAlign: "center"
}

const BLUE_CARD = {
    background: "#99c2ff",
    textAlign: "center"
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
                    cookie.remove("cn_player");
                    cookie.remove("cn_session");
                    this.props.clearGame();
                }
            })
    }

    genBody() {
        switch(this.props.stage) {
            case "lobby":
                return this.lobby();
            case "game":
                return this.game();
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
                                let words = [];
                                // console.log(this.props.words[this.props.version])
                                while (words.length < 25) {
                                    let word = this.props.words[this.props.version][Math.floor(Math.random()*this.props.words[this.props.version].length)];
                                    if (!words.includes(word)) {
                                        words.push(word)
                                    }
                                }
                                // console.log(words);
                                let board = Array(25).fill("C");
                                let used = []
                                let spot = Math.floor(Math.random()*25);
                                board[spot] = "A";
                                used.push(spot);
                                while (used.length < 10) {
                                    spot = Math.floor(Math.random()*25);
                                    if (!used.includes(spot)) {
                                        used.push(spot);
                                        board[spot] = (this.props.round.id % 2) ? "B" : "R";
                                    }
                                }
                                while (used.length < 18) {
                                    spot = Math.floor(Math.random()*25);
                                    if (!used.includes(spot)) {
                                        used.push(spot);
                                        board[spot] = (this.props.round.id % 2) ? "R" : "B";
                                    }
                                }
                                // console.log(board)
                                firestore.collection("sessions").doc(this.props.session.db_id).update({
                                    stage: "game",
                                    "round.words": words,
                                    "round.board": board,
                                    "round.guesses": Array(25).fill(""),
                                    turn: (this.props.round.id % 2) ? "B" : "R",
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
            case "game":
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
            default:
                return null;
        }
    }

    lobby() {
        let lobby = [];
        if (this.props.player_team) {
            lobby.push(<Alert variant="info" key="code">{"Room Code: "+this.props.session.key}</Alert>)
            for (let r in this.props.teams.red) {
                lobby.push(<ListGroup.Item  variant="danger" key={this.props.teams.red[r]}>
                    {this.props.teams.red[r]}
                </ListGroup.Item>)
            }
            for (let b in this.props.teams.blue) {
                lobby.push(<ListGroup.Item  variant="primary" key={this.props.teams.blue[b]}>
                    {this.props.teams.blue[b]}
                </ListGroup.Item>)
            }
        } else {
            lobby.push(<Row key="pick_team">
                <Col>
                    <Button variant="danger" onClick={() => {
                        firestore.collection("sessions").doc(this.props.session.db_id).update({
                            "teams.red": firebase.firestore.FieldValue.arrayUnion(this.props.player_name),
                        }).then(() => {
                            this.props.setTeam("red");
                        });
                    }}>
                        Join RED Team
                    </Button>
                </Col>
                    <Button variant="primary" onClick={() => {
                        firestore.collection("sessions").doc(this.props.session.db_id).update({
                            "teams.blue": firebase.firestore.FieldValue.arrayUnion(this.props.player_name),
                        }).then(() => {
                            this.props.setTeam("blue")
                        });
                    }}>
                        Join BLUE Team
                    </Button>
                <Col>
                </Col>
            </Row>)
        }
        return lobby;
    }

    game() {
        let hints = []
        let counter = -1;
        hints.push(<Row key={"players"}>
            <Col>
                <Alert variant="info">{this.props.guesses === 0 ? (this.props.turn==="R" ? "Red":"Blue")+" Codemaster is giving a hint." : (this.props.turn==="R" ? "Red":"Blue")+" team is making guesses."}</Alert>
            </Col>
        </Row>);
        hints.push(<Row key="board+role">
            <Col>
                <Table bordered>
                    <tbody>
                        {this.genBoard()}
                    </tbody>
                </Table>
            </Col>
        </Row>)
        return hints;
    }

    genBoard() {
        let rows = []
        //if codemaster
        if (this.props.teams.red[this.props.round.id % this.props.teams.red.length] === this.props.player_name) {
            for (let r in [0,1,2,3,4]) {
                let row = <tr key={"r"+r}>
                    {[0,1,2,3,4].map((c) => {
                        let style = CIV_CARD;
                        if (this.props.round.board[r*5 + c] === "A") {
                            style = BLACK_CARD;
                        } else if (this.props.round.board[r*5 + c] === "R") {
                            style = RED_CARD;
                        } else if (this.props.round.board[r*5 + c] === "B") {
                            style = BLUE_CARD;
                        }
                        return <td style={style} key={"i"+(r*4 + c)}>
                            <strong>{titleCase(this.props.round.words[r*5 + c])}</strong>
                        </td>
                    })}
                </tr>
                rows.push(row)
            }
        } else {
            for (let r in [0,1,2,3,4]) {
                let row = <tr key={"r"+r}>
                    {[0,1,2,3,4].map((c) => {
                        let style = BASIC_CARD;
                        if (this.props.round.guesses[r*5 + c]) {
                            if (this.props.round.board[r*5 + c] === "A") {
                                style = BLACK_CARD;
                            } else if (this.props.round.board[r*5 + c] === "R") {
                                style = RED_CARD;
                            } else if (this.props.round.board[r*5 + c] === "B") {
                                style = BLUE_CARD;
                            } else {
                                style = CIV_CARD;
                            }
                        }
                        return <td style={style} key={"i"+(r*4 + c)}>
                            <strong>{titleCase(this.props.round.words[r*5 + c])}</strong>
                        </td>
                    })}
                </tr>
                rows.push(row)
            }
        }
        return rows;
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
    player_team: state.player_team,
    stage: state.stage,
    players: state.players,
    teams: state.teams,
    words: state.words,
    version: state.version,
    round: state.round,
    turn: state.turn,
    guesses: state.guesses,
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
    setTeam: (team) => dispatch({
        type: "set_team",
        payload: team
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

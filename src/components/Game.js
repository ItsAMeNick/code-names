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

import End from "./End.js";

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

    giveGuesses(count) {
        firestore.collection("sessions").doc(this.props.session.db_id).update({
            guesses: count
        })
    }

    genBody() {
        switch(this.props.stage) {
            case "lobby":
                return this.lobby();
            case "game":
                return this.game();
            case "results":
                return <End/>;
            default:
                return null
        }
    }

    genFooter() {
        switch(this.props.stage) {
            case "lobby":
                if (this.props.players[0] === this.props.player_name) {
                    //HOST ONLY
                    return(<Row>
                        <Col>
                            <Button onClick={() => this.startGame()}>Start Game</Button>
                        </Col>
                        <Col>
                            <Button variant={this.props.player_team === "red" ? "primary" : "danger"} onClick={() => this.switchTeams()}>Switch Teams</Button>
                        </Col>
                        <Col>
                            <Button onClick={() => {
                                //End Game
                                firestore.collection("sessions").doc(this.props.session.db_id).delete()
                            }}>End Game</Button>
                        </Col>
                    </Row>)
                } else {
                    return(<Row>
                        <Col>
                            <Button onClick={() => this.switchTeams()}>Switch Teams</Button>
                        </Col>
                        <Col>
                            <Button onClick={() => {
                                firestore.collection("sessions").doc(this.props.session.db_id).update({
                                    players: firebase.firestore.FieldValue.arrayRemove(this.props.player_name),
                                    "teams.red": firebase.firestore.FieldValue.arrayRemove(this.props.player_name),
                                    "teams.blue": firebase.firestore.FieldValue.arrayRemove(this.props.player_name)
                                }).then(() => {
                                    cookie.remove("cn_player");
                                    cookie.remove("cn_session");
                                    this.props.clearGame();
                                })
                            }}>
                                Leave Game
                            </Button>
                        </Col>
                    </Row>)
                }
            case "game":
                if (this.props.players[0] === this.props.player_name) {
                    //HOST ONLY
                    return (<Row>
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
            case "results":
                if (this.props.players[0] === this.props.player_name) {
                    return (<Row>
                        <Col>
                            <Button onClick={() => this.startGame()}>Next Round</Button>
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
                            "teams.red": firebase.firestore.FieldValue.arrayRemove(this.props.player_name),
                            "teams.blue": firebase.firestore.FieldValue.arrayRemove(this.props.player_name)
                        }).then(() => {
                            cookie.remove("cn_player");
                            cookie.remove("cn_session");
                            this.props.clearGame();
                        })
                    }}>
                        Leave Game
                    </Button>)
                }
            default:
                return null;
        }
    }

    startGame() {
        //Start Game

        if (this.props.players < 4 || this.props.teams.red.length < 2 || this.props.teams.blue.length < 2) return null;

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
            guesses: 0,
            score: {red: 0, blue: 0},
            bonus: false,
        })
    }

    switchTeams() {
        if (this.props.player_team === "red") {
            firestore.collection("sessions").doc(this.props.session.db_id).update({
                "teams.red": firebase.firestore.FieldValue.arrayRemove(this.props.player_name),
                "teams.blue": firebase.firestore.FieldValue.arrayUnion(this.props.player_name),
            }).then(() => {
                this.props.setTeam("blue");
            });
        } else {
            firestore.collection("sessions").doc(this.props.session.db_id).update({
                "teams.blue": firebase.firestore.FieldValue.arrayRemove(this.props.player_name),
                "teams.red": firebase.firestore.FieldValue.arrayUnion(this.props.player_name),
            }).then(() => {
                this.props.setTeam("red");
            });
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
        let game = []
        game.push(<Row key={"you"}>
            <Col>
                <Alert variant={this.props.player_team === "red" ? "danger" : "primary"}>
                    {(((this.props.teams.red[this.props.round.id % this.props.teams.red.length] === this.props.player_name) || (this.props.teams.blue[this.props.round.id % this.props.teams.blue.length] === this.props.player_name)) ? "Codemaster " : "Agent ") + titleCase(this.props.player_name)}
                </Alert>
            </Col>
        </Row>);
        game.push(<Row key={"scores"}>
            <Col>
                <Alert variant="dark">
                    {"Red Score: " + this.props.score.red}
                </Alert>
            </Col>
            <Col>
                <Alert variant="dark">
                    {"Blue Score: " + this.props.score.blue}
                </Alert>
            </Col>
        </Row>);
        game.push(<Row key="board+role">
            <Col>
                <Table bordered>
                    <tbody>
                        {this.genBoard()}
                    </tbody>
                </Table>
            </Col>
        </Row>)
        game.push(<Row key={"players"}>
            <Col>
                <Alert variant="dark">{this.props.guesses === 0 ? (this.props.turn==="R" ? "Red":"Blue")+" Codemaster is giving a hint." : (this.props.turn==="R" ? "Red":"Blue")+" team is making guesses."}</Alert>
            </Col>
        </Row>);
        if (this.props.guesses === 0 && ((this.props.turn==="R" ? "red":"blue") === this.props.player_team) && ((this.props.teams.red[this.props.round.id % this.props.teams.red.length] === this.props.player_name) || (this.props.teams.blue[this.props.round.id % this.props.teams.blue.length] === this.props.player_name))) {
            game.push(<div key={"guesses"}>
                {((((this.props.turn === "R") && (this.props.teams.red[this.props.round.id % this.props.teams.red.length] === this.props.player_name))
                || ((this.props.turn === "B") && (this.props.teams.blue[this.props.round.id % this.props.teams.blue.length] === this.props.player_name)))
                && (this.props.guesses === 0)) ?
                    <Row>
                    {(((this.props.turn === "R") && (this.props.score.red < (!(this.props.round.id % 2) ? 9 : 8)))
                    || ((this.props.turn === "B") && (this.props.score.blue < ((this.props.round.id % 2) ? 9 : 8)))) ?
                        <Col>
                            <Button variant="secondary" onClick={() => {
                                this.giveGuesses(1);
                            }}>1</Button>
                        </Col>
                    : null}
                    {(((this.props.turn === "R") && (this.props.score.red < (!(this.props.round.id % 2) ? 8 : 7)))
                    || ((this.props.turn === "B") && (this.props.score.blue < ((this.props.round.id % 2) ? 8 : 7)))) ?
                        <Col>
                            <Button variant="secondary" onClick={() => {
                                this.giveGuesses(2);
                            }}>2</Button>
                        </Col>
                    : null}
                    {(((this.props.turn === "R") && (this.props.score.red < (!(this.props.round.id % 2) ? 7 : 6)))
                    || ((this.props.turn === "B") && (this.props.score.blue < ((this.props.round.id % 2) ? 7 : 6)))) ?
                        <Col>
                            <Button variant="secondary" onClick={() => {
                                this.giveGuesses(3);
                            }}>3</Button>
                        </Col>
                    : null}
                    {(((this.props.turn === "R") && (this.props.score.red < (!(this.props.round.id % 2) ? 6 : 5)))
                    || ((this.props.turn === "B") && (this.props.score.blue < ((this.props.round.id % 2) ? 6 : 5)))) ?
                        <Col>
                            <Button variant="secondary" onClick={() => {
                                this.giveGuesses(4);
                            }}>4</Button>
                        </Col>
                    : null}
                    {(((this.props.turn === "R") && (this.props.score.red < (!(this.props.round.id % 2) ? 5 : 4)))
                    || ((this.props.turn === "B") && (this.props.score.blue < ((this.props.round.id % 2) ? 5 : 4)))) ?
                        <Col>
                            <Button variant="secondary" onClick={() => {
                                this.giveGuesses(5);
                            }}>5</Button>
                        </Col>
                    : null}
                    {(((this.props.turn === "R") && (this.props.score.red < (!(this.props.round.id % 2) ? 4 : 3)))
                    || ((this.props.turn === "B") && (this.props.score.blue < ((this.props.round.id % 2) ? 4 : 3)))) ?
                        <Col>
                            <Button variant="secondary" onClick={() => {
                                this.giveGuesses(6);
                            }}>6</Button>
                        </Col>
                    : null}
                    {(((this.props.turn === "R") && (this.props.score.red < (!(this.props.round.id % 2) ? 3 : 2)))
                    || ((this.props.turn === "B") && (this.props.score.blue < ((this.props.round.id % 2) ? 3 : 2)))) ?
                        <Col>
                            <Button variant="secondary" onClick={() => {
                                this.giveGuesses(7);
                            }}>7</Button>
                        </Col>
                    : null}
                    {(((this.props.turn === "R") && (this.props.score.red < (!(this.props.round.id % 2) ? 2 : 1)))
                    || ((this.props.turn === "B") && (this.props.score.blue < ((this.props.round.id % 2) ? 2 : 1)))) ?
                        <Col>
                            <Button variant="secondary" onClick={() => {
                                this.giveGuesses(8);
                            }}>8</Button>
                        </Col>
                    : null}
                    {(((this.props.turn === "R") && (this.props.score.red < (!(this.props.round.id % 2) ? 1 : 0)))
                    || ((this.props.turn === "B") && (this.props.score.blue < ((this.props.round.id % 2) ? 1 : 0)))) ?
                        <Col>
                            <Button variant="secondary" onClick={() => {
                                this.giveGuesses(9);
                            }}>9</Button>
                        </Col>
                    : null}
                    </Row>
                : null}
            </div>);
        }
        if (this.props.guesses > 0) {
            if (this.props.bonus) {
                game.push(
                    <Row key="info_guesses">
                        <Col>
                            <Alert variant="dark">{(this.props.turn==="R" ? "Red":"Blue")+" team has a Bonus Guess!"}</Alert>
                        </Col>
                        {((this.props.player_team === "red" && this.props.turn === "R") || (this.props.player_team === "blue" && this.props.turn === "B")) ?
                            <Col>
                                <Button onClick={()=> {
                                    let newTurn = (this.props.player_team === "blue") ? "R" : "B";
                                    firestore.collection("sessions").doc(this.props.session.db_id).update({
                                        guesses: 0,
                                        bonus: false,
                                        turn: newTurn,
                                    })
                                }}>Skip Bonus Guess</Button>
                            </Col>
                        :
                            null
                        }
                    </Row>
                );
            } else {
                game.push(
                    <Row key="info_guesses">
                        <Col>
                            <Alert variant="dark">{(this.props.turn==="R" ? "Red":"Blue")+" team has " + this.props.guesses + " guesses remaining."}</Alert>
                        </Col>
                    </Row>
                );
            }
        }
        return game;
    }

    genBoard() {
        let rows = []
        //if codemaster
        if ((this.props.teams.red[this.props.round.id % this.props.teams.red.length] === this.props.player_name) || (this.props.teams.blue[this.props.round.id % this.props.teams.blue.length] === this.props.player_name)) {
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
                        return <td id={r*4 + c} style={style} key={"i"+(r*5 + c)}>
                            {(this.props.round.guesses[r*5 + c]) ?
                                <del>{titleCase(this.props.round.words[r*5 + c])}</del>
                            :
                                <strong>{titleCase(this.props.round.words[r*5 + c])}</strong>
                            }
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
                        return <td id={r*5 + c} style={style} key={"i"+(r*5 + c)}
                        onClick={()=> {
                            if ((this.props.turn === "R" && this.props.player_team === "red") || (this.props.turn === "B" && this.props.player_team === "blue")) {//Verify that you can actually make the guess (avoid errors on simult guessing)
                            firestore.collection("sessions").doc(this.props.session.db_id).get().then(doc => {
                                let data = doc.data();
                                let newTurn = (data.turn === "R") ? "R" : "B";
                                if (data.guesses > 0 && !data.round.guesses[r*5 + c]) {
                                    data.round.guesses[r*5 + c] = "X";
                                    data.guesses = data.guesses - 1;
                                    switch (data.round.board[r*5 + c]) {
                                        case "A": {
                                            data.guesses = 0;
                                            data.stage = "results";
                                            data.round.id = data.round.id + 1
                                            if (this.props.player_team === "red") {
                                                data.score.red = -1;
                                                //data.score.blue = ((this.props.round.id % 2) ? 9 : 8);
                                            } else {
                                                //data.score.red = (!(this.props.round.id % 2) ? 9 : 8);
                                                data.score.blue = -1;
                                            }
                                            break;
                                        }
                                        case "R": {
                                            data.score.red += 1;
                                            if (this.props.player_team === "blue") {
                                                newTurn = "R";
                                                data.guesses = 0;
                                            }
                                            break;
                                        }
                                        case "B": {
                                            data.score.blue += 1;
                                            if (this.props.player_team === "red") {
                                                newTurn = "B";
                                                data.guesses = 0;
                                            }
                                            break;
                                        }
                                        case "C": {
                                            if (data.turn === "R") {
                                                newTurn = "B";
                                                data.guesses = 0;
                                            } else {
                                                newTurn = "R";
                                                data.guesses = 0;
                                            }
                                            break;
                                        }
                                        default: {
                                            break;
                                        }
                                    }
                                    if (data.guesses <= 0 && (((this.props.player_team === "red") && (data.round.board[r*5 + c] === "R")) || ((this.props.player_team === "blue") && (data.round.board[r*5 + c] === "B")))) {
                                        if (!data.bonus) {
                                            data.bonus = true;
                                            data.guesses = 1;
                                        } else {
                                            newTurn = (this.props.player_team === "blue") ? "R" : "B";
                                            data.bonus = false;
                                        }
                                    }
                                    if (data.score.red >= (!(this.props.round.id % 2) ? 9 : 8) || data.score.blue >= ((this.props.round.id % 2) ? 9 : 8)) {
                                        data.stage = "results";
                                        data.round.id = data.round.id + 1
                                    }
                                    firestore.collection("sessions").doc(this.props.session.db_id).update({
                                        guesses: data.guesses,
                                        "round.guesses": data.round.guesses,
                                        turn: newTurn,
                                        score: data.score,
                                        stage: data.stage,
                                        "round.id": data.round.id,
                                        bonus: data.bonus,
                                    })
                                }
                            })}
                        }}>
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
    score: state.score,
    bonus: state.bonus,
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

import React, { Component } from 'react';
import { connect } from "react-redux";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

import win_blue from "../assets/win_blue.png";
import win_red from "../assets/win_red.png";
import lose_blue from "../assets/lose_blue.png";
import lose_red from "../assets/lose_red.png";

function titleCase(string) {
    if (!string) return "";
    let sentence = string.toLowerCase().split(" ");
    for(let i = 0; i< sentence.length; i++){
        sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
    }
    return sentence.join(" ");
}

//Duplicated form Game
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

class End extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    genBoard() {
        let rows = [];
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
                        <strong>{titleCase(this.props.round.words[r*5 + c])}</strong>
                    </td>
                })}
            </tr>
            rows.push(row)
        }
        return rows;
    }

    render() {
        return (<React.Fragment>
            <Row key={"you"}>
                <Col>
                    <Alert variant={this.props.player_team === "red" ? "danger" : "primary"}>
                        {(((this.props.teams.red[this.props.round.id % this.props.teams.red.length] === this.props.player_name) || (this.props.teams.blue[this.props.round.id % this.props.teams.blue.length] === this.props.player_name)) ? "Codemaster " : "Agent ") + titleCase(this.props.player_name)}
                    </Alert>
                </Col>
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
            </Row>
            <Row>
                {this.props.player_team === "red" ?
                    <Col>
                        {((!(this.props.round.id % 2) && (this.props.score.red > this.props.score.blue)) || ((this.props.round.id % 2) && (this.props.score.red >= this.props.score.blue))) ?
                            <Image src={win_red} style={{width: "100%"}}/>
                        :
                            <Image src={lose_red} style={{width: "100%"}}/>
                        }
                    </Col>
                :
                <Col>
                    {((!(this.props.round.id % 2) && (this.props.score.red > this.props.score.blue)) || ((this.props.round.id % 2) && (this.props.score.red >= this.props.score.blue))) ?
                        <Image src={lose_blue} style={{width: "100%"}}/>
                    :
                        <Image src={win_blue} style={{width: "100%"}}/>
                    }
                </Col>
                }
            </Row>
            <Row key={"scores"}>
                <Col>
                    <Table bordered>
                        <tbody>
                            {this.genBoard()}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </React.Fragment>);
    }
}

// <Row>
//     <Col>
//         <Table bordered>
//             <tbody>
//                 {this.genBoard()}
//             </tbody>
//         </Table>
//     </Col>
// </Row>

const mapStateToProps = state => ({
    player_name: state.player_name,
    player_team: state.player_team,
    players: state.players,
    teams: state.teams,
    round: state.round,
    score: state.score,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(End);

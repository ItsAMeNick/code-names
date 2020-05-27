import React, { Component } from 'react';
import { connect } from "react-redux";
import firestore from "../modules/firestore.js";

import ProgressBar from "react-bootstrap/ProgressBar";

class LoadWords extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: 0,
        };
    }

    componentDidMount() {
        firestore.collection("words").get().then(resp => {
            let words = {}
            for (let topic in resp.docs) {
                let data = resp.docs[topic].data()
                words[data.version] = data.words
            }
            this.setState({loaded: 100})
            this.props.setWords(words)
        });
    }

    render() {
        return (
            <div>
                <ProgressBar now={this.state.loaded} label={this.state.loaded+"%"}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    setWords: (words) => dispatch({
        type: "set_words",
        payload: words
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadWords);

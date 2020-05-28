import _ from "lodash";
import firestore from "../modules/firestore.js";

const initialState = {
    player_name: "",
    player_team: "",
    players: [],
    teams: {
        red: [],
        blue: []
    },
    db_updated: false,
    version: "classic",
    words: {},
    session: {
        key: "",
        db_id: ""
    },
    stage: "",
    round: {
        id: 0,
        words: "",
        board: ""
    },
    turn: "",
    guesses: 0,
    score: {
        red: 0,
        blue: 0
    }
};

const codeNamesReducer = (state = initialState, action) => {
    switch (action.type) {
    case "dump_store": {
        console.log(state);
        return state;
    }

    case "load_wordlist": {
        console.log(state);
        let file = "";
        let words = file.split("\n").map(item => item.toLowerCase());
        console.log(words);
        firestore.collection("words").doc("WuyqyBh1ecLt16urvTS2").update({
            words: words
        })
        return state;
    }

    case "set_words": {
        let newState = _.cloneDeep(state);
        newState.words = action.payload;
        newState.db_updated = true;
        return newState;
    }

    case "set_session": {
        let newState = _.cloneDeep(state);
        newState.session = action.payload;
        return newState;
    }

    case "set_player": {
        let newState = _.cloneDeep(state);
        newState.player_name = action.payload;
        return newState;
    }

    case "set_team": {
        let newState = _.cloneDeep(state);
        newState.player_team = action.payload;
        return newState;
    }

    case "update_game": {
        let newState = _.cloneDeep(state);
        newState.stage = action.payload.stage;
        newState.players = action.payload.players;
        newState.round = action.payload.round;
        newState.turn = action.payload.turn;
        newState.guesses = action.payload.guesses;
        newState.score = action.payload.score;
        if (action.payload.players[action.payload.round.chameleon] === state.player_name) {
            newState.round.role = "";
        } else {
            newState.round.role = action.payload.round.word;
        }
        newState.teams = action.payload.teams;
        for (let i in action.payload.teams.red) {
            if (state.player_name === action.payload.teams.red[i]) newState.player_team = "red";
        }
        for (let i in action.payload.teams.blue) {
            if (state.player_name === action.payload.teams.blue[i]) newState.player_team = "blue";
        }
        return newState;
    }

    case "clear_game": {
        let newState = _.cloneDeep(initialState);
        return newState;
    }

    default:
        return state;
    }
};

export default codeNamesReducer;
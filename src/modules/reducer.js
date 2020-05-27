import _ from "lodash";

const initialState = {
    player_name: "",
    player_team: "",
    players: [],
    db_updated: false,
    words: {},
    session: {
        key: "",
        db_id: ""
    },
    stage: "",
    round: {
        id: 0,
        words: "",
        role: ""
    }
};

const codeNamesReducer = (state = initialState, action) => {
    switch (action.type) {
    case "dump_store": {
        console.log(state);
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

    case "clear_game": {
        let newState = _.cloneDeep(initialState);
        return newState;
    }

    default:
        return state;
    }
};

export default codeNamesReducer;

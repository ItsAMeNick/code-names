import _ from "lodash";

const initialState = {
    player_name: "",
    players: [],
    db_updated: false,
    topics: {},
    session: {
        key: "",
        db_id: ""
    },
    stage: "",
    round: {
        id: 0,
        topic: "",
        role: ""
    },
    voting: {
        voters: [],
        votes: [],
    }
};

const codeNamesReducer = (state = initialState, action) => {
    switch (action.type) {
    case "dump_store": {
        console.log(state);
        return state;
    }

    case "clear_game": {
        let newState = _.cloneDeep(initialState);
        return newState;
    }

    default:
        return state;
    }
};

export default chameleonReducer;

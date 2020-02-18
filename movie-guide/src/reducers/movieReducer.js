import * as types from '../actions/actionTypes';

const initialState = {
    movies: []
};

const movieReducer = function(state = initialState, action) {
    switch(action.type) {
        case types.GET_MOVIES_SUCCESS:
            return {...state, movies: action.movies};
    }

    return state;
};

export default movieReducer;
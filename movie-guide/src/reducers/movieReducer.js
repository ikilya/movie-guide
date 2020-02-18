import * as types from '../actions/actionTypes';

const initialState = {
    movies: [],
    movieFormats: []
};

const movieReducer = function(state = initialState, action) {
    switch(action.type) {
        case types.GET_MOVIES_SUCCESS:
            return {...state, movies: action.movies};
        case types.SET_MOVIE_SUCCESS:
            const newMovies = [...state.movies, action.movie];
            return {...state, movies: newMovies};
        case types.GET_MOVIE_FORMATS_SUCCESS:
            return {...state, movieFormats: action.movieFormats};
    }

    return state;
};

export default movieReducer;
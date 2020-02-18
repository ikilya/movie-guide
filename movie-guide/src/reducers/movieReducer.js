import * as types from '../actions/actionTypes';

const initialState = {
    movies: [],
    movieFormats: []
};

const movieReducer = function(state = initialState, action) {
    switch(action.type) {
        case types.GET_MOVIES_SUCCESS:
            const newMovies = action.movies;
            newMovies.sort(compareMovieNames);
            return {...state, movies: action.movies};
        case types.SET_MOVIE_SUCCESS: {
            const newMovies = [...state.movies, action.movie];
            newMovies.sort(compareMovieNames);
            return {...state, movies: newMovies};
        }
        case types.GET_MOVIE_FORMATS_SUCCESS:
            return {...state, movieFormats: action.movieFormats};
    }

    return state;
};

function compareMovieNames(movieA, movieB) {
    const a = movieA.title.toLowerCase();
    const b = movieB.title.toLowerCase();
    if (a > b) {
        return 1;
    }
    if (a < b) {
        return -1;
    }
    return 0;
}

export default movieReducer;
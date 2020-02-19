import * as types from '../actions/actionTypes';

const initialState = {
    movies: [],
    movieFormats: []
};

const movieReducer = function(state = initialState, action) {
    switch(action.type) {
        case types.GET_MOVIES_SUCCESS:
            const newMovies = action.movies.map((movie) => {
                return {...movie, showInfo: false}
            });
            newMovies.sort(compareMovieNames);
            return {...state, movies: newMovies};
        case types.SET_MOVIE_SUCCESS: {
            const newMovies = [...state.movies, action.movie];
            newMovies.sort(compareMovieNames);
            return {...state, movies: newMovies};
        }
        case types.DELETE_MOVIE_SUCCESS: {
            const newMovies = [...state.movies];
            const index = newMovies.findIndex(movie => movie._id === action.movieId);
            newMovies.splice(index, 1);
            return {...state, movies: newMovies};
        }
        case types.GET_MOVIE_FORMATS_SUCCESS:
            return {...state, movieFormats: action.movieFormats};
        case types.CHANGE_SHOW_INFO: {
            const newMovies = [...state.movies];
            const index = newMovies.findIndex(movie => movie._id === action.movieId);
            newMovies[index] = {...newMovies[index], showInfo: !newMovies[index].showInfo};
            return {...state, movies: newMovies};
        }
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
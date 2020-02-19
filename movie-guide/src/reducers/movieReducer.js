import * as types from '../actions/actionTypes';

const initialState = {
    movies: [],
    foundMovies: [],
    movieFormats: []
};

const movieReducer = function(state = initialState, action) {
    switch(action.type) {
        case types.GET_MOVIES_SUCCESS:
            const newMovies = action.movies.map((movie) => {
                return {...movie, showInfo: false}
            });
            newMovies.sort(compareMovieNames);
            return {...state, movies: newMovies, foundMovies: newMovies};
        case types.SET_MOVIE_SUCCESS: {
            const newMovies = [...state.movies, action.movie];
            newMovies.sort(compareMovieNames);
            return {...state, movies: newMovies, foundMovies: newMovies};
        }
        case types.DELETE_MOVIE_SUCCESS: {
            const newMovies = [...state.movies];
            const newFoundMovies = [...state.foundMovies];
            const movieIndex = newMovies.findIndex(movie => movie._id === action.movieId);
            const foundMovieIndex = newFoundMovies.findIndex(movie => movie._id === action.movieId);
            newMovies.splice(movieIndex, 1);
            newFoundMovies.splice(foundMovieIndex, 1);
            return {...state, movies: newMovies, foundMovies: newFoundMovies};
        }
        case types.GET_MOVIE_FORMATS_SUCCESS:
            return {...state, movieFormats: action.movieFormats};
        case types.CHANGE_SHOW_INFO: {
            const newMovies = [...state.foundMovies];
            const index = newMovies.findIndex(movie => movie._id === action.movieId);
            newMovies[index] = {...newMovies[index], showInfo: !newMovies[index].showInfo};
            return {...state, foundMovies: newMovies};
        }
        case types.DO_SEARCH: {
            const searchText = action.searchParameters.searchText.toLowerCase();
            const searchByActor = action.searchParameters.searchByActor;
            const newFoundMovies = [...state.movies].filter((movie) => {
                if (!searchByActor) {
                    return movie.title.toLowerCase().indexOf(searchText) >= 0;
                }
                for (let actor of movie.stars) {
                    if (actor.toLowerCase().indexOf(searchText) >= 0) {
                        return true;
                    }
                }
                return false;
            });
            return {...state, foundMovies: newFoundMovies};
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
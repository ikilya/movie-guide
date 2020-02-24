import * as types from '../actions/actionTypes';

const initialState = {
    pageCount: 1,
    currentPage: 1,
    movies: [],
    movieFormats: [],
    searchParameters: {
        searchText: '',
        searchByActor: false
    },
    message: ''
};

const movieReducer = function(state = initialState, action) {
    switch(action.type) {
        case types.GET_MOVIES_SUCCESS:
            const newFormattedMovies = action.movies.map((movie) => {
                return {...movie, showInfo: false}
            });
            return {...state, pageCount: action.pageCount, movies: newFormattedMovies};
        case types.SET_MOVIE_SUCCESS: {
            const newMovies = [...state.movies, action.movie];
            return {...state, movies: newMovies, message: 'Movie added'};
        }
        case types.DELETE_MOVIE_SUCCESS: {
            const newMovies = [...state.movies];
            const movieIndex = newMovies.findIndex(movie => movie._id === action.movieId);
            newMovies.splice(movieIndex, 1);
            return {...state, movies: newMovies, message: 'Movie deleted'};
        }
        case types.GET_MOVIE_FORMATS_SUCCESS:
            return {...state, movieFormats: action.movieFormats};
        case types.CHANGE_SHOW_INFO: {
            const newMovies = [...state.movies];
            const index = newMovies.findIndex(movie => movie._id === action.movieId);
            newMovies[index] = {...newMovies[index], showInfo: !newMovies[index].showInfo};
            return {...state, movies: newMovies};
        }
        case types.DO_SEARCH: {
            return {...state, searchParameters: action.searchParameters, currentPage: 1, message: ''};
        }
        case types.CHANGE_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage};
        case types.CHANGE_MESSAGE:
            return {...state, message: action.message};
    }

    return state;
};

export default movieReducer;
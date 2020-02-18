import * as types from './actionTypes';

export function getMoviesSuccess(movies) {
    return {
        type: types.GET_MOVIES_SUCCESS,
        movies
    };
}

export function getMovieFormatsSuccess(movieFormats) {
    return {
        type: types.GET_MOVIE_FORMATS_SUCCESS,
        movieFormats
    };
}
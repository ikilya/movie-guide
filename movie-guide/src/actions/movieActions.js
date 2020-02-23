import * as types from './actionTypes';

export function getMoviesSuccess(pageCount, movies) {
    return {
        type: types.GET_MOVIES_SUCCESS,
        pageCount,
        movies
    };
}

export function setMovieSuccess(movie) {
    return {
        type: types.SET_MOVIE_SUCCESS,
        movie
    };
}

export function deleteMovieSuccess(movieId) {
    return {
        type: types.DELETE_MOVIE_SUCCESS,
        movieId
    };
}

export function getMovieFormatsSuccess(movieFormats) {
    return {
        type: types.GET_MOVIE_FORMATS_SUCCESS,
        movieFormats
    };
}

export function changeShowInfo(movieId) {
    return {
        type: types.CHANGE_SHOW_INFO,
        movieId
    };
}

export function doSearch(searchParameters) {
    return {
        type: types.DO_SEARCH,
        searchParameters
    };
}

export function changeCurrentPage(currentPage) {
    return {
        type: types.CHANGE_CURRENT_PAGE,
        currentPage
    };
}
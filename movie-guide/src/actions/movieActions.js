import * as types from './actionTypes';

export function getMoviesSuccess(movies) {
    return {
        type: types.GET_MOVIES_SUCCESS,
        movies
    };
}
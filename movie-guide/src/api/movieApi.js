import axios from 'axios';
import store from '../store';
import { getMoviesSuccess, getMovieFormatsSuccess } from '../actions/movieActions';

export function getMovies() {
    return axios.get('http://localhost:3000/movies/')
        .then(response => {
            console.log(response.data);
            store.dispatch(getMoviesSuccess(response.data.movies));
            return response;
        });
}

export function getMovieFormats() {
    return axios.get('http://localhost:3000/movieformats/')
        .then(response => {
            console.log(response.data);
            store.dispatch(getMovieFormatsSuccess(response.data.movieFormats));
            return response;
        });
}
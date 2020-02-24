import axios from 'axios';
import store from '../store';
import { getMoviesSuccess, setMovieSuccess, deleteMovieSuccess, getMovieFormatsSuccess } from '../actions/movieActions';

export function getMovies(searchParameters, currentPage = 1, pageSize = 10) {
    return axios
            .get(`http://localhost:3000/movies?searchText=${searchParameters.searchText}&searchByActor=${searchParameters.searchByActor}&currentPage=${currentPage}&pageSize=${pageSize}`)
            .then(response => {
                console.log(response.data.paginationInfo.pageCount);
                store.dispatch(getMoviesSuccess(response.data.paginationInfo.pageCount, response.data.movies));
                return response;
            })
            .catch(function (error) {
                console.log(error);
            });
}

export function setMovie(movie) {
    return axios
        .post('http://localhost:3000/movies/', movie)
        .then(function (response) {
            store.dispatch(setMovieSuccess(response.data.createdMovie.movie));
        })
        .catch(function (error) {
            console.log(error);
        });
}

export function deleteMovie(movieId) {
    return axios
        .delete('http://localhost:3000/movies/' + movieId)
        .then(function (response) {
            store.dispatch(deleteMovieSuccess(movieId));
        })
        .catch(function (error) {
            console.log(error);
        });
}

export function getMovieFormats() {
    return axios.get('http://localhost:3000/movieformats/')
        .then(response => {
            store.dispatch(getMovieFormatsSuccess(response.data.movieFormats));
            return response;
        })
        .catch(function (error) {
            console.log(error);
        });
}
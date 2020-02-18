import React, { Component } from "react";
import {connect} from "react-redux";
import * as movieApi from '../api/movieApi'

import MovieList from "./MovieList";

class ReduxMovieList extends Component {

    componentDidMount() {
        movieApi.getMovies();
    }

    render() {
        return <MovieList movies = {this.props.movies} />;
    }
}

function mapStateToProps(state) {
    const { movies } = state.movieState;
    return { movies };
}

export default connect(mapStateToProps)(ReduxMovieList);
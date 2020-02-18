import React, { Component } from "react";
import {connect} from "react-redux";
import * as movieApi from '../api/movieApi'

import MovieList from "./MovieList";
import {changeShowInfo} from "../actions/movieActions";

class ReduxMovieList extends Component {

    componentDidMount() {
        movieApi.getMovies();
    }

    render() {
        return <MovieList movies = {this.props.movies} changeShowInfo = {this.props.changeShowInfo} />;
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeShowInfo: function(movieId) {
            dispatch(changeShowInfo(movieId));
        }
    }
}

function mapStateToProps(state) {
    const { movies } = state.movieState;
    return { movies };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxMovieList);
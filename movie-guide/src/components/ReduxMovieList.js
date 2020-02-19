import React, { PureComponent } from "react";
import {connect} from "react-redux";
import * as movieApi from '../api/movieApi'

import MovieList from "./MovieList";
import {changeShowInfo} from "../actions/movieActions";

class ReduxMovieList extends PureComponent {

    componentDidMount() {
        movieApi.getMovies();
    }

    render() {
        return <MovieList movies = {this.props.foundMovies} changeShowInfo = {this.props.changeShowInfo} deleteMovie = {movieApi.deleteMovie} />;
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
    const { foundMovies } = state.movieState;
    return { foundMovies };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxMovieList);
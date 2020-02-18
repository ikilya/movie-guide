import React, { Component } from "react";
import {connect} from "react-redux";
import * as movieApi from '../api/movieApi'

import NewMovieForm from "./NewMovieForm";

class ReduxNewMovieForm extends Component {
    constructor(props) {
        super(props);

        this.setMovie = this.setMovie.bind(this);
    }

    setMovie(movie) {
        movieApi.setMovie(movie);
    }

    componentDidMount() {
        movieApi.getMovieFormats();
    }

    render() {
        return <NewMovieForm
                    movieFormats = {this.props.movieFormats}
                    setMovie = {this.setMovie}
            />;
    }
}

function mapStateToProps(state) {
    const { movieFormats } = state.movieState;
    return { movieFormats };
}

export default connect(mapStateToProps)(ReduxNewMovieForm);
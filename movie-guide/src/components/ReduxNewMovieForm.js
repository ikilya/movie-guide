import React, { PureComponent } from "react";
import {connect} from "react-redux";
import * as movieApi from '../api/movieApi'

import NewMovieForm from "./NewMovieForm";

class ReduxNewMovieForm extends PureComponent {
    constructor(props) {
        super(props);

        this.setMovie = this.setMovie.bind(this);
    }

    setMovie(movie) {
        movieApi.setMovie(movie)
            .then(() => {
                movieApi.getMovies(this.props.searchParameters, this.props.currentPage);
            });
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
    const { movieFormats, currentPage, searchParameters } = state.movieState;
    return { movieFormats, currentPage, searchParameters };
}

export default connect(mapStateToProps)(ReduxNewMovieForm);
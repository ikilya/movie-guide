import React, { Component } from "react";
import {connect} from "react-redux";
import * as movieApi from '../api/movieApi'

import NewMovieForm from "./NewMovieForm";

class ReduxNewMovieForm extends Component {

    componentDidMount() {
        movieApi.getMovieFormats();
    }

    render() {
        return <NewMovieForm movieFormats = {this.props.movieFormats} />;
    }
}

function mapStateToProps(state) {
    const { movieFormats } = state.movieState;
    return { movieFormats };
}

export default connect(mapStateToProps)(ReduxNewMovieForm);
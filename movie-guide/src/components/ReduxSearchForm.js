import React, { PureComponent } from "react";
import {connect} from "react-redux";

import SearchForm from "./SearchForm";
import {doSearch} from "../actions/movieActions";
import * as movieApi from "../api/movieApi";

class ReduxSearchForm extends PureComponent {
    componentDidUpdate(prevProps, prevState, snapshot) {
            movieApi.getMovies(this.props.searchParameters, this.props.currentPage);
    }

    render() {
        return <SearchForm doSearch = {this.props.doSearch}/>;
    }
}

function mapDispatchToProps(dispatch) {
    return {
        doSearch: function(searchParameters) {
            dispatch(doSearch(searchParameters));
        }
    }
}

function mapStateToProps(state) {
    const { searchParameters, currentPage } = state.movieState;
    return { searchParameters, currentPage };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxSearchForm);
import React, { Component } from "react";
import {connect} from "react-redux";

import SearchForm from "./SearchForm";
import {doSearch} from "../actions/movieActions";

class ReduxSearchForm extends Component {
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
    const { movieFormats } = state.movieState;
    return { movieFormats };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxSearchForm);
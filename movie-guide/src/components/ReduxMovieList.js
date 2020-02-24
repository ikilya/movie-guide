import React, { PureComponent } from "react";
import {connect} from "react-redux";
import * as movieApi from '../api/movieApi'

import MovieList from "./MovieList";
import {changeCurrentPage, changeShowInfo} from "../actions/movieActions";

class ReduxMovieList extends PureComponent {

    componentDidMount() {
        movieApi.getMovies(this.props.searchParameters, this.props.currentPage);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.currentPage !== this.props.currentPage) {
            movieApi.getMovies(this.props.searchParameters, this.props.currentPage);
        }
    }

    render() {
        return <MovieList
                    movies = {this.props.movies}
                    pageCount = {this.props.pageCount}
                    currentPage = {this.props.currentPage}
                    handlePageClick = {this.props.handlePageClick}
                    changeShowInfo = {this.props.changeShowInfo}
                    deleteMovie = {(id) => {
                        if (confirm('Delete movie?')) {
                            movieApi.deleteMovie(id);
                        }
                    }}
                />;
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeShowInfo: function(movieId) {
            dispatch(changeShowInfo(movieId));
        },
        handlePageClick: function (currentPageData) {
            dispatch(changeCurrentPage(currentPageData.selected + 1));
        }
    }
}

function mapStateToProps(state) {
    const { pageCount, currentPage, movies, searchParameters } = state.movieState;
    return { pageCount, currentPage, movies, searchParameters };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxMovieList);
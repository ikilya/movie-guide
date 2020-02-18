import React, { Component } from "react";

import './MovieList.css';

class MovieList extends Component {

    render() {
        return (
            <ul className="movieList">
                {this.props.movies.map((movie) => {
                    return (<li key={movie._id}>
                                {movie.title}
                            </li>)
                })}
            </ul>
        );
    }
}

export default MovieList;
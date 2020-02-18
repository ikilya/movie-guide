import React, { Component } from "react";

import './MovieList.css';

class MovieList extends Component {

    render() {
        return (
            <ul className="movieList">
                {this.props.movies.map((movie) => {
                    return (<li key={movie._id}>
                                <div className = 'movieDetails'>
                                    <div className = 'movieTitle'>
                                        {movie.title}
                                    </div>
                                    { movie.showInfo &&
                                        <div className='movieInfo'>
                                            <p>{movie.releaseYear}</p>
                                            <p>{movie.movieFormat.toUpperCase()}</p>
                                            <h3>Stars</h3>
                                            <ul>
                                                {movie.stars.map((star, index) => {
                                                    return (
                                                        <li key={index}>
                                                            {star}
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                    }
                                </div>
                                <div className = 'movieControls'>
                                    <button
                                        className = 'button showInfoButton'
                                        onClick={() => {
                                            this.props.changeShowInfo(movie._id)
                                        }}
                                    >
                                        Info
                                    </button>
                                    <button
                                        className = 'button removeButton'
                                    >
                                        Remove
                                    </button>
                                </div>
                            </li>)
                })}
            </ul>
        );
    }
}

export default MovieList;
import React from "react";
import ReactPaginate from 'react-paginate';

import './MovieList.css';

function MovieList(props) {

    return (
        <div>
            <ul className="movieList">
                {props.movies.map((movie) => {
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
                                        onClick={props.changeShowInfo.bind(null, movie._id)}
                                    >
                                        Info
                                    </button>
                                    <button
                                        className = 'button removeButton'
                                        onClick={props.deleteMovie.bind(null, movie._id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </li>)
                })}
            </ul>
            <ReactPaginate
                pageCount={props.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={1}
                forcePage = {props.currentPage - 1}
                onPageChange={props.handlePageClick}
                breakClassName={'breakMe'}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
            />
        </div>
    );
}

export default MovieList;
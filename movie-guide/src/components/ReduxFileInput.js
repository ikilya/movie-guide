import React, { PureComponent } from "react";
import * as movieApi from '../api/movieApi'

import FileInput from "./FileInput";
import {changeMessage} from "../actions/movieActions";
import {connect} from "react-redux";

class ReduxFileInput extends PureComponent {
    constructor(props) {
        super(props);
        this.handleFileString = this.handleFileString.bind(this);
    }

    handleFileString(fileString) {
        if (!fileString) return;

        let movies = [];
        try {
            const moviesStrings = fileString.trim().split('\n');
            let i = 0;
            let j = 0;
            while (i < moviesStrings.length) {
                switch (i % 5) {
                    case 0:
                        movies[j] = {};
                        movies[j].title = moviesStrings[i].split(':')[1].trim();
                        break;
                    case 1:
                        const releaseYear = Number(moviesStrings[i].split(':')[1].trim());
                        if (releaseYear &&
                            Math.round(releaseYear) === releaseYear &&
                            releaseYear >= 1850 &&
                            releaseYear <= 2020
                        ) {
                            movies[j].releaseYear = releaseYear;
                        } else {
                            throw Error('Invalid release year');
                        }
                        break;
                    case 2:
                        const movieFormat = moviesStrings[i].split(':')[1].trim().toLowerCase();
                        if (movieFormat === 'vhs' || movieFormat === 'dvd' || movieFormat === 'blu-ray') {
                            movies[j].movieFormat = movieFormat;
                        } else {
                            throw Error('Invalid movie format');
                        }
                        break;
                    case 3:
                        const unionStars = moviesStrings[i].split(':')[1].trim();
                        const stars = unionStars.split(', ');
                        movies[j].stars = stars;
                        break;
                    case 4:
                        j++;
                        break;
                }
                i++;
            }

            if (movies.length > 0) {
                movies.map((movie) => {
                    movieApi.setMovie(movie);
                });
            } else {
                this.props.changeMessage('Failed to load movies');
            }
        } catch (e) {
            this.props.changeMessage('Failed to load movies');
            console.log(e);
        }
    }

    render() {
        return <FileInput handleFileString = {this.handleFileString}/>;
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeMessage: function(message) {
            dispatch(changeMessage(message));
        }
    }
}

function mapStateToProps(state) {
    const { message } = state.movieState;
    return { message };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxFileInput);
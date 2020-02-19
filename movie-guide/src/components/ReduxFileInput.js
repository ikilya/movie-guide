import React, { PureComponent } from "react";
import * as movieApi from '../api/movieApi'

import FileInput from "./FileInput";

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
                            releaseYear > 1895 &&
                            releaseYear < 2030
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
        } catch (e) {
            console.log(e);
        }

        movies.length > 0 && movies.map((movie) => {
            console.log(movie);
            movieApi.setMovie(movie);
        });
    }

    render() {
        return <FileInput handleFileString = {this.handleFileString}/>;
    }
}

export default ReduxFileInput;
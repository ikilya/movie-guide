const mongoose = require('mongoose');
const Movie = require('../models/movie');
const MovieFormat = require('../models/movieFormat');

exports.moviesGetAll = (request, response, next) => {
    Movie.find()
        .select('title releaseYear movieFormat stars _id')
        .populate('movieFormat')
        .exec()
        .then(docs => {
            const docsResponse = {
                count: docs.length,
                movies: docs.map(doc => {
                    return {
                        title: doc.title,
                        releaseYear: doc.releaseYear,
                        movieFormat: doc.movieFormat.movieFormat,
                        stars: doc.stars,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/movies/' + doc._id
                        }
                    }
                })
            };
            response.status(200).json(docsResponse);
        })
        .catch(error => {
            console.log(error);
            response.status(500).json({
                error: error
            })
        });
};

exports.moviesCreateMovie = (request, response, next) => {
    MovieFormat
        .findOne({movieFormat: request.body.movieFormat})
        .select('movieFormat _id')
        .exec()
        .then(result => {
            if (!result) {
                return response.status(404).json({
                    message: "Movie format not found"
                })
            }
            const movie = new Movie({
                _id: new mongoose.Types.ObjectId,
                title: request.body.title,
                releaseYear: request.body.releaseYear,
                movieFormat: result._id,
                stars: request.body.stars
            });
            return movie.save();
        })
        .then(result => {
            console.log(result);
            response.status(201).json({
                message: 'Created movie successfully',
                createdMovie: {
                    movie: {
                        title: result.title,
                        releaseYear: result.releaseYear,
                        movieFormat: request.body.movieFormat,
                        stars: result.stars,
                        _id: result._id
                    },
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/movies/' + result._id
                    }
                }
            })
        })
        .catch(error => {
            console.log(error);
            response.status(500).json({
                error: error
            });
        });
};

exports.moviesGetMovie = (request, response, next) => {
    const id = request.params.movieId;

    Movie.findById(id)
        .select('title releaseYear movieFormat stars _id')
        .populate('movieFormat')
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                response.status(200).json({
                    movie: {
                        title: doc.title,
                        releaseYear: doc.releaseYear,
                        movieFormat: doc.movieFormat.movieFormat,
                        stars: doc.stars,
                        _id: doc._id
                    },
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/movies/'
                    }
                });
            } else {
                response.status(404).json({
                    message: 'No valid entry found for provided ID'
                });
            }
        })
        .catch(error => {
            console.log(error);
            response.status(500).json({
                error: error
            });
        });
};

exports.moviesDeleteMovie = (request, response, next) => {
    const id = request.params.movieId;
    Movie.remove({_id: id})
        .exec()
        .then(result => {
            response.status(200).json({
                message: 'Movie deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/movies/',
                    body: {
                        title: 'String',
                        releaseYear: 'Number',
                        movieFormat: 'String',
                        stars: 'Array'
                    }
                }
            });
        })
        .catch(error => {
            console.log(error);
            response.status(500).json({
                error: error
            });
        });
};
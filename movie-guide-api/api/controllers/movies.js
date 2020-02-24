const mongoose = require('mongoose');
const Movie = require('../models/movie');
const MovieFormat = require('../models/movieFormat');

const { calculateLimitAndOffset, paginate } = require('paginate-info');

exports.moviesGetAll = (request, response, next) => {
    const { query: { searchText, searchByActor, currentPage, pageSize } } = request;
    const { limit, offset } = calculateLimitAndOffset(currentPage, pageSize);
    const findParameters = {};
    if (searchText) {
        if (searchByActor === 'true') {
            findParameters.stars = new RegExp(searchText);
        } else {
            findParameters.title = new RegExp(searchText);
        }
    }

    Movie
        .find(findParameters)
        .then(data => {
            Movie
                .find(findParameters)
                .sort('title')
                .limit(limit)
                .skip(offset)
                .select('title releaseYear movieFormat stars _id')
                .populate('movieFormat')
                .exec()
                .then(docs => {
                    const meta = paginate(currentPage, data.length, docs, pageSize);
                    const docsResponse = {
                        paginationInfo: meta,
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
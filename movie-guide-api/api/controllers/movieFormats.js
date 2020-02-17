const mongoose = require('mongoose');
const MovieFormat = require('../models/movieFormat');

exports.movieFormatsGetAll = (request, response, next) => {
    MovieFormat.find()
        .select('movieFormat _id')
        .exec()
        .then(docs => {
            const docsResponse = {
                count: docs.length,
                movies: docs.map(doc => {
                    return {
                        movieFormat: doc.movieFormat,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/movieformats/' + doc._id
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

exports.movieFormatsCreateMovieFormat = (request, response, next) => {
    const movieFormat = new MovieFormat({
        _id: new mongoose.Types.ObjectId,
        movieFormat: request.body.movieFormat
    });
    movieFormat
        .save()
        .then(result => {
            console.log(result);
            response.status(201).json({
                message: 'Created movie format successfully',
                createdMovie: {
                    movieFormat: result.movieFormat,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/movieformats/' + result._id
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
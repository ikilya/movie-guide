const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    releaseYear: {
        type: Number,
        required: [true, 'Release year is required'],
        min: [1895, 'Too small year'],
        max: [2030, 'Too big year']
    },
    movieFormat: {
        type: mongoose.Schema.ObjectId,
        ref: 'MovieFormat',
        required: [true, 'Movie format is required']
    },
    stars: [{
        type: String,
        required: [true, 'Actor is required'],
        minlength: [2, 'Too short name']
    }]
});

module.exports = mongoose.model('Movie', movieSchema);
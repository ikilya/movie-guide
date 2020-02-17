const mongoose = require('mongoose');

const movieFormatSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    movieFormat: {
        type: String,
        required: [true, 'Movie format is required'],
        minlength: [3, 'Too short format'],
        maxlength: [10, 'Too long format'],
        lowercase: true
    }
});

module.exports = mongoose.model('MovieFormat', movieFormatSchema);
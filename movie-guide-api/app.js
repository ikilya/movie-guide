const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const movieRoutes = require('./api/routes/movies');
const movieFormatRoutes = require('./api/routes/movieFormats');

mongoose.connect('mongodb+srv://movie-guide:' +
    process.env.MONGO_ATLAS_PW +
    '@cluster0-kss2g.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', '*');
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

app.use('/movies', movieRoutes);
app.use('/movieformats', movieFormatRoutes);

app.use((request, response, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, request, response, next) => {
    response.status(error.status || 500);
    response.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
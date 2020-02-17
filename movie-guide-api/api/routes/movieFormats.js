const express = require('express');
const router = express.Router();

const MovieFormatsController = require('../controllers/movieFormats');

router.get('/', MovieFormatsController.movieFormatsGetAll);

router.post('/', MovieFormatsController.movieFormatsCreateMovieFormat);

module.exports = router;

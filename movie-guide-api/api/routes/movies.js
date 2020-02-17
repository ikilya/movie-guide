const express = require('express');
const router = express.Router();

const MoviesController = require('../controllers/movies');

router.get('/', MoviesController.moviesGetAll);

router.post('/', MoviesController.moviesCreateMovie);

router.get('/:movieId', MoviesController.moviesGetMovie);

router.delete('/:movieId', MoviesController.moviesDeleteMovie);

module.exports = router;

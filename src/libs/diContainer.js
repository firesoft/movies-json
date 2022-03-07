const awilix = require('awilix');
// const path = require('path');
const dbConfig = require('../helpers/DbConfig').get();

const container = awilix.createContainer();

const ControllerLoader = require('./ControllerLoader');
const MovieAddValidator = require('../validators/MovieAddValidator');
const MoviesGetValidator = require('../validators/MoviesGetValidator');
const MoviesGetController = require('../controllers/MoviesGetController');
const MovieAddController = require('../controllers/MovieAddController');
const MovieService = require('../services/MovieService');

const {JsonDb} = require('../json-db');

const MoviesRepository = require('../repositories/MoviesRepository');
const GenresRepository = require('../repositories/GenresRepository');

const Genre = require('../models/Genre');
const Movie = require('../models/Movie');

container.register({
    container: awilix.asValue(container),
    controllerLoader: awilix.asClass(ControllerLoader).singleton(),

    movieAddValidator: awilix.asClass(MovieAddValidator).singleton(),
    moviesGetValidator: awilix.asClass(MoviesGetValidator).singleton(),

    moviesGetController: awilix.asClass(MoviesGetController).scoped(),
    movieAddController: awilix.asClass(MovieAddController).scoped(),

    movieService: awilix.asClass(MovieService).singleton(),

    jsonDb: awilix.asClass(JsonDb).singleton().inject(() => (dbConfig)),

    moviesRepository: awilix.asClass(MoviesRepository).singleton().inject(() => ({modelClass: Movie})),
    genresRepository: awilix.asClass(GenresRepository).singleton().inject(() => ({modelClass: Genre})),
    modelSchemas: awilix.asValue([Genre, Movie])
});

module.exports = container;

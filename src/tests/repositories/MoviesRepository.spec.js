const _ = require('lodash');
const path = require('path');
const {expect, use} = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const MoviesRepository = require('../../repositories/MoviesRepository');
const Movie = require('../../models/Movie');
const {JsonDb} = require('../../json-db');

use(chaiAsPromised);

describe('MoviesRepository', () => {
    let moviesRepository = null;
    const jsonDb = new JsonDb({dbFileSrc: path.join(__dirname, '../db.json'), modelSchemas: [Movie], isReadOnly: true});

    beforeEach(() => {
        moviesRepository = new MoviesRepository({jsonDb, modelClass: Movie});
    });

    it('should find some random movie', async () => {
        sinon.replace(moviesRepository, '_getRandomOffset', sinon.fake.returns(2));
        const movies = await moviesRepository.getRandom();
        sinon.restore();
        expect(movies).to.be.an('array').with.lengthOf(1);
        expect(movies[0]).to.be.an.instanceOf(Movie);
        return expect(movies[0].id).to.be.equal(3);
    });

    it('should find movies by duration', async () => {
        const movies = await moviesRepository.findByDuration({min: 120, max: 140});
        expect(movies).to.be.an('array').with.lengthOf(2);
        const ids = _(movies).map('id').sortBy().value();
        return expect(ids).to.be.eql([3, 5]);
    });

    it('should not find movies by duration', async () => {
        const movies = await moviesRepository.findByDuration({min: 5, max: 50});
        expect(movies).to.be.an('array').with.lengthOf(0);
    });

    it('should find movies by genres', async () => {
        const movies = await moviesRepository.findByGenres(['Crime', 'Drama', 'Music']);
        expect(movies).to.be.an('array').with.lengthOf(3);
        const ids = _(movies).map('id').value();
        return expect(ids).to.be.eql([3, 2, 5]);
    });

    it('should not find movies by genres', async () => {
        const movies = await moviesRepository.findByGenres(['Western', 'Horror', 'Action']);
        expect(movies).to.be.an('array').with.lengthOf(0);
    });

    it('should find movies by duration and genres', async () => {
        const movies = await moviesRepository.findByDurationAndGenres({min: 120, max: 130}, ['Crime', 'Drama', 'Music']);
        expect(movies).to.be.an('array').with.lengthOf(2);
        const ids = _(movies).map('id').value();
        return expect(ids).to.be.eql([3, 5]);
    });

    it('should get total count of movies', async () => {
        const count = await moviesRepository.getCount();
        expect(count).to.be.equal(5);
    });

    it('should create new movie', async () => {
        // eslint-disable-next-line
        const movie = await moviesRepository.create({title: 'spartakus', year: 1956, runtime: 198, genres: ['Drama', 'History'], director: 'unknown'});
        expect(movie).to.be.an.instanceOf(Movie);
        return expect(movie.id).to.be.equal(6);
    });
});

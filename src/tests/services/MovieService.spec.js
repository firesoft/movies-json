const {expect, use} = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const MovieService = require('../../services/MovieService');

use(chaiAsPromised);

describe('MovieService', () => {
    let movieService = null;
    let moviesRepository = null;
    beforeEach(() => {
        moviesRepository = {
            findByDurationAndGenres: sinon.stub().resolves([]),
            findByDuration: sinon.stub().resolves([]),
            findByGenres: sinon.stub().resolves([]),
            getRandom: sinon.stub().resolves([]),
            create: sinon.stub().resolves(null)
        };
        movieService = new MovieService({moviesRepository});
    });

    describe('getMovies', () => {
        it('should call moviesRepository.findByDurationAndGenres', async () => {
            await movieService.getMovies({duration: 20, genres: ['Fantasy', 'War']});
            return expect(moviesRepository.findByDurationAndGenres.calledOnceWith({min: 10, max: 30}, ['Fantasy', 'War'])).to.be.true;
        });
        it('should call moviesRepository.findByDuration', async () => {
            await movieService.getMovies({duration: 30, genres: []});
            return expect(moviesRepository.findByDuration.calledOnceWith({min: 20, max: 40})).to.be.true;
        });
        it('should call moviesRepository.findByGenres', async () => {
            await movieService.getMovies({duration: 0, genres: ['War']});
            return expect(moviesRepository.findByGenres.calledOnceWith(['War'])).to.be.true;
        });
        it('should call moviesRepository.getRandom', async () => {
            await movieService.getMovies({duration: 0, genres: []});
            return expect(moviesRepository.getRandom.calledOnce).to.be.true;
        });
    });
    describe('add', () => {
        it('should call moviesRepository.create', async () => {
            await movieService.addMovie({});
            return expect(moviesRepository.create.called).to.be.true;
        });
    });
});

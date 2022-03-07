const {expect, use} = require('chai');
const chaiAsPromised = require('chai-as-promised');
const MovieAddValidator = require('../../validators/MovieAddValidator');
const ValidationError = require('../../errors/ValidationError');

use(chaiAsPromised);

const movieBodyData = {
    title: 'sprartakus',
    year: 1965,
    runtime: 190,
    genres: ['Drama'],
    director: 'unknown'
};

const genresRepository = {
    isValid: (genre) => {
        return ['Drama', 'Sci-fi'].indexOf(genre) !== -1;
    }
};

const movieAddValidator = new MovieAddValidator({genresRepository});

describe('MovieAddValidator:validate', () => {
    it('should return validated movie data', async () => {
        const movieData = await movieAddValidator.validate(
            {
                body: movieBodyData
            }
        );
        return expect(movieData).to.be.an('object').that.is.eql({...movieBodyData, ...{plot: '', posterUrl: '', actors: ''}});
    });

    it('should throw error on incorrect movie data (title)', async () => {
        return expect(movieAddValidator.validate(
            {
                body: {
                    ...movieBodyData, ...{title: ''}
                }
            }
        )).to.eventually.be.rejectedWith(ValidationError).with.property('status', 400);
    });

    it('should throw error on incorrect movie data (year)', async () => {
        return expect(movieAddValidator.validate(
            {
                body: {
                    ...movieBodyData, ...{year: 'asdasd'}
                }
            }
        )).to.eventually.be.rejectedWith(ValidationError).with.property('status', 400);
    });

    it('should throw error on incorrect movie data (runtime)', async () => {
        return expect(movieAddValidator.validate(
            {
                body: {
                    ...movieBodyData, ...{runtime: []}
                }
            }
        )).to.eventually.be.rejectedWith(ValidationError).with.property('status', 400);
    });

    it('should throw error on incorrect movie data (genres)', async () => {
        return expect(movieAddValidator.validate(
            {
                body: {
                    ...movieBodyData, ...{genres: []}
                }
            }
        )).to.eventually.be.rejectedWith(ValidationError).with.property('status', 400);
    });

    it('should throw error on incorrect movie data (genres)', async () => {
        return expect(movieAddValidator.validate(
            {
                body: {
                    ...movieBodyData, ...{genres: ['asd']}
                }
            }
        )).to.eventually.be.rejectedWith(ValidationError).with.property('status', 400);
    });
});

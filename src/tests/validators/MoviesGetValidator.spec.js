const {expect, use} = require('chai');
const chaiAsPromised = require('chai-as-promised');
const MoviesGetValidator = require('../../validators/MoviesGetValidator');
const ValidationError = require('../../errors/ValidationError');

use(chaiAsPromised);

const moviesGetValidator = new MoviesGetValidator();

describe('MoviesGetValidator:validate', () => {
    it('should return validated default data', async () => {
        const validatedData = await moviesGetValidator.validate({query: {}});
        return expect(validatedData).to.be.an('object').that.is.eql({genres: [], duration: 0});
    });

    it('should return validated data on query with duaration', async () => {
        const validatedData = await moviesGetValidator.validate({query: {duration: 12}});
        return expect(validatedData).to.be.an('object').that.is.eql({genres: [], duration: 12});
    });

    it('should return validated data on query with genres', async () => {
        const validatedData = await moviesGetValidator.validate({query: {genres: ['Sci-fi']}});
        return expect(validatedData).to.be.an('object').that.is.eql({genres: ['Sci-fi'], duration: 0});
    });

    it('should return validated data on query with genres and duration', async () => {
        const validatedData = await moviesGetValidator.validate({query: {genres: ['Sci-fi', 'Drama'], duration: 15}});
        return expect(validatedData).to.be.an('object').that.is.eql({genres: ['Sci-fi', 'Drama'], duration: 15});
    });

    it('should throw error on incorrect duration', async () => {
        return expect(moviesGetValidator.validate({query: {duration: 'asd'}})).to.eventually.be.rejectedWith(ValidationError).with.property('status', 400);
    });

    it('should throw error on incorrect genres', async () => {
        return expect(moviesGetValidator.validate({query: {genres: 'asd'}})).to.eventually.be.rejectedWith(ValidationError).with.property('status', 400);
    });
});

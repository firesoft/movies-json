const path = require('path');
const {expect, use} = require('chai');
const chaiAsPromised = require('chai-as-promised');
const GenresRepository = require('../../repositories/GenresRepository');
const Genre = require('../../models/Genre');
const {JsonDb} = require('../../json-db');

use(chaiAsPromised);

describe('GenresRepository', () => {
    const jsonDb = new JsonDb({dbFileSrc: path.join(__dirname, '../db.json'), modelSchemas: [Genre], isReadOnly: true});
    const genresRepository = new GenresRepository({jsonDb, modelClass: Genre});

    it('should return all genres', async () => {
        const genres = await genresRepository.getAll();
        expect(genres).to.be.an('array').with.lengthOf(21);
        expect(genres[0]).to.be.an.instanceOf(Genre);
        return expect(genres[0].name).to.be.equal('Comedy');
    });

    it('should check if `Thriller` is valid (true)', async () => {
        const isValid = await genresRepository.isValid('Thriller');
        return expect(isValid).to.be.true;
    });

    it('should check if `Mordobicie` is valid (false)', async () => {
        const isValid = await genresRepository.isValid('Mordobicie');
        return expect(isValid).to.be.false;
    });
});

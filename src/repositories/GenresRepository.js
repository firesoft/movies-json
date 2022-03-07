const _ = require('lodash');
const BaseRepository = require('./BaseRepository');

class GenresRepository extends BaseRepository {
    async getAll() {
        return this.find(this.createQuery());
    }

    async isValid(genre) {
        const genres = await this.getAll();
        return _.find(genres, {name: genre}) !== undefined;
    }
}

module.exports = GenresRepository;

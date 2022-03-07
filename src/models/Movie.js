const _ = require('lodash');
const {JsonDbBaseModel} = require('../json-db');

class Movie extends JsonDbBaseModel {
    constructor(pureData) {
        super();
        this.id = pureData.id ? parseInt(pureData.id, 10) : 0;
        this.title = pureData.title;
        this.year = parseInt(pureData.year, 10);
        this.runtime = parseInt(pureData.runtime, 10);
        this.genres = pureData.genres;
        this.director = pureData.director;
        this.actors = pureData.actors;
        this.plot = pureData.plot;
        this.posterUrl = pureData.posterUrl;
    }

    static getAutoIncrementColumn() {
        return 'id';
    }

    getGenresMatchCount(genres) {
        return _.intersection(this.genres, genres).length;
    }

    isRuntimeInRange(runtimeRange) {
        return this.runtime >= runtimeRange.min && this.runtime <= runtimeRange.max;
    }
}

module.exports = Movie;

const _ = require('lodash');
const BaseRepository = require('./BaseRepository');

class MoviesRepository extends BaseRepository {
    async getRandom() {
        const count = await this.getCount();
        if (!count) {
            return [];
        }
        const offset = this._getRandomOffset(count);
        const query = this.createQuery().limit(offset, 1);
        return this.find(query);
    }

    async findByDuration(durationRange) {
        const query = this.createQuery().filter(this._getDurationFilter(durationRange));
        return this.find(query);
    }

    async findByGenres(genres) {
        const query = this.createQuery().filter(this._getGenresFilter(genres)).sort(this._getGenresCountSorter(genres), 'desc');
        return this.find(query);
    }

    async findByDurationAndGenres(durationRange, genres) {
        const query = this.createQuery().filter(this._getDurationFilter(durationRange)).filter(this._getGenresFilter(genres)).sort(this._getGenresCountSorter(genres), 'desc');
        return this.find(query);
    }

    _getDurationFilter(durationRange) {
        return movie => {
            return movie.isRuntimeInRange(durationRange);
        };
    }

    _getGenresFilter(genres) {
        return movie => {
            return movie.getGenresMatchCount(genres) > 0;
        };
    }

    _getGenresCountSorter(genres) {
        // return movie => movie.getGenresMatchCount(genres);
        return movie => {
            return movie.getGenresMatchCount(genres);
        };
    }

    _getRandomOffset(count) {
        return _.random(0, count - 1);
    }
}

module.exports = MoviesRepository;

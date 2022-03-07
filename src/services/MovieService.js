const DURATION_RADIUS = 10;

class MovieService {
    constructor({moviesRepository}) {
        this._moviesRepository = moviesRepository;
    }

    async getMovies(data) {
        if (data.duration && data.genres.length) {
            return this._moviesRepository.findByDurationAndGenres(this._prepareDurationRange(data.duration), data.genres);
        }
        if (data.duration) {
            return this._moviesRepository.findByDuration(this._prepareDurationRange(data.duration));
        }
        if (data.genres.length) {
            return this._moviesRepository.findByGenres(data.genres);
        }
        return this._moviesRepository.getRandom();
    }

    async addMovie(data) {
        return this._moviesRepository.create(data);
    }

    _prepareDurationRange(duration) {
        return {
            min: Math.max(0, duration - DURATION_RADIUS),
            max: duration + DURATION_RADIUS
        };
    }
}

module.exports = MovieService;

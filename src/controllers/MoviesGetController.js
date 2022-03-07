const BaseController = require('./BaseController');

class MoviesGetController extends BaseController {
    constructor(params) {
        super(params);
        this._validator = params.moviesGetValidator;
        this._movieService = params.movieService;
    }

    async _processRequest() {
        return this._movieService.getMovies(this._reqData);
    }
}

module.exports = MoviesGetController;

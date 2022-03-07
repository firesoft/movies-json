const BaseController = require('./BaseController');

class MovieAddController extends BaseController {
    constructor(params) {
        super(params);
        this._validator = params.movieAddValidator;
        this._movieService = params.movieService;
    }

    async _processRequest() {
        return this._movieService.addMovie(this._reqData);
    }
}

module.exports = MovieAddController;

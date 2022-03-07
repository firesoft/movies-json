const Joi = require('joi');
const BaseValidator = require('./BaseValidator');

class MovieAddValidator extends BaseValidator {
    constructor(params) {
        super(params);
        this._genresRepository = params.genresRepository;
    }

    _getReqSchema() {
        return {
            body: Joi.object({
                title: Joi.string().trim().min(1).max(255).required(),
                year: Joi.number().integer().positive().required(),
                runtime: Joi.number().integer().positive().required(),
                genres: Joi.array().unique().items(Joi.string().trim().external(this._validateGenre.bind(this)).required()).required(),
                director: Joi.string().trim().min(1).max(255).required(),
                actors: Joi.string().trim().min(1).default(''),
                plot: Joi.string().trim().min(1).default(''),
                posterUrl: Joi.string().trim().min(1).default('')
            })
        };
    }

    async _validateGenre(genre) {
        if (await this._genresRepository.isValid(genre)) {
            return undefined;
        }
        const message = '"genre" is not valid';
        throw new Joi.ValidationError(
            message,
            [{
                message,
                path: ['genres.genre'],
                type: 'genre.invalid',
                context: {
                    label: 'genre',
                    value: genre,
                    key: 'genres'
                }
            }],
            genre
        );
    }
}

module.exports = MovieAddValidator;

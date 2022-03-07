const Joi = require('joi');
const BaseValidator = require('./BaseValidator');

class MoviesGetValidator extends BaseValidator {
    _getReqSchema() {
        return {
            query: Joi.object({
                duration: Joi.number().integer().positive().default(0),
                genres: Joi.array().unique().items(Joi.string().trim().required()).default([])
            })
        };
    }
}

module.exports = MoviesGetValidator;

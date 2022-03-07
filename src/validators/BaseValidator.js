const _ = require('lodash');
const Joi = require('joi');
const ValidationError = require('../errors/ValidationError');

class BaseValidator {
    constructor() {
        this._options = this._prepareOptions();
        this._reqSchema = this._getReqSchema();
    }

    async validate(req) {
        try {
            if (!this._reqSchema) {
                return null;
            }
            const validationPromises = this._prepareValidationPromises(req);
            const promisesResult = await Promise.all(validationPromises);
            return this._prepareResults(promisesResult);
        } catch (err) {
            throw this._prepareError(err);
        }
    }

    _getReqSchema() {
        return null;
    }

    _prepareOptions() {
        return {
            ...{
                allowUnknown: true,
                abortEarly: true,
                flattenResults: true
            },
            ...this._getOptions()
        };
    }

    _getOptions() {
        return {};
    }

    _prepareValidationPromises(req) {
        return _.map(this._reqSchema, (schema, reqKey) => {
            return schema.validateAsync(req[reqKey], this._options);
        });
    }

    _prepareResults(promiseResults) {
        return Object.keys(this._reqSchema).reduce((values, reqKey, index) => {
            if (this._options.flattenResults) {
                values = {...values, ...promiseResults[index]};
            } else {
                values[reqKey] = promiseResults[index];
            }
            return values;
        }, {});
    }

    _prepareError(err) {
        if (err instanceof Joi.ValidationError) {
            return new ValidationError(err);
        }
        return err;
    }
}

module.exports = BaseValidator;

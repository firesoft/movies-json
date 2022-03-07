const logger = require('../libs/logger');
const MiddlewareBase = require('./MiddlewareBase');

class ErrorMiddleware extends MiddlewareBase {
    getHandler() {
        return (err, req, res, next) => {
            if (!err) {
                return next();
            }
            const status = this._getErrorStatus(err);
            let message = this._getErrorMessage(err);

            if (status === 500) {
                message = 'Internal server error.';
            }

            const responseData = {
                message
            };

            if (status !== 500 && err.errors) {
                responseData.errors = err.errors;
            }
            // todo: parse error using helper, get stack, env etc
            logger.error(err.message, err);
            return res.status(status).json(responseData);
        };
    }

    _getErrorStatus(err) {
        return err.status || 500;
    }

    _getErrorMessage(err) {
        return err.msg || err.message || 'Internal server error.';
    }
}

module.exports = ErrorMiddleware;

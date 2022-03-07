const MiddlewareBase = require('./MiddlewareBase');

class CorsHeadersMiddleware extends MiddlewareBase {
    getHandler() {
        return (req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', '*');
            res.header('Access-Control-Allow-Headers', '*');
            next();
        };
    }
}

module.exports = CorsHeadersMiddleware;

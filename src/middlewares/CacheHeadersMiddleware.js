const MiddlewareBase = require('./MiddlewareBase');

class CacheHeadersMiddleware extends MiddlewareBase {
    getHandler() {
        return (req, res, next) => {
            res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
            res.header('Pragma', 'no-cache');
            res.header('Expires', 0);
            next();
        };
    }
}

module.exports = CacheHeadersMiddleware;

const MiddlewareBase = require('./MiddlewareBase');

class FourOhFourMiddleware extends MiddlewareBase {
    getHandler() {
        return (req, res) => {
            res.status(404).json({message: '404 Not Found'});
        };
    }
}

module.exports = FourOhFourMiddleware;

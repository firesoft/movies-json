const express = require('express');
const http = require('http');
const morgan = require('morgan');
const config = require('config');

const logger = require('./logger');
const terminus = require('./terminus');
const CacheHeadersMiddleware = require('../middlewares/CacheHeadersMiddleware');
const CorsHeadersMiddleware = require('../middlewares/CorsHeadersMiddleware');
const FourOhFourMiddleware = require('../middlewares/FourOhFourMiddleware');
const ErrorMiddleware = require('../middlewares/ErrorMiddleware');

const routes = require('../routes');

class Application {
    constructor() {
        this._express = express();
        this._server = http.createServer(this._express);
    }

    run() {
        this._initTerminus();
        this._initExpressMiddlewares();
        this._startListening();

        return this._express;
    }

    _initTerminus() {
        terminus.init(this._server);
    }

    _initExpressMiddlewares() {
        this._initMorgan();
        this._initBodyParser();
        this._initCacheHeaders();
        this._initCorsHeaders();

        this._initRoutes();

        this._init404Handler();
        this._initErrorHandler();
    }

    _initMorgan() {
        if (config.get('log.accessLog')) {
            this._express.use(morgan('short'));
        }
    }

    _initBodyParser() {
        this._express.use(express.json({
            limit: config.get('body.sizeLimit')
        }));
    }

    _initCacheHeaders() {
        this._express.use(CacheHeadersMiddleware.create());
    }

    _initCorsHeaders() {
        this._express.use(CorsHeadersMiddleware.create());
    }

    _initRoutes() {
        this._express.use(routes);
    }

    _init404Handler() {
        this._express.use(FourOhFourMiddleware.create());
    }

    _initErrorHandler() {
        this._express.use(ErrorMiddleware.create());
    }

    _startListening() {
        this._express.disable('x-powered-by');

        this._server.listen(config.get('server.port'), config.get('server.ip'), () => {
            logger.info(`${config.get('service.name')}  listening on ${config.get('server.ip')}: ${config.get('server.port')}`);
        });
    }
}

module.exports = Application;

const {createTerminus} = require('@godaddy/terminus');
const logger = require('./logger');

function onSignal() {
    logger.info('Server is starting cleanup.');
    Promise.resolve();
}

function onShutdown() {
    logger.info('Cleanup finished, server is shutting down.');
}

function healthCheck() {
    return Promise.resolve();
}

const options = {
    healthChecks: {
        '/healthcheck': healthCheck
    },
    signals: ['SIGINT', 'SIGBREAK', 'SIGTERM'],
    onSignal,
    onShutdown
};

function init(server) {
    return createTerminus(server, options);
}

module.exports.init = init;

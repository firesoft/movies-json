const logger = require('./libs/logger');
const Application = require('./libs/Application');

function errorhandler(err) {
    logger.error(err);
    setTimeout(() => {
        process.exit(1);
    }, 1000);
}

process.on('uncaughtException', errorhandler);
process.on('unhandledRejection', errorhandler);

const app = new Application();
app.run();

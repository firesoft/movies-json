const config = require('config');
const winston = require('winston');

const logger = winston.createLogger({
    level: config.get('log.level'),
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({
            format: winston.format.simple()
        })
    ]
});

module.exports = logger;

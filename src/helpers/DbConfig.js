const config = require('config');
const path = require('path');

class DbConfig {
    static get() {
        const dbConfig = config.get('database');
        let dbFileSrc = dbConfig.src;
        if (dbFileSrc[0] === '.') {
            dbFileSrc = path.join(__dirname, '../../', dbFileSrc);
        }

        return {
            dbFileSrc,
            isReadOnly: dbConfig.readonly
        };
    }
}

module.exports = DbConfig;

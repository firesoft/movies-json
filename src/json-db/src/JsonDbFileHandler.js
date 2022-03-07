const fs = require('fs/promises');
const JsonDbError = require('./JsonDbError');

class JsonDbFileHandler {
    constructor({dbFileSrc, _fs = fs}) {
        this._dbFileSrc = dbFileSrc;
        this._fs = _fs;
    }

    async load() {
        try {
            const jsonContents = await this._readFile();
            return JSON.parse(jsonContents);
        } catch (err) {
            throw new JsonDbError('Cannot load db file.', 'DB_FILE_LOAD_ERROR');
        }
    }

    async save(data) {
        try {
            const jsonContents = JSON.stringify(data, null, 2);
            await this._writeFile(jsonContents);
        } catch (err) {
            throw new JsonDbError('Cannot save file.', 'DB_FILE_SAVE_ERROR');
        }
    }

    async _readFile() {
        return this._fs.readFile(this._dbFileSrc, 'utf8');
    }

    async _writeFile(jsonContents) {
        return this._fs.writeFile(this._dbFileSrc, jsonContents, 'utf8');
    }
}

module.exports = JsonDbFileHandler;

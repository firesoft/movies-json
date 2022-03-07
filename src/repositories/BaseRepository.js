const {JsonDbQuery} = require('../json-db');

class BaseRepository {
    constructor({jsonDb, modelClass}) {
        this._jsonDb = jsonDb;
        this._modelClass = modelClass;
    }

    async find(query) {
        return this._jsonDb.query(query);
    }

    async getCount() {
        const query = this.createQuery().count();
        return this._jsonDb.query(query);
    }

    async create(data) {
        let modelObject = new this._modelClass(data);
        modelObject = this._jsonDb.add(this._modelClass.getTableName(), modelObject);
        return modelObject;
    }

    createQuery() {
        return (new JsonDbQuery(this._modelClass.getTableName()));
    }
}

module.exports = BaseRepository;

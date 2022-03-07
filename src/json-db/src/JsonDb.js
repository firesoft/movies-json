const _ = require('lodash');
const JsonDbError = require('./JsonDbError');
const JsonDbFileHandler = require('./JsonDbFileHandler');
const JsonDbTablesInitializer = require('./JsonDbTablesInitializer');

class JsonDb {
    constructor({dbFileSrc, modelSchemas, isReadOnly = false}) {
        this._fileHandler = new JsonDbFileHandler({dbFileSrc});
        this._tablesInitializer = new JsonDbTablesInitializer({modelSchemas});
        this._isReadOnly = isReadOnly;

        this._inited = false;
        this._tables = {};
    }

    async _initialize() {
        if (this._inited) {
            return;
        }
        const pureData = await this._fileHandler.load();
        this._initTables(pureData);
        this._inited = true;
    }

    async query(jsonDbQuery) {
        await this._initialize();
        const table = this._getTable(jsonDbQuery.getTableName());
        return table.query(jsonDbQuery);
    }

    async add(tableName, modelObject) {
        await this._initialize();
        const table = this._getTable(tableName);
        modelObject = table.add(modelObject);
        await this._save();
        return modelObject;
    }

    async _save() {
        if (this._isReadOnly) {
            return;
        }
        await this._fileHandler.save(this._getPureDataFromTables());
    }

    _getClonedTableRows(tableName) {
        return _.cloneDeep(this._tables[tableName]);
    }

    _getTable(tableName) {
        if (!this._isTableExists(tableName)) {
            throw new JsonDbError(`Unknown table name: ${tableName}.`, 'TABLE_UNKNOWN_ERROR');
        }
        return this._tables[tableName];
    }

    _isTableExists(tableName) {
        return Object.prototype.hasOwnProperty.call(this._tables, tableName);
    }

    _initTables(pureData) {
        this._tables = this._tablesInitializer.getTables(pureData);
    }

    _getPureDataFromTables() {
        return _.reduce(this._tables, (pureData, table, tableName) => {
            pureData[tableName] = table.getRows();
            return pureData;
        }, {});
    }
}

module.exports = JsonDb;

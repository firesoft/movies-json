const _ = require('lodash');
const JsonDbError = require('./JsonDbError');
const JsonDbTable = require('./JsonDbTable');

class JsonDbTablesInitializer {
    constructor({modelSchemas}) {
        this._modelSchemas = modelSchemas;
    }

    getTables(rawDbData) {
        this._checkData(rawDbData);
        return {...this._getTablesAsEmpty(), ...this._getTablesFromRawData(rawDbData)};
    }

    _checkData(rawDbData) {
        if (!_.isPlainObject(rawDbData)) {
            throw new JsonDbError('Incorrect database structure.', 'INCORRECT_DATABASE_STRUCTURE_ERROR');
        }
        _.forEach(rawDbData, (rows, tableName) => {
            if (!_.isArray(rows)) {
                throw new JsonDbError(`Incorrect table structure: ${tableName}.`, 'INCORRECT_TABLE_STRUCTURE_ERROR');
            }
        });
    }

    _getTablesAsEmpty() {
        return _.reduce(this._modelSchemas, (tables, modelSchema) => {
            const tableName = modelSchema.getTableName();
            tables[tableName] = this._createTable(tableName, modelSchema, []);
            return tables;
        }, {});
    }

    _getTablesFromRawData(rawDbData) {
        return _.reduce(rawDbData, (tables, rows, tableName) => {
            const modelSchema = this._getModelSchemaByTableName(tableName);
            if (modelSchema) {
                tables[tableName] = this._createTable(tableName, modelSchema, modelSchema.create(rows));
            } else {
                tables[tableName] = this._createTable(tableName, null, rows);
            }
            return tables;
        }, {});
    }

    _createTable(tableName, modelSchema, rows) {
        return new JsonDbTable(tableName, modelSchema, rows);
    }

    _getModelSchemaByTableName(schemaName) {
        return _.find(this._modelSchemas, modelSchema => modelSchema.getTableName() === schemaName);
    }
}

module.exports = JsonDbTablesInitializer;

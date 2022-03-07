const _ = require('lodash');
const JsonDbQueryExecutor = require('./JsonDbQueryExecutor');

class JsonDbTable {
    constructor(tableName, schema = null, rows = []) {
        this._tableName = tableName;
        this._schema = schema;
        this._rows = rows;

        this._autoIncrement = this._calculateAutoIncrement();
    }

    add(row) {
        const autoIncrementColumn = this._getAutoIncrementColumn();
        if (autoIncrementColumn) {
            row[autoIncrementColumn] = this._getNextAutoIncrement();
        }
        this._rows.push(this._cloneRow(row));
        return row;
    }

    query(jsonDbQuery) {
        const rows = JsonDbQueryExecutor.execute(this._rows, jsonDbQuery);
        return this._cloneRows(rows);
    }

    getRows() {
        return this._cloneRows(this._rows);
    }

    _getAutoIncrementColumn() {
        if (!this._schema) {
            return '';
        }
        return this._schema.getAutoIncrementColumn();
    }

    _getNextAutoIncrement() {
        this._autoIncrement += 1;
        return this._autoIncrement;
    }

    _calculateAutoIncrement() {
        const column = this._getAutoIncrementColumn();
        if (!column) {
            return 0;
        }
        const maxIdRow = _.maxBy(this._rows, column);
        return maxIdRow ? maxIdRow[column] : 0;
    }

    _cloneRows(rows) {
        return _.cloneDeep(rows);
    }

    _cloneRow(row) {
        return _.cloneDeep(row);
    }
}

module.exports = JsonDbTable;

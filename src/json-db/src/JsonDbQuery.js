const JsonDbError = require('./JsonDbError');

class JsonDbQuery {
    constructor(tableName) {
        this._tableName = tableName;
        this._filters = [];
        this._count = false;
        this._limit = null;
        this._sorter = null;
    }

    getTableName() {
        return this._tableName;
    }

    getFilters() {
        return this._filters;
    }

    filter(filter) {
        this._filters.push(filter);
        return this;
    }

    getSorter() {
        return this._sorter;
    }

    sort(sorter, order = 'asc') {
        if (!this._isOrderValid(order)) {
            throw new JsonDbError('Invalid order param.', 'INCORRECT_ORDER_PARAM_ERROR');
        }
        this._sorter = {sorter, order};
        return this;
    }

    getCount() {
        return this._count;
    }

    count(count = true) {
        this._count = count;
        return this;
    }

    getLimit() {
        return this._limit;
    }

    limit(offset, count) {
        if (offset < 0 || count <= 0) {
            throw new JsonDbError('Incorrect limit values.', 'INCORRECT_LIMIT_PARAM_ERROR');
        }
        this._limit = {offset, count};
        return this;
    }

    _isOrderValid(order) {
        return ['asc', 'desc'].indexOf(order) !== -1;
    }
}

module.exports = JsonDbQuery;

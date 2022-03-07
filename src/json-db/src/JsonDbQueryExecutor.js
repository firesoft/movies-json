const _ = require('lodash');

class JsonDbQueryExecutor {
    static execute(data, jsonDbQuery) {
        if (jsonDbQuery.getFilters().length) {
            data = _.reduce(jsonDbQuery.getFilters(), (filteredData, filter) => {
                return _.filter(filteredData, filter);
            }, data);
        }
        if (jsonDbQuery.getCount()) {
            return data.length;
        }
        if (jsonDbQuery.getSorter()) {
            const sorter = jsonDbQuery.getSorter();
            data = _.orderBy(data, sorter.sorter, sorter.order);
        }
        if (jsonDbQuery.getLimit()) {
            const limit = jsonDbQuery.getLimit();
            data = _.slice(data, limit.offset, limit.offset + limit.count);
        }

        return data;
    }
}

module.exports = JsonDbQueryExecutor;

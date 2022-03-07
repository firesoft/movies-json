const _ = require('lodash');

class JsonDbBaseModel {
    static create(data) {
        if (_.isArray(data)) {
            return _.map(data, singleData => {
                return this.create(singleData);
            });
        }
        return new this(data);
    }

    static getAutoIncrementColumn() {
        return '';
    }

    static getTableName() {
        return `${this.name.toLowerCase()}s`;
    }
}

module.exports = JsonDbBaseModel;

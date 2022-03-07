const {JsonDbBaseModel} = require('../json-db');

class Genre extends JsonDbBaseModel {
    constructor(pureData) {
        super();
        this.name = pureData;
    }

    toJSON() {
        return this.name;
    }
}

module.exports = Genre;

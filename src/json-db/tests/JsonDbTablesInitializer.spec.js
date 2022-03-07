/* eslint-disable max-classes-per-file */

const {expect} = require('chai');
const JsonDbBaseModel = require('../src/JsonDbBaseModel');
const JsonDbTablesInitializer = require('../src/JsonDbTablesInitializer');
const JsonDbError = require('../src/JsonDbError');
const JsonDbTable = require('../src/JsonDbTable');

class Movie extends JsonDbBaseModel {
    constructor(row) {
        super();
        this.id = row.id;
        this.name = row.name;
    }

    static getAutoIncrementColumn() {
        return 'id';
    }
}

class Genre extends JsonDbBaseModel {
    constructor(row) {
        super();
        this.name = row;
    }

    static getAutoIncrementColumn() {
        return 'id';
    }
}

const DB = {
    movies: [
        {id: 1, name: 'sara'},
        {id: 2, name: 'pluton'}
    ],
    authors: [
        {id: 345, author: 'spielberg'}
    ]
};

const NOT_VALID_DB1 = [{id: 1, name: 'sara'}];
const NOT_VALID_DB2 = {movies: {id: 1, name: 'sara'}};

const jsonDbTablesInitializer = new JsonDbTablesInitializer({modelSchemas: [Movie, Genre]});

describe('JsonDbTablesInitializer', () => {
    it('it should throw error on invalid database data', () => {
        expect(() => jsonDbTablesInitializer.getTables(NOT_VALID_DB1)).to.throw(JsonDbError).with.property('code', 'INCORRECT_DATABASE_STRUCTURE_ERROR');
    });
});

describe('JsonDbTablesInitializer', () => {
    it('it should throw error on invalid table data', () => {
        expect(() => jsonDbTablesInitializer.getTables(NOT_VALID_DB2)).to.throw(JsonDbError).with.property('code', 'INCORRECT_TABLE_STRUCTURE_ERROR');
    });
});

describe('JsonDbTablesInitializer', () => {
    it('it should init db data', () => {
        const dbData = jsonDbTablesInitializer.getTables(DB);
        expect(dbData).to.be.an('object').that.has.all.keys('movies', 'authors', 'genres');
        expect(dbData.movies).to.be.an('object').that.is.an.instanceOf(JsonDbTable);
        expect(dbData.authors).to.be.an('object').that.is.an.instanceOf(JsonDbTable);
        expect(dbData.genres).to.be.an('object').that.is.an.instanceOf(JsonDbTable);
    });
});

/* eslint-disable max-classes-per-file */

const {expect, use} = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

const JsonDbBaseModel = require('../src/JsonDbBaseModel');
const JsonDbQuery = require('../src/JsonDbQuery');
const JsonDb = require('../src/JsonDb');
const JsonDbError = require('../src/JsonDbError');

use(chaiAsPromised);

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

const jsonDb = new JsonDb({dbFileSrc: 'fake_file_src', modelSchemas: [Movie, Genre]});

// eslint-disable-next-line no-underscore-dangle
jsonDb._fileHandler = {
    load: sinon.stub().resolves(DB),
    save: sinon.stub().resolves(undefined)
};

describe('JsonDb', () => {
    it('should query movies table (count)', async () => {
        const jsonDbQuery = new JsonDbQuery('movies').count();
        return expect(jsonDb.query(jsonDbQuery)).to.eventually.be.equal(2);
    });
    it('should query movies table (filter)', async () => {
        const jsonDbQuery = new JsonDbQuery('movies').filter({name: 'pluton'});
        const rows = await jsonDb.query(jsonDbQuery);
        expect(rows).to.be.an('array').that.have.lengthOf(1);
        expect(rows[0]).to.be.an('object').that.is.an.instanceOf(Movie).to.eql({id: 2, name: 'pluton'});
    });
    it('should throw an error on unknown table', async () => {
        const jsonDbQuery = new JsonDbQuery('movies3').filter({name: 'pluton'});
        return expect(jsonDb.query(jsonDbQuery)).to.eventually.be.rejectedWith(JsonDbError).with.property('code', 'TABLE_UNKNOWN_ERROR');
    });
    it('should add new row to table', async () => {
        const movie = await jsonDb.add('movies', new Movie({name: 'red dawn'}));
        expect(movie).to.be.an('object').that.is.an.instanceOf(Movie).to.eql({id: 3, name: 'red dawn'});
    });
});

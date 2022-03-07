const {expect} = require('chai');
const JsonDbTable = require('../src/JsonDbTable');
const JsonDbQuery = require('../src/JsonDbQuery');
const JsonDbBaseModel = require('../src/JsonDbBaseModel');

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

const ROWS = [{id: 1, name: 'sara'}, {id: 2, name: 'pluton'}];

describe('JsonDbTable', () => {
    it('should create instance of JsonDbTable with valid collection', () => {
        const movies = Movie.create(ROWS);
        const jsonDbTable = new JsonDbTable('movies', Movie, movies);
        expect(jsonDbTable.getRows()).to.be.an('array').with.lengthOf(2).to.be.eql(movies);
    });

    it('should add new movie to table and update autoincrement value', () => {
        const movies = Movie.create(ROWS);
        const jsonDbTable = new JsonDbTable('movies', Movie, movies);
        const newMovie = Movie.create({id: 0, name: 'stalker'});
        const movie = jsonDbTable.add(newMovie);
        expect(movie).to.be.an.instanceof(Movie);
        expect(movie.id).to.be.equal(3);
    });

    it('should execute query and return result', () => {
        const movies = Movie.create(ROWS);
        const jsonDbTable = new JsonDbTable('movies', Movie, movies);
        const jsonDbQuery = new JsonDbQuery('movies').filter({id: 2});
        const resultCollection = jsonDbTable.query(jsonDbQuery);
        expect(resultCollection).to.be.an('array').with.lengthOf(1).to.be.eql([movies[1]]);
    });
});

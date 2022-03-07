const {expect} = require('chai');
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

describe('JsonDbBaseModel', () => {
    it('should create instance of Movie', () => {
        const movie = Movie.create(ROWS[0]);
        expect(movie).to.be.an.instanceof(Movie);
        expect(movie.id).to.equal(1);
        expect(movie.name).to.equal('sara');
    });

    it('should create collection of Movies', () => {
        const movies = Movie.create(ROWS);
        expect(movies).to.be.an('array').that.have.lengthOf(2);
        expect(movies[0]).to.be.an.instanceof(Movie);
        expect(movies[1]).to.be.an.instanceof(Movie);
        expect(movies[0].id).to.equal(1);
        expect(movies[0].name).to.equal('sara');
        expect(movies[1].id).to.equal(2);
        expect(movies[1].name).to.equal('pluton');
    });

    it('should return autoincrement column', () => {
        expect(Movie.getAutoIncrementColumn()).to.equal('id');
    });

    it('should return valid tablename', () => {
        expect(Movie.getTableName()).to.equal('movies');
    });
});

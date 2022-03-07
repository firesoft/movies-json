const {expect} = require('chai');
const JsonDbQuery = require('../src/JsonDbQuery');
const JsonDbQueryExecutor = require('../src/JsonDbQueryExecutor');

const DATA = [{id: 3, name: 'kacper'}, {id: 1, name: 'ala'}, {id: 2, name: 'piotr'}, {id: 5, name: 'kacper'}];

describe('JsonDbQueryExecutor', () => {
    it('should return length of DATA', () => {
        const jsonDbQuery = new JsonDbQuery('table1').count();
        expect(JsonDbQueryExecutor.execute(DATA, jsonDbQuery)).to.equal(4);
    });

    it('should filter DATA', () => {
        const jsonDbQuery = new JsonDbQuery('table1').filter({name: 'kacper'});
        expect(JsonDbQueryExecutor.execute(DATA, jsonDbQuery)).to.be.an('array').that.have.lengthOf(2);
    });

    it('should sort and filter DATA', () => {
        const jsonDbQuery = new JsonDbQuery('table1').filter({name: 'kacper'}).sort('id', 'desc');
        expect(JsonDbQueryExecutor.execute(DATA, jsonDbQuery)).to.be.an('array').that.have.lengthOf(2).to.eql([{id: 5, name: 'kacper'}, {id: 3, name: 'kacper'}]);
    });

    it('should sort, filter and limit DATA', () => {
        const jsonDbQuery = new JsonDbQuery('table1').filter({name: 'kacper'}).sort('id', 'desc').limit(1, 1);
        expect(JsonDbQueryExecutor.execute(DATA, jsonDbQuery)).to.be.an('array').that.have.lengthOf(1).to.eql([{id: 3, name: 'kacper'}]);
    });
});

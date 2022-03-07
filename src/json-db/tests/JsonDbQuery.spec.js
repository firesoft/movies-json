const {expect} = require('chai');
const JsonDbQuery = require('../src/JsonDbQuery');
const JsonDbError = require('../src/JsonDbError');

describe('JsonDbQuery', () => {
    it('should create instance of JsonDbQuery with valid table name', () => {
        const jsonDbQuery = new JsonDbQuery('table1');
        expect(jsonDbQuery.getTableName()).to.equal('table1');
    });

    it('should add 2 filter functions', () => {
        const jsonDbQuery = new JsonDbQuery('table1');
        const func1 = () => {};
        const func2 = () => {};
        jsonDbQuery.filter(func1).filter(func2);
        expect(jsonDbQuery.getFilters()).to.be.an('array').that.have.lengthOf(2).to.have.members([func1, func2]);
    });

    it('should add sorter', () => {
        const jsonDbQuery = new JsonDbQuery('table1');
        const func1 = () => {};
        const order1 = 'asc';
        jsonDbQuery.sort(func1, order1);
        expect(jsonDbQuery.getSorter()).to.be.an('object').that.has.all.keys('sorter', 'order').to.eql({sorter: func1, order: order1});
    });

    it('should replace sorter on double sort call', () => {
        const jsonDbQuery = new JsonDbQuery('table1');
        const func1 = () => {};
        const func2 = () => {};
        const order1 = 'asc';
        const order2 = 'desc';
        jsonDbQuery.sort(func1, order1);
        jsonDbQuery.sort(func2, order2);
        expect(jsonDbQuery.getSorter()).to.be.an('object').that.has.all.keys('sorter', 'order').to.eql({sorter: func2, order: order2});
    });

    it('should throw JsonDbError error on invalid order', () => {
        const jsonDbQuery = new JsonDbQuery('table1');
        const func1 = () => {};
        const order1 = 'asc1';
        expect(() => jsonDbQuery.sort(func1, order1)).to.throw(JsonDbError).with.property('code', 'INCORRECT_ORDER_PARAM_ERROR');
    });

    it('should add limit', () => {
        const jsonDbQuery = new JsonDbQuery('table1');
        const offset = 5;
        const count = 10;
        jsonDbQuery.limit(offset, count);
        expect(jsonDbQuery.getLimit()).to.be.an('object').that.has.all.keys('offset', 'count').to.eql({offset, count});
    });

    it('should throw JsonDbError error on offset or count', () => {
        const jsonDbQuery = new JsonDbQuery('table1');
        expect(() => jsonDbQuery.limit(-2, -1)).to.throw(JsonDbError).with.property('code', 'INCORRECT_LIMIT_PARAM_ERROR');
        expect(() => jsonDbQuery.limit(0, -1)).to.throw(JsonDbError).with.property('code', 'INCORRECT_LIMIT_PARAM_ERROR');
        expect(() => jsonDbQuery.limit(-2, 1)).to.throw(JsonDbError).with.property('code', 'INCORRECT_LIMIT_PARAM_ERROR');
        expect(() => jsonDbQuery.limit(3, 0)).to.throw(JsonDbError).with.property('code', 'INCORRECT_LIMIT_PARAM_ERROR');
    });

    it('should set tablename, count and filter ', () => {
        const func1 = () => {};
        const jsonDbQuery = (new JsonDbQuery('table1')).count().filter(func1);
        expect(jsonDbQuery.getTableName()).to.equal('table1');
        expect(jsonDbQuery.getFilters()).to.be.an('array').that.have.lengthOf(1).to.have.members([func1]);
        expect(jsonDbQuery.getCount()).to.equal(true);
    });
});

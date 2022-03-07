const {expect, use} = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const JsonDbFileHandler = require('../src/JsonDbFileHandler');
const JsonDbError = require('../src/JsonDbError');

use(chaiAsPromised);

const FILE_SRC = 'fake_file';

const FILE_CONTENTS = '{"movies":[{"id": 1, "name": "sara"},{"id": 2, "name": "pluton"}]}';
const FILE_CONTENTS_INVALID = '{asd';
const DATA_TO_SAVE = 'test_data';

const fakeFs = {
    readFile: sinon.stub().resolves(FILE_CONTENTS),
    writeFile: sinon.stub().resolves()
};

const fakeFsErrorJson = {
    readFile: sinon.stub().resolves(FILE_CONTENTS_INVALID)
};

const fakeFsError = {
    readFile: sinon.stub().rejects(new Error('load error')),
    writeFile: sinon.stub().rejects(new Error('save error'))
};

describe('JsonDbFileHandler', () => {
    it('should load from json db file', async () => {
        const jsonDbFileHandler = new JsonDbFileHandler({dbFileSrc: FILE_SRC, _fs: fakeFs});
        const jsonContents = await jsonDbFileHandler.load();
        return expect(jsonContents).to.be.an('object').to.eql({movies: [{id: 1, name: 'sara'}, {id: 2, name: 'pluton'}]});
    });

    it('should save to json db file', async () => {
        const jsonDbFileHandler = new JsonDbFileHandler({dbFileSrc: FILE_SRC, _fs: fakeFs});
        await jsonDbFileHandler.save(DATA_TO_SAVE);
        return expect(fakeFs.writeFile.calledWith(FILE_SRC, `"${DATA_TO_SAVE}"`)).to.be.true;
    });

    it('should throw JsonDbError on invalid json db file load', async () => {
        const jsonDbFileHandler = new JsonDbFileHandler({dbFileSrc: FILE_SRC, _fs: fakeFsErrorJson});
        return expect(jsonDbFileHandler.load()).to.eventually.be.rejectedWith(JsonDbError).with.property('code', 'DB_FILE_LOAD_ERROR');
    });

    it('should throw JsonDbError on json db file load error', async () => {
        const jsonDbFileHandler = new JsonDbFileHandler({dbFileSrc: FILE_SRC, _fs: fakeFsError});
        return expect(jsonDbFileHandler.load()).to.eventually.be.rejectedWith(JsonDbError).with.property('code', 'DB_FILE_LOAD_ERROR');
    });

    it('should throw JsonDbError on json db file write error', async () => {
        const jsonDbFileHandler = new JsonDbFileHandler({dbFileSrc: FILE_SRC, _fs: fakeFsError});
        return expect(jsonDbFileHandler.save(DATA_TO_SAVE)).to.eventually.be.rejectedWith(JsonDbError).with.property('code', 'DB_FILE_SAVE_ERROR');
    });
});

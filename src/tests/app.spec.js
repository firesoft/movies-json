const _ = require('lodash');
const request = require('supertest');
const {expect} = require('chai');
const Application = require('../libs/Application');

const app = (new Application()).run();

const movieBodyData = {
    title: 'sprartakus',
    year: 1965,
    runtime: 190,
    genres: ['Drama'],
    director: 'unknown'
};

describe('API tests', () => {
    describe('GET /movies', () => {
        it('should return 1 movie', async () => {
            const response = await request(app).get('/movies');
            expect(response.status).to.be.equal(200);
            expect(response.headers['content-type']).to.match(/json/);
            expect(response.body).to.be.an('array').and.to.have.lengthOf(1);
            return expect(response.body[0]).to.be.an('object').and.to.have.all.keys('id', 'title', 'year', 'runtime', 'genres', 'director', 'actors', 'plot', 'posterUrl');
        });

        it('should return movies with duration <110, 130>', async () => {
            const response = await request(app).get('/movies?duration=120');
            expect(response.status).to.be.equal(200);
            expect(response.headers['content-type']).to.match(/json/);
            expect(response.body).to.be.an('array').and.to.have.lengthOf(2);
            return expect(_.find(response.body, movie => movie.runtime < 110 && movie.runtime > 130)).to.be.undefined;
        });

        it('should return movies with genres Crime, Drama, Music', async () => {
            const response = await request(app).get('/movies?genres[]=Crime&genres[]=Drama&genres[]=Music');
            expect(response.status).to.be.equal(200);
            expect(response.headers['content-type']).to.match(/json/);
            expect(response.body).to.be.an('array').and.to.have.lengthOf(3);
            expect(response.body[0].id).to.be.equal(3);
            expect(response.body[1].id).to.be.equal(2);
            expect(response.body[2].id).to.be.equal(5);
        });

        it('should return movies with genres Crime, Drama, Music and duration <110, 130>', async () => {
            const response = await request(app).get('/movies?genres[]=Crime&genres[]=Drama&genres[]=Music&duration=120');
            expect(response.status).to.be.equal(200);
            expect(response.headers['content-type']).to.match(/json/);
            expect(response.body).to.be.an('array').and.to.have.lengthOf(2);
            expect(response.body[0].id).to.be.equal(3);
            expect(response.body[1].id).to.be.equal(5);
        });

        it('should return error on incorrect duration', async () => {
            const response = await request(app).get('/movies?duration=asd');
            expect(response.status).to.be.equal(400);
            expect(response.headers['content-type']).to.match(/json/);
            expect(response.body).to.be.an('object').that.has.property('message');
            return expect(response.body.message).to.match(/duration/);
        });

        it('should return error on incorrect genres type', async () => {
            const response = await request(app).get('/movies?genres=asd');
            expect(response.status).to.be.equal(400);
            expect(response.headers['content-type']).to.match(/json/);
            expect(response.body).to.be.an('object').that.has.property('message');
            return expect(response.body.message).to.match(/genres/);
        });
    });

    describe('POST /api/movies', () => {
        it('should add movie', async () => {
            const response = await request(app).post('/movies').send(movieBodyData);
            expect(response.status).to.be.equal(200);
            expect(response.headers['content-type']).to.match(/json/);
            // eslint-disable-next-line object-curly-newline
            return expect(response.body).to.be.an('object').that.is.eql({...movieBodyData, ...{id: 6, plot: '', posterUrl: '', actors: ''}});
        });

        it('should return error on missing movie title', async () => {
            const response = await request(app).post('/movies').send(_.omit(movieBodyData, ['title']));
            expect(response.status).to.be.equal(400);
            expect(response.headers['content-type']).to.match(/json/);
            expect(response.body).to.be.an('object').that.has.property('message');
            return expect(response.body.message).to.match(/title/);
        });
    });
});

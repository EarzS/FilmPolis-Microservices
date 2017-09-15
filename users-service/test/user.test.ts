import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import api from '../service/api/Api';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET API index', () => {
    it('should be json', () => {
        return chai.request(api).get('/')
            .then(res => {
                expect(res.type).to.eql('application/json');
            });
    });

    it('should have a welcome message', () => {
        return chai.request(api).get('/')
            .then(res => {
                expect(res.body.message).to.eql('Welcome to FilmPolis\' Api!');
            });
    });
});

describe('POST api/v1/users', () => {

    it('should return a confirm message (SignIn)', () => {
        return chai.request(api).post('/api/v1/users/signin')
            .send({ username: "MigueDev96", password: "12345678" })
            .then(res => {
                expect(res.status).to.equal(201);
                expect(res).to.be.json;
                expect(res.body.data).to.exist;
            });
    });

    it('should return a token (LogIn)', () => {
        return chai.request(api).post('/api/v1/users/login')
            .send({ username: "MigueDev96", password: "12345678" })
            .then(res => {
                expect(res.status).to.equal(201);
                expect(res).to.be.json;
                expect(res.body.data).to.exist;
                expect(res.body.data).to.have.all.keys([
                    'id',
                    'token'
                ]);
            });
    });
});
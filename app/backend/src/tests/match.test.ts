import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';
import matchMocks from './mocks/match.mocks';
import JWT from '../utils/JWT';
import Validations from '../middlewares/Validations';


chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Matches Integration Tests', function() {
    afterEach(function () {
        sinon.restore();
      });
    it('Should return all matches', async function() {
        const arrayMatches = [matchMocks.match]

        sinon.stub(SequelizeMatch, 'findAll').resolves(arrayMatches as unknown as SequelizeMatch[]);
        
        const { status, body } = await chai.request(app).get('/matches');
        
        expect(status).to.equal(200);
        expect(body).to.deep.equal(arrayMatches);
    });
    it('Should return all matches in progress', async function() {
       const arrayMatches = [matchMocks.match]

        sinon.stub(SequelizeMatch, 'findAll').resolves(arrayMatches as unknown as SequelizeMatch[]);

        const { status, body } = await chai.request(app).get('/matches?inProgress=true');

        expect(status).to.equal(200);
        expect(body).to.deep.equal(arrayMatches);
    });

    it('Should return all matches that are not in progress', async function() {
        const arrayMatches = [matchMocks.matchInProgress]

        sinon.stub(SequelizeMatch, 'findAll').resolves(arrayMatches as unknown as SequelizeMatch[]);

        const { status, body } = await chai.request(app).get('/matches?inProgress=false');

        expect(status).to.equal(200);
        expect(body).to.deep.equal(arrayMatches);
    });

    it('Should not be possible to add a new game without the token', async function() {
        sinon.stub(JWT, 'verify').resolves();
        const { correctInputCreateMatch } = matchMocks;

        const { status, body } = await chai.request(app).post('/matches').send(correctInputCreateMatch);

        expect(status).to.equal(401);
        expect(body).to.deep.equal({ message: 'Token not found' });
    });

    it('Should not be possible to update a new game without the token', async function() {
        sinon.stub(JWT, 'verify').resolves();
        const { correctInputUpdateMatch } = matchMocks;


        const { status, body } = await chai.request(app).post('/matches').send(correctInputUpdateMatch);

        expect(status).to.equal(401);
        expect(body).to.deep.equal({ message: 'Token not found' });
    });

    it('Should not be possible to add a new matches with an invalid token', async function() {
        sinon.stub(JWT, 'verify').returns('Token must be a valid token');
        sinon.stub(Validations, 'validateToken').resolves();
        const { correctInputCreateMatch } = matchMocks;

        const { status, body } = await chai.request(app).post('/matches').set('authorization', 'invalidToken').send(correctInputCreateMatch);

        expect(status).to.equal(401);
        expect(body).to.deep.equal({ message: 'Token must be a valid token' });
    });

    it('Should not be possible to update a new matches with an invalid token', async function() {
        sinon.stub(JWT, 'verify').returns('Token must be a valid token');
        sinon.stub(Validations, 'validateToken').resolves();
        const { correctInputUpdateMatch } = matchMocks;

        const { status, body } = await chai.request(app).post('/matches').set('authorization', 'invalidToken').send(correctInputUpdateMatch);

        expect(status).to.equal(401);
        expect(body).to.deep.equal({ message: 'Token must be a valid token' });
    });

    it('Should add a match successfully', async function() {
        const { correctInputCreateMatch, token, createMatchFromDB } = matchMocks;
        sinon.stub(JWT, 'verify').returns(token);
        sinon.stub(Validations, 'validateToken').resolves();
        sinon.stub(SequelizeMatch, 'create').resolves(createMatchFromDB as unknown as SequelizeMatch);
        const findOneStub = sinon.stub(SequelizeTeam, 'findByPk');
        findOneStub.onFirstCall().resolves(true as unknown as SequelizeMatch);
        findOneStub.onSecondCall().resolves(true as unknown as SequelizeMatch);

        const { status, body } = await chai.request(app).post('/matches').set('Authorization', token).send(correctInputCreateMatch);

        expect(status).to.equal(201);
        expect(body).to.deep.equal(createMatchFromDB);
    });

    it('Should not add a match with an invalid id', async function() {
        const { incorrectInputCreateMatch, token } = matchMocks;
        sinon.stub(JWT, 'verify').returns(token);
        sinon.stub(Validations, 'validateToken').resolves();
        const findOneStub = sinon.stub(SequelizeTeam, 'findByPk');
        findOneStub.onFirstCall().resolves(null as unknown as SequelizeMatch);
        findOneStub.onSecondCall().resolves(true as unknown as SequelizeMatch);

        const { status, body } = await chai.request(app).post('/matches').set('Authorization', token).send(incorrectInputCreateMatch);

        expect(status).to.equal(404);
        expect(body).to.deep.equal({message: "There is no team with such id!"});
    });

    it('Should not add a match with two equal teams', async function() {
        const { token, inputUpdateMatchWithEqualTeams } = matchMocks;
        sinon.stub(JWT, 'verify').returns(token);
        sinon.stub(Validations, 'validateToken').resolves();

        const { status, body } = await chai.request(app).post('/matches').set('Authorization', token).send(inputUpdateMatchWithEqualTeams);

        expect(status).to.equal(422);
        expect(body).to.deep.equal({message: "It is not possible to create a match with two equal teams"});
    });

    it('Should not be possible to update a match with an invalid id', async function() {
        const { correctInputUpdateMatch, token } = matchMocks;
        sinon.stub(JWT, 'verify').returns(token);
        sinon.stub(Validations, 'validateToken').resolves();
        sinon.stub(SequelizeMatch, 'findOne').resolves(null as unknown as SequelizeMatch);

        const { status, body } = await chai.request(app).patch('/matches/9999').set('Authorization', token).send(correctInputUpdateMatch);

        expect(status).to.equal(404);
        expect(body).to.deep.equal({message: "Match not found"});
    });
});
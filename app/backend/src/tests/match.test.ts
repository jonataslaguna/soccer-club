import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatch';
import matchMocks from './mocks/match.mocks';


chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Matches Integration Tests', function() {
    afterEach(function () {
        sinon.restore();
      });
    it('Should return all matches', async function() {
        const arrayMatches = [matchMocks.match]

        sinon.stub(SequelizeMatch, 'findAll').resolves(arrayMatches as any);
        
        const { status, body } = await chai.request(app).get('/matches');
        
        expect(status).to.equal(200);
        expect(body).to.deep.equal(arrayMatches);
    });
})
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';
import teams from './mocks/team.mocks'

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Teams Test', function() {
    afterEach(function () {
        sinon.restore();
      });
    it.only('Should return all teams', async function() {
        sinon.stub(SequelizeTeam, 'findAll').resolves(teams.allTeams as any);
        
        const { status, body } = await chai.request(app).get('/teams');
        
        expect(status).to.equal(200);
        expect(body).to.deep.equal(teams.allTeams);
    });
})
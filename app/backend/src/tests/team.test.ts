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

describe('Teams Integration Tests', function() {
    afterEach(function () {
        sinon.restore();
      });
    it('Should return all teams', async function() {
        sinon.stub(SequelizeTeam, 'findAll').resolves(teams.allTeams as any);
        
        const { status, body } = await chai.request(app).get('/teams');
        
        expect(status).to.equal(200);
        expect(body).to.deep.equal(teams.allTeams);
    });

    it('Should return a team by id', async function() {
        sinon.stub(SequelizeTeam, 'findByPk').resolves(teams.allTeams[0] as any);
        
        const { status, body } = await chai.request(app).get('/teams/1');
        
        expect(status).to.equal(200);
        expect(body).to.deep.equal(teams.allTeams[0]);
    });

    it('Should return a error if the team doesn\'t exists', async function() {
        sinon.stub(SequelizeTeam, 'findByPk').resolves(null);
        
        const { status, body } = await chai.request(app).get('/teams/9999');
        
        expect(status).to.equal(404);
        expect(body.message).to.equal('Team not found');
    });
})
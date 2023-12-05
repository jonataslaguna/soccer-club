import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SequelizeUser from '../database/models/SequelizeUser';
import loginMocks from './mocks/login.mocks';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Login Integration Tests', function() {
    afterEach(function () {
        sinon.restore();
      });
      it('When receiving an email and a valid password it should return a login token', async function () {
    
        const httpRequestBody = loginMocks.validLoginBody;

        const mockFindOneReturn = SequelizeUser.build(loginMocks.existingUser);
        sinon.stub(SequelizeUser, 'findOne').resolves(mockFindOneReturn);
    
        
        const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);
    
    
        expect(httpResponse.status).to.equal(200);
        expect(httpResponse.body).to.have.key('token');
      });

      it("Should return an error if you don't send a user", async function () {
    
        const httpRequestBody = loginMocks.withoutEmailLoginBody
    
        
        const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);
    
    
        expect(httpResponse.status).to.equal(400);
        expect(httpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
      });
    
      it("Should return an error if you don't send a password", async function () {
      
      const httpRequestBody = loginMocks.noPasswordLoginBody
    
      
      const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);
    
      expect(httpResponse.status).to.equal(400);
      expect(httpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
    
      });
    
      it('Should return an error if receiving a non-existent email', async function () {
        
        const httpRequestBody = loginMocks.notExistingUserBody
        sinon.stub(SequelizeUser, 'findOne').resolves(null);
    
        
        const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);
    
    
        expect(httpResponse.status).to.equal(401);
        expect(httpResponse.body).to.be.deep.equal({ message: 'Invalid email or password' });
      });
    
      it('Should return an error if receiving a non-existent password', async function () {
        
        const httpRequestBody = {email: 'notExist@gmail.com', password: '12345' }
       
        const mockFindOneReturn = SequelizeUser.build(loginMocks.existingUser);
    
        sinon.stub(SequelizeUser, 'findOne').resolves(mockFindOneReturn);
    
        const httpResponse = await chai.request(app).post('/login')
          .send(httpRequestBody);
    
    
        expect(httpResponse.status).to.equal(401);
        expect(httpResponse.body).to.be.deep.equal({ message: 'Invalid email or password' });
      });
})
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import UserService from '../database/services/UserService';
import { IUserData } from '../database/interface/IUser';
import {
  invalidFields, invalidInputs, invalidLoginData,
  invalidPassword, loginData, tokenLength, userByEmail
} from './mocks/user.mock';

import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes do endpoint de Matches', async function () {
  let chaiHttpResponse: Response

  describe('Metodos POST', async function () {
    it('Retorna um token de login', async function () {
      sinon.stub(UserService.prototype, 'getUserByEmail')
        .resolves(userByEmail as IUserData);
      chaiHttpResponse = await chai.request(app).post('/login').send(loginData);
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body.token.length).to.be.equal(tokenLength);
    })

    it('Retorna erro ao enviar uma senha invalida', async function () {
      chaiHttpResponse = await chai.request(app).post('/login').send(invalidInputs);
      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body.message).to.be.equal(invalidFields);
    })

    it('Retorna erro ao enviar uma senha incorreta', async function () {
      sinon.stub(UserService.prototype, 'getUserByEmail')
        .resolves(userByEmail as IUserData);
      chaiHttpResponse = await chai.request(app).post('/login').send(invalidLoginData);
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body.message).to.be.equal(invalidPassword);
    })
  })

  describe('Metodos GET', async function () {
    it('Retorna a role do usuario', async function () {
      sinon.stub(UserService.prototype, 'getUserByEmail')
        .resolves(userByEmail as IUserData);
      sinon.stub(UserService.prototype, 'getUserRole')
        .resolves(userByEmail as IUserData)

      const token = await chai.request(app).post('/login').send(loginData);
      chaiHttpResponse = await chai.request(app).get('/login/role').set('Authorization', token.body.token);
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body.role).to.be.equal('admin');
    })
  })

  afterEach(function () {
    sinon.restore();
  });
});

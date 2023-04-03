import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

// Matches
import MatchesService from '../database/services/MatchesService';
import { IMatchesWithNames } from '../database/interface/IMatches';
import {
  allMatches, inProgressMatches, finishedMatches,
  newMatch, createMatch, equalTeams, notFoundTeams
} from './mocks/matches.mock';

// User
import { IUserData } from '../database/interface/IUser';
import UserService from '../database/services/UserService';
import { loginData, userByEmail } from './mocks/user.mock';

// Teams
import TeamService from '../database/services/TeamService';
import ITeam from '../database/interface/ITeam';
import { allTeams } from './mocks/teams.mock';

import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes do endpoint de Matches', function () {
  let chaiHttpResponse: Response

  describe('Metodos GET', async function () {
    it('Listando todos as partidas', async function () {
      sinon.stub(MatchesService.prototype, 'getAllMatches')
        .resolves(allMatches as IMatchesWithNames[]);
      chaiHttpResponse = await chai.request(app).get('/matches');
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(allMatches);
    });

    it('Listando todas as partidas em andamento', async function () {
      sinon.stub(MatchesService.prototype, 'getFilteredMatches')
        .resolves(inProgressMatches as IMatchesWithNames[]);
      chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true');
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(inProgressMatches);
    })

    it('Listando todas as partidas encerradas', async function () {
      sinon.stub(MatchesService.prototype, 'getFilteredMatches')
        .resolves(finishedMatches as IMatchesWithNames[]);
      chaiHttpResponse = await chai.request(app).get('/matches?inProgress=false');
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(finishedMatches);
    })
  })

  describe('Metodos PACTH', async function () {
    it('Possivel finalizar uma partida em andamento', async function () {
      sinon.stub(MatchesService.prototype, 'finhishMatch').resolves(1);

      sinon.stub(UserService.prototype, 'getUserByEmail')
        .resolves(userByEmail as IUserData);
      const token = await chai.request(app).post('/login').send(loginData);

      chaiHttpResponse = await chai.request(app).patch('/matches/47/finish')
        .set('Authorization', token.body.token);
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body.message).to.be.deep.equal('Finished');
    })

    it('Possivel atualizar o placar de uma partida em andamento', async function () {
      sinon.stub(MatchesService.prototype, 'updateMatch').resolves(1);

      sinon.stub(UserService.prototype, 'getUserByEmail')
        .resolves(userByEmail as IUserData);
      const token = await chai.request(app).post('/login').send(loginData);

      chaiHttpResponse = await chai.request(app).patch('/matches/47')
        .set('Authorization', token.body.token);
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body.message).to.be.equal('Updated');
    })
  })

  describe('Metodo POST', async function () {
    it('Possivel criar uma nova partida', async function () {
      sinon.stub(UserService.prototype, 'getUserByEmail')
        .resolves(userByEmail as IUserData);
      const token = await chai.request(app).post('/login').send(loginData);

      sinon.stub(TeamService.prototype, 'getAllTeams')
        .resolves(allTeams as ITeam[]);

      sinon.stub(MatchesService.prototype, 'createMatch').resolves(newMatch);

      chaiHttpResponse = await chai.request(app).post('/matches')
        .set('Authorization', token.body.token).send(createMatch);
      expect(chaiHttpResponse.status).to.be.equal(201);
      expect(chaiHttpResponse.body).to.be.deep.equal(newMatch);
    })

    it('Retorna erro ao tentar criar partida com times iguais', async function () {
      sinon.stub(UserService.prototype, 'getUserByEmail')
        .resolves(userByEmail as IUserData);
      const token = await chai.request(app).post('/login').send(loginData);

      chaiHttpResponse = await chai.request(app).post('/matches')
        .set('Authorization', token.body.token).send(equalTeams);
      expect(chaiHttpResponse.status).to.be.equal(422);
      expect(chaiHttpResponse.body.message)
        .to.be.deep.equal('It is not possible to create a match with two equal teams');
    })

    it('Retorna erro ao tentar criar partida com times inexistentes', async function () {
      sinon.stub(UserService.prototype, 'getUserByEmail')
        .resolves(userByEmail as IUserData);
      const token = await chai.request(app).post('/login').send(loginData);

      sinon.stub(TeamService.prototype, 'getAllTeams')
        .resolves(allTeams as ITeam[]);

      chaiHttpResponse = await chai.request(app).post('/matches')
        .set('Authorization', token.body.token).send(notFoundTeams);
      expect(chaiHttpResponse.status).to.be.equal(404);
      expect(chaiHttpResponse.body.message).to.be.deep.equal('There is no team with such id!');
    })
  });

  afterEach(function () {
    sinon.restore();
  });
});

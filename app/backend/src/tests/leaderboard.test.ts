import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import MatchesSerivice from '../database/services/MatchesService';
import TeamService from '../database/services/TeamService';

import { app } from '../app';
import { Response } from 'superagent';
import { allMatches, allTeams, awayLeaderboard, homeLeaderboard } from './mocks/leaderboard.mock';
import LeaderboardService from '../database/services/LeaderboardService';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes do endpoint de Leaderboard', async function () {
  let chaiHttpResponse: Response

  describe('Metodos GET', async function () {
    it('Retorna uma lista com os times da casa', async function () {
      sinon.stub(LeaderboardService.prototype, 'getLeaderboard').resolves(homeLeaderboard);

      chaiHttpResponse = await chai.request(app).get('/leaderboard/home');
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(homeLeaderboard);
    });

    it('Retorna uma lista com os times visitantes', async function () {
      sinon.stub(LeaderboardService.prototype, 'getLeaderboard').resolves(awayLeaderboard);

      chaiHttpResponse = await chai.request(app).get('/leaderboard/away');
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(awayLeaderboard);
    });
  })

  afterEach(function () {
    sinon.restore();
  });
});

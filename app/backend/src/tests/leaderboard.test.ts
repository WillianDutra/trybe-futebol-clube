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
import Leaderboard from '../database/Leaderboard';

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

  describe('Classe leaderboard', async function () {
    it('Retorna corretamente os dados do time da casa', async function () {
      const leaderboard = new Leaderboard([allMatches[0]], allTeams[3], true);
      expect(leaderboard.getTeamInfos()).to.be.equal(homeLeaderboard[0]);
    })

    it('Retorna corretamente os dados do time visitante', async function () {
      const leaderboard = new Leaderboard([allMatches[0]], allTeams[0], false);
      expect(leaderboard.getTeamInfos()).to.be.equal(awayLeaderboard[0]);
    })
  })

  afterEach(function () {
    sinon.restore();
  });
});

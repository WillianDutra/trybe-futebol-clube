import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import ITeam from '../database/interface/ITeam';
import TeamService from '../database/services/TeamService';
import { allTeams, filteredTeam } from './mocks/teams.mock'

import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes unitarios do endpoint de Teams', function () {
  let chaiHttpResponse: Response

  it('Listando todos os times', async function () {
    sinon.stub(TeamService.prototype, 'getAllTeams')
      .resolves(allTeams as ITeam[]);
    chaiHttpResponse = await chai.request(app).get('/teams');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(allTeams);
  });

  it('Listando o time filtrado pelo id', async function () {
    sinon.stub(TeamService.prototype, 'getTeamById')
      .resolves(filteredTeam as ITeam);
    const chaiHttpResponse = await chai.request(app).get('/teams/1');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(filteredTeam);
  })

  afterEach(function () {
    sinon.restore();
  });
});

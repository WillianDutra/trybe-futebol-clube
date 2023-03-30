import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import MatchesService from '../database/services/MatchesService';
import { allMatches, inProgressMatches, finishedMatches } from './mocks/matches.mock';
import { IMatchesWithNames } from '../database/interface/IMatches';

import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes unitarios do endpoint de Matches', function () {
  let chaiHttpResponse: Response

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
    const chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(inProgressMatches);
  })

  it('Listando todas as partidas encerradas', async function () {
    sinon.stub(MatchesService.prototype, 'getFilteredMatches')
      .resolves(finishedMatches as IMatchesWithNames[]);
    const chaiHttpResponse = await chai.request(app).get('/matches?inProgress=false');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(finishedMatches);
  })

  afterEach(function () {
    sinon.restore();
  });
});

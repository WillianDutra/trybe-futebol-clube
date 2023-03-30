import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import Teams from '../database/models/Teams';
import { allTeams, filteredTeam } from './mocks/teams.mock'

import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes unitarios da camada service de Teams', function () {
  it('Listando todos os times', async function () {
    sinon.stub(Teams, 'findAll').resolves(allTeams as Teams[]);
    const response = await chai.request(app).get('/teams');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(allTeams);
  });

  it('Listando o time filtrado pelo id', async function () {
    sinon.stub(Teams, 'findByPk').resolves(filteredTeam as Teams);
    const response = await chai.request(app).get('/teams/1');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(filteredTeam);
  })

  afterEach(function () {
    sinon.restore();
  });
});

import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import TeamService from '../database/services/TeamService'
import allTeams from './mocks/teams.mock'

import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes unitarios da camada service de Teams', function () {
  it('Listando todos os times', async function () {
    // sinon.stub(TeamService, 'getAllTeams').resolves(allTeams);
    // const result = await TeamService.getAllTeams();
    // expect(result).to.be.equal(allTeams);
  });

  afterEach(function () {
    sinon.restore();
  });
});

import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes do endpoint de Leaderboard', async function () {
  let chaiHttpResponse: Response

  describe('Metodos GET', async function () {

  })

  afterEach(function () {
    sinon.restore();
  });
});

'use strict';

import superagent from 'superagent';
// import faker from 'faker';
import { startServer, stopServer } from '../lib/server';
import { pRemoveDogMock } from './lib/dog-mock';

const apiUrl = `http://localhost:${process.env.PORT}`;

describe('/dogs', () => {
  beforeAll(startServer);
  afterAll(stopServer);
  afterAll(pRemoveDogMock);

  test('POST /dogs should get a 200 and the newly created dog', () => {
    return superagent.post(`${apiUrl}/dogs`)
      .send({
        firstName: 'Rover',
        breed: 'Pit',
        age: '4',
        location: '98103',
      })
      .then((response) => {
        expect(response.status).toEqual(200);
      });
  });

  test('POST - 400 - bad request', () => {
    return superagent.post(`${apiUrl}/dogs`)
      .send({
        firstName: 'Rover',
        breed: 'Pit',
        age: '4',
      })
      .then(Promise.reject)
      .catch((response) => {
        expect(response.status).toEqual(400);
        expect(response.body).toBeFalsy();
      });
  });
});

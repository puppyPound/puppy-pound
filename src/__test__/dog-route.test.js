'use strict';

import superagent from 'superagent';
// import faker from 'faker';
import { startServer, stopServer } from '../lib/server';
import { pRemoveDogMock, pCreateDogMock } from './lib/dog-mock';

const apiUrl = `http://localhost:${process.env.PORT}`;

describe('/dogs', () => {
  beforeAll(startServer);
  afterAll(stopServer);
  afterAll(pRemoveDogMock);

  test.only('POST /dogs should get a 200 and the newly created dog', () => {
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
        location: '98103',
      })
      .then(Promise.reject)
      .catch((response) => {
        expect(response.status).toEqual(400);
        expect(response.body).toBeFalsy();
      });
  });

  test('POST - 409 - duplicate keys', () => {
    return pCreateDogMock()
      .then((mock) => {
        return superagent.post(`${apiUrl}/dogs`)
          .send({
            firstName: mock.request.firstName,
            breed: 'Pit',
            age: '4',
          });
      })
      .then(Promise.reject)
      .catch((error) => {
        expect(error.status).toEqual(409);
      });
  });
});

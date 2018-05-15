'use strict';

import superagent from 'superagent';
import faker from 'faker';

import { startServer, stopServer } from '../lib/server';
import { pCreateShelterMock, pRemoveShelterMock } from './lib/shelter-mock';

const apiUrl = `http://localhost:${process.env.PORT}`;

describe('/shelters', () => {
  beforeAll(startServer);
  afterAll(stopServer);
  afterEach(pRemoveShelterMock);

  test('POST /shelters should get a 200 and the newly created shelter', () => {
    return pCreateShelterMock()
      .then(() => {
        return superagent.post(`${apiUrl}/shelters`)
          .send({
            name: 'brian',
            location: 'Seattle',
          });
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual('brian');
        expect(response.body.location).toEqual('Seattle');
      });
  });

  test('POST /shelters should return a 400 status code', () => {
    const sheltersToPost = {
      name: faker.name.lastName(),
    };
    return superagent.post(`${apiUrl}/shelters`)
      .send(sheltersToPost)
      .then(Promise.reject)
      .catch((response) => {
        expect(response.status).toEqual(400);
      });
  });
});

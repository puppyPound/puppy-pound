'use strict';

import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import { pCreateAccountMock, pRemoveAccountMock } from './lib/account-mock';

const apiUrl = `http://localhost:${process.env.PORT}`;

describe('AUTH Router', () => {
  beforeAll(startServer);
  afterAll(stopServer);
  afterEach(pRemoveAccountMock);

  describe('POST to /signup', () => {
    test('POST - 200 - success', () => {
      return superagent.post(`${apiUrl}/signup`)
        .send({
          username: 'Rover',
          email: 'rover@poundpuppy.com',
          phoneNumber: '555-5555',
          password: 'password',
        })
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body.token).toBeTruthy();
        });
    });

    test('POST - 400 - bad request', () => {
      return superagent.post(`${apiUrl}/signup`)
        .send({
          username: 'Rover',
          email: 'rover@poundpuppy.com',
          password: 'password',
        })
        .then(Promise.reject)
        .catch((response) => {
          expect(response.status).toEqual(400);
          expect(response.body).toBeFalsy();
        });
    });

    test('POST - 409 - duplicate keys', () => {
      return pCreateAccountMock()
        .then((mock) => {
          return superagent.post(`${apiUrl}/signup`)
            .send({
              username: mock.request.username,
              phoneNumber: '123-456-1234',
              email: 'sparky@poundpuppy.com',
              password: 'password',
            });
        })
        .then(Promise.reject)
        .catch((error) => {
          expect(error.status).toEqual(409);
        });
    });
  }); 
});

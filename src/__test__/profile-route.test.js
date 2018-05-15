'use strict';

import superagent from 'superagent';
import faker from 'faker';

import { startServer, stopServer } from '../lib/server';
import { pCreateAccountMock } from './lib/account-mock';
import { pRemoveProfileMock, pCreateProfileMock } from './lib/profile-mock';

const apiUrl = `http://localhost:${process.env.PORT}`;

describe('/profiles', () => {
  beforeAll(startServer);
  afterAll(stopServer);
  afterEach(pRemoveProfileMock);

  test('POST /profiles should get a 200 and the newly created profile', () => {
    let accountMock = null;
    return pCreateAccountMock()
      .then((accountSetMock) => {
        accountMock = accountSetMock;
        return superagent.post(`${apiUrl}/profiles`)
          .set('Authorization', `Bearer ${accountSetMock.token}`)
          .send({
            firstName: 'jim',
            lastName: 'garth',
            breed: 'lab',
            age: 9,
            location: '98133',
          });
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.account).toEqual(accountMock.account._id.toString());
        expect(response.body.firstName).toEqual('jim');
        expect(response.body.lastName).toEqual('garth');
        expect(response.body.age).toEqual(9);
        expect(response.body.location).toEqual('98133');
      });
  });

  test('POST /profiles should return a 400 status code', () => {
    const profileToPost = {
      lastName: faker.name.lastName(),
      firstName: faker.name.firstName(),
      breed: faker.lorem.words(10),
      age: Math.floor(Math.random() * 16),
    };
    return superagent.post(`${apiUrl}/profiles`)
      .send(profileToPost)
      .then(Promise.reject)
      .catch((response) => {
        expect(response.status).toEqual(400);
      });
  });

  test('POST /profiles should return a 404 status code', () => {
    const profileToPost = {
      lastName: faker.name.lastName(),
      firstName: faker.name.firstName(),
      breed: faker.lorem.words(10),
      age: Math.floor(Math.random() * 16),
      location: faker.address.zipCode(),
    };
    return superagent.post(`${apiUrl}/badRoute`)
      .send(profileToPost)
      .then(Promise.reject)
      .catch((response) => {
        expect(response.status).toEqual(404);
      });
  });

  test('POST /profiles should return a 401 status for bad token', () => {
    return pCreateProfileMock()
      .then(() => {
        return superagent.post(`${apiUrl}/profiles`)
          .set('Authorization', 'Bearer ')
          .send({});
      })
      .then(Promise.reject)
      .catch((err) => {
        expect(err.status).toEqual(401);
      });
  });

  test('PUT /profiles/:id should return a 200 and updated profile', () => {
    let profileToUpdate = null;
    return pCreateProfileMock()
      .then((profile) => {
        profileToUpdate = profile;
        return superagent.put(`${apiUrl}/profiles/${profile.profile._id}`)
          .set('Authorization', `Bearer ${profile.token}`)
          .send({ breed: 'pit' });
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.breed).toEqual('pit');
        expect(response.body.firstName).toEqual(profileToUpdate.profile.firstName);
        expect(response.body.lastName).toEqual(profileToUpdate.profile.lastName);
        expect(response.body.age).toEqual(profileToUpdate.profile.age);        
        expect(response.body.location).toEqual(profileToUpdate.profile.location);
        expect(response.body._id).toEqual(profileToUpdate.profile._id.toString());
      });
  });

  test('PUT /profiles/:id should return a 400 due to lack of breed', () => {
    return pCreateProfileMock()
      .then((profile) => {
        return superagent.put(`${apiUrl}/profiles/${profile.profile._id}`)
          .send({ breed: '' });
      })
      .catch((err) => {
        expect(err.status).toEqual(400);
      });
  });

  test('PUT /profiles/:id should return a 409 due to duplicated breed', () => {
    return pCreateProfileMock()
      .then((profile) => {
        return superagent.put(`${apiUrl}/profiles/${profile.profile._id}`)
          .send({ breed: profile.breed });
      })
      .catch((err) => {
        expect(err.status).toEqual(409);
      });
  });
  
  test('GET /profiles/:id should respond with 200 if there are no errors', () => {
    let profileToTest = null;
    return pCreateProfileMock()
      .then((profile) => {
        profileToTest = profile;
        return superagent.get(`${apiUrl}/profiles/${profile.profile._id}`)
          .set('Authorization', `Bearer ${profile.accountSetMock.token}`);
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.firstName).toEqual(profileToTest.profile.firstName);
        expect(response.body.url).toEqual(profileToTest.profile.url);
        expect(response.body._id).toBeTruthy();
      });
  });

  test('GET /profiles/:id should respond with 404 if there is no profile found', () => {
    return superagent.get(`${apiUrl}/profile/BadId`)
      .then(Promise.reject)
      .catch((err) => {
        expect(err.status).toEqual(404);
      });
  });

  test('GET /profiles/:id should respond with 401 status for bad token', () => {
    return pCreateProfileMock()
      .then((profile) => {
        return superagent.get(`${apiUrl}/profiles/${profile.profile._id}`)
          .set('Authorization', 'Bearer ');
      })
      .catch((err) => {
        expect(err.status).toEqual(401);
      });
  });

  describe('DELETE', () => {
    test('DELETE /profiles/:id should respond with 204 for successful deletion', () => {
      return pCreateProfileMock()
        .then((profileMock) => {
          return superagent.delete(`${apiUrl}/profiles/${profileMock.profile._id}`)
            .set('Authorization', `Bearer ${profileMock.accountSetMock.token}`);
        })
        .then((response) => {
          expect(response.status).toEqual(204);
        });
    });
  });
  
  test('DELETE /profiles/:id should respond with 404 due to no profile found', () => {
    return superagent.delete(`${apiUrl}/profile/BadId`)
      .then(Promise.reject)
      .catch((err) => {
        expect(err.status).toEqual(404);
      });
  });

  test('DELETE /profiles/:id should return with 401 status for bad token', () => {
    return pCreateProfileMock()
      .then((profile) => {
        return superagent.delete(`${apiUrl}/profiles/${profile.profile._id}`)
          .set('Authorization', 'Bearer ');
      })
      .then(Promise.reject)
      .catch((err) => {
        expect(err.status).toEqual(401);
      });
  });
});

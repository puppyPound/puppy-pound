'use strict';

import superagent from 'superagent';
import faker from 'faker';
import { startServer, stopServer } from '../lib/server';
import { pRemoveDogMock, pCreateDogMock } from './lib/dog-mock';

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
        age: 'puppy',
        location: '98103',
        details: 'rover is cool beans',
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.firstName).toEqual('Rover');
        expect(response.body.breed).toEqual('Pit');        
        expect(response.body.age).toEqual('puppy');
        expect(response.body.location).toEqual('98103');
        expect(response.body.details).toEqual('rover is cool beans');        
      });
  });

  test('POST /dogs should return a 404 status code for bad route', () => {
    const dogToPost = {
      firstName: faker.name.firstName(),
      breed: faker.lorem.words(2),
      age: faker.lorem.words(1),
      location: faker.address.zipCode(),
      details: faker.lorem.words(15),
    };
    return superagent.post(`${apiUrl}/badRoute`)
      .send(dogToPost)
      .then(Promise.reject)
      .catch((response) => {
        expect(response.status).toEqual(404);
      });
  });

  test('PUT /dogs/:id should return a 200 and an updated dog', () => {
    let dogToUpdate = null;
    return pCreateDogMock()
      .then((mock) => {
        dogToUpdate = mock;
        return superagent.put(`${apiUrl}/dogs/${mock.dog._id}`)
          .send({ breed: 'Bulldog' });
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.breed).toEqual('Bulldog');        
        expect(response.body.firstName).toEqual(dogToUpdate.dog.firstName);
        expect(response.body.age).toEqual(dogToUpdate.dog.age);
        expect(response.body.location).toEqual(dogToUpdate.dog.location);
        expect(response.body.details).toEqual(dogToUpdate.dog.details);
        expect(response.body._id).toEqual(dogToUpdate.dog._id.toString());        
      });
  });

  test('PUT /dogs/:id should return a 400 due to lack of breed', () => {
    return pCreateDogMock()
      .then((mock) => {
        return superagent.put(`${apiUrl}/dogs/${mock.dog._id}`)
          .send({ breed: '' });
      })
      .catch((err) => {
        expect(err.status).toEqual(400);
      });
  });

  test('PUT /dogs/:id should return a 409 due to duplicate name', () => {
    return pCreateDogMock()
      .then((dog) => {
        return superagent.put(`${apiUrl}/dogs/${dog.dog._id}`)
          .send({ firstName: dog.firstName });
      })
      .catch((err) => {
        expect(err.status).toEqual(409);
      });
  });

  test('GET /dogs/:id should return with a 200 status if no errors', () => {
    let dogToTest = null;
    return pCreateDogMock()
      .then((dog) => {
        dogToTest = dog;
        return superagent.get(`${apiUrl}/dogs/${dog.dog._id}`);
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.firstName).toEqual(dogToTest.dog.firstName);
        expect(response.body.breed).toEqual(dogToTest.dog.breed);
        expect(response.body._id).toBeTruthy();
      });
  });

  test('GET /dogs/:id should respond with a 404 status code if there is no dog found', () => {
    return superagent.get(`${apiUrl}/dog/BadId`)
      .then(Promise.reject)
      .catch((err) => {
        expect(err.status).toEqual(404);
      });
  });

  test('DELETE /dogs/:id should respond with a 204 status code for successful deletion', () => {
    return pCreateDogMock()
      .then((dogMock) => {
        return superagent.delete(`${apiUrl}/dogs/${dogMock.dog._id}`);
      })
      .then((response) => {
        expect(response.status).toEqual(204);
      });
  });

  test('DELETE /dogs/:id should respond with a 404 status code due to no profile found', () => {
    return superagent.delete(`${apiUrl}/dog/BadId`)
      .then(Promise.reject)
      .catch((err) => {
        expect(err.status).toEqual(404);
      });
  });
});

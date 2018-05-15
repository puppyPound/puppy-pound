'use strict';

import superagent from 'superagent';
import faker from 'faker';
import { startServer, stopServer } from '../lib/server';
import { pRemoveDogMock, pCreateDogMock } from './lib/dog-mock';

const apiUrl = `http://localhost:${process.env.PORT}`;

jest.setTimeout(3000);

describe('/dogs', () => {
  beforeAll(startServer);
  afterAll(stopServer);
  afterAll(pRemoveDogMock);

  test.only('POST /dogs should get a 200 and the newly created dog', () => {
    return superagent.post(`${apiUrl}/dogs`)
      .send({
        firstName: 'Rover',
        breed: 'Pit',
        age: '5',
        location: '98103',
        details: 'rover is cool beans',
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.firstName).toEqual('Rover');
        expect(response.body.breed).toEqual('Pit');        
        expect(response.body.age).toEqual('5');
        expect(response.body.location).toEqual('98103');
        expect(response.body.details).toEqual('rover is cool beans');        
      });
  });

  // test('POST /dogs should return a 404 status code for bad route', () => {
  //   const dogToPost = {
  //     firstName: faker.name.firstName(),
  //     breed: faker.lorem.words(2),
  //     age: Math.floor(Math.random() * 16),
  //     location: faker.address.zipCode(),
  //     details: faker.lorem.words(15),
  //   };
  //   return superagent.post(`${apiUrl}/badRoute`)
  //     .send(dogToPost)
  //     .then(Promise.reject)
  //     .catch((response) => {
  //       expect(response.status).toEqual(404);
  //     });
  // });

  // test('POST /dogs should return a 409 status code for duplicate keys', () => {
  //   return pCreateDogMock()
  //     .then((mock) => {
  //       return superagent.post(`${apiUrl}/dogs`)
  //         .send({
  //           firstName: mock.request.firstName,
  //           breed: 'Pit',
  //           age: '4',
  //         });
  //     })
  //     .then(Promise.reject)
  //     .catch((error) => {
  //       expect(error.status).toEqual(409);
  //     });
  // });

  // test('PUT /dogs/:id should return a 200 and an updated dog', () => {
  //   let dogToUpdate = null;
  //   return pCreateDogMock()
  //     .then((dog) => {
  //       dogToUpdate = dog;
  //       return superagent.put(`${apiUrl}/dogs/${dog.dog._id}`)
  //         .send({ breed: 'Pit' });
  //     })
  //     .then((response) => {
  //       expect(response.status).toEqual(200);
  //       expect(response.body.breed).toEqual('pit');        
  //       expect(response.body.firstName).toEqual(dogToUpdate.profile.firstName);
  //       expect(response.body.age).toEqual(dogToUpdate.profile.age);
  //       expect(response.body.location).toEqual(dogToUpdate.profile.location);
  //       expect(response.body.details).toEqual(dogToUpdate.profile.details);
  //       expect(response.body._id).toEqual(dogToUpdate.dog._id.toString());        
  //     });
  // });

  // test('PUT /dogs/:id should return a 400 due to lack of breed', () => {
  //   return pCreateDogMock()
  //     .then((dog) => {
  //       return superagent.put(`${apiUrl}/dogs/${dog.dog._id}`)
  //         .send({ breed: '' });
  //     })
  //     .catch((err) => {
  //       expect(err.status).toEqual(400);
  //     });
  // });

  // test('PUT /dogs/:id should return a 409 due to duplicate name', () => {
  //   return pCreateDogMock()
  //     .then((dog) => {
  //       return superagent.put(`${apiUrl}/dogs/${dog.dog._id}`)
  //         .send({ firstName: dog.firstName });
  //     })
  //     .catch((err) => {
  //       expect(err.status).toEqual(409);
  //     });
  // });

  // test('GET /dogs/:id should return with a 200 status if no errors', () => {
  //   let dogToTest = null;
  //   return pCreateDogMock()
  //     .then((dog) => {
  //       dogToTest = dog;
  //       return superagent.get(`${apiUrl}/dogs/${dog.dog._id}`);
  //     })
  //     .then((response) => {
  //       expect(response.status).toEqual(200);
  //       expect(response.body.firstName).toEqual(dogToTest.dog.firstName);
  //       expect(response.body.breed).toEqual(dogToTest.dog.breed);
  //       expect(response.body._id).toBeTruthy();
  //     });
  // });

  // test('GET /dogs/:id should respond with a 404 status code if there is no dog found', () => {
  //   return superagent.get(`${apiUrl}/dog/BadId`)
  //     .then(Promise.reject)
  //     .catch((err) => {
  //       expect(err.status).toEqual(404);
  //     });
  // });

  // test('DELETE /dogs/:id should respond with a 204 status code for successful deletion', () => {
  //   return pCreateDogMock()
  //     .then((dogMock) => {
  //       return superagent.delete(`${apiUrl}/dogs/${dogMock.dog._id}`);
  //     })
  //     .then((response) => {
  //       expect(response.status).toEqual(204);
  //     });
  // });

  // test('DELETE /dogs/:id should respond with a 404 status code due to no profile found', () => {
  //   return superagent.delete(`${apiUrl}/dog/BadId`)
  //     .then(Promise.reject)
  //     .catch((err) => {
  //       expect(err.status).toEqual(404);
  //     });
  // });
});

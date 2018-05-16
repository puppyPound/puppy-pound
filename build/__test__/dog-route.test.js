'use strict';

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _server = require('../lib/server');

var _dogMock = require('./lib/dog-mock');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiUrl = 'http://localhost:' + process.env.PORT;

describe('/dogs', function () {
  beforeAll(_server.startServer);
  afterAll(_server.stopServer);
  afterAll(_dogMock.pRemoveDogMock);

  test('POST /dogs should get a 200 and the newly created dog', function () {
    return _superagent2.default.post(apiUrl + '/dogs').send({
      firstName: 'Rover',
      breed: 'Pit',
      age: '5',
      location: '98103',
      details: 'rover is cool beans'
    }).then(function (response) {
      console.log(response.body);
      expect(response.status).toEqual(200);
      expect(response.body.firstName).toEqual('Rover');
      expect(response.body.breed).toEqual('Pit');
      expect(response.body.age).toEqual('5');
      expect(response.body.location).toEqual('98103');
      expect(response.body.details).toEqual('rover is cool beans');
    });
  });

  test('POST /dogs should return a 404 status code for bad route', function () {
    var dogToPost = {
      firstName: _faker2.default.name.firstName(),
      breed: _faker2.default.lorem.words(2),
      age: Math.floor(Math.random() * 16),
      location: _faker2.default.address.zipCode(),
      details: _faker2.default.lorem.words(15)
    };
    return _superagent2.default.post(apiUrl + '/badRoute').send(dogToPost).then(Promise.reject).catch(function (response) {
      expect(response.status).toEqual(404);
    });
  });

  test('POST /dogs should return a 409 status code for duplicate keys', function () {
    return (0, _dogMock.pCreateDogMock)().then(function (mock) {
      return _superagent2.default.post(apiUrl + '/dogs').send({
        firstName: mock.request.firstName,
        breed: 'Pit',
        age: 4,
        location: '98133',
        details: 'Everything is awesome!'
      });
    }).then(Promise.reject).catch(function (error) {
      expect(error.status).toEqual(409);
    });
  });

  test('PUT /dogs/:id should return a 200 and an updated dog', function () {
    var dogToUpdate = null;
    return (0, _dogMock.pCreateDogMock)().then(function (mock) {
      dogToUpdate = mock;
      return _superagent2.default.put(apiUrl + '/dogs/' + mock.dog._id).send({ breed: 'Bulldog' });
    }).then(function (response) {
      expect(response.status).toEqual(200);
      expect(response.body.breed).toEqual('Bulldog');
      expect(response.body.firstName).toEqual(dogToUpdate.dog.firstName);
      expect(response.body.age).toEqual(dogToUpdate.dog.age);
      expect(response.body.location).toEqual(dogToUpdate.dog.location);
      expect(response.body.details).toEqual(dogToUpdate.dog.details);
      expect(response.body._id).toEqual(dogToUpdate.dog._id.toString());
    });
  });

  test('PUT /dogs/:id should return a 400 due to lack of breed', function () {
    return (0, _dogMock.pCreateDogMock)().then(function (mock) {
      return _superagent2.default.put(apiUrl + '/dogs/' + mock.dog._id).send({ breed: '' });
    }).catch(function (err) {
      expect(err.status).toEqual(400);
    });
  });

  test('PUT /dogs/:id should return a 409 due to duplicate name', function () {
    return (0, _dogMock.pCreateDogMock)().then(function (dog) {
      return _superagent2.default.put(apiUrl + '/dogs/' + dog.dog._id).send({ firstName: dog.firstName });
    }).catch(function (err) {
      expect(err.status).toEqual(409);
    });
  });

  test('GET /dogs/:id should return with a 200 status if no errors', function () {
    var dogToTest = null;
    return (0, _dogMock.pCreateDogMock)().then(function (dog) {
      dogToTest = dog;
      return _superagent2.default.get(apiUrl + '/dogs/' + dog.dog._id);
    }).then(function (response) {
      expect(response.status).toEqual(200);
      expect(response.body.firstName).toEqual(dogToTest.dog.firstName);
      expect(response.body.breed).toEqual(dogToTest.dog.breed);
      expect(response.body._id).toBeTruthy();
    });
  });

  test('GET /dogs/:id should respond with a 404 status code if there is no dog found', function () {
    return _superagent2.default.get(apiUrl + '/dog/BadId').then(Promise.reject).catch(function (err) {
      expect(err.status).toEqual(404);
    });
  });

  test('DELETE /dogs/:id should respond with a 204 status code for successful deletion', function () {
    return (0, _dogMock.pCreateDogMock)().then(function (dogMock) {
      return _superagent2.default.delete(apiUrl + '/dogs/' + dogMock.dog._id);
    }).then(function (response) {
      expect(response.status).toEqual(204);
    });
  });

  test('DELETE /dogs/:id should respond with a 404 status code due to no profile found', function () {
    return _superagent2.default.delete(apiUrl + '/dog/BadId').then(Promise.reject).catch(function (err) {
      expect(err.status).toEqual(404);
    });
  });
});
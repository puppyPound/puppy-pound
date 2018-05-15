'use strict';

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _server = require('../lib/server');

var _accountMock = require('./lib/account-mock');

var _profileMock = require('./lib/profile-mock');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiUrl = 'http://localhost:' + process.env.PORT;

describe('/profiles', function () {
  beforeAll(_server.startServer);
  afterAll(_server.stopServer);
  afterEach(_profileMock.pRemoveProfileMock);

  test('POST /profiles should get a 200 and the newly created profile', function () {
    var accountMock = null;
    return (0, _accountMock.pCreateAccountMock)().then(function (accountSetMock) {
      accountMock = accountSetMock;
      return _superagent2.default.post(apiUrl + '/profiles').set('Authorization', 'Bearer ' + accountSetMock.token).send({
        firstName: 'jim',
        lastName: 'garth',
        breed: 'lab',
        age: 9,
        location: '98133'
      });
    }).then(function (response) {
      expect(response.status).toEqual(200);
      expect(response.body.account).toEqual(accountMock.account._id.toString());
      expect(response.body.firstName).toEqual('jim');
      expect(response.body.lastName).toEqual('garth');
      expect(response.body.age).toEqual(9);
      expect(response.body.location).toEqual('98133');
    });
  });

  test('POST /profiles should return a 400 status code', function () {
    var profileToPost = {
      lastName: _faker2.default.name.lastName(),
      firstName: _faker2.default.name.firstName(),
      breed: _faker2.default.lorem.words(10),
      age: Math.floor(Math.random() * 16)
    };
    return _superagent2.default.post(apiUrl + '/profiles').send(profileToPost).then(Promise.reject).catch(function (response) {
      expect(response.status).toEqual(400);
    });
  });

  test('POST /profiles should return a 404 status code', function () {
    var profileToPost = {
      lastName: _faker2.default.name.lastName(),
      firstName: _faker2.default.name.firstName(),
      breed: _faker2.default.lorem.words(10),
      age: Math.floor(Math.random() * 16),
      location: _faker2.default.address.zipCode()
    };
    return _superagent2.default.post(apiUrl + '/badRoute').send(profileToPost).then(Promise.reject).catch(function (response) {
      expect(response.status).toEqual(404);
    });
  });

  test('POST /profiles should return a 401 status for bad token', function () {
    return (0, _profileMock.pCreateProfileMock)().then(function () {
      return _superagent2.default.post(apiUrl + '/profiles').set('Authorization', 'Bearer ').send({});
    }).then(Promise.reject).catch(function (err) {
      expect(err.status).toEqual(401);
    });
  });

  test('PUT /profiles/:id should return a 200 and updated profile', function () {
    var profileToUpdate = null;
    return (0, _profileMock.pCreateProfileMock)().then(function (profile) {
      profileToUpdate = profile;
      return _superagent2.default.put(apiUrl + '/profiles/' + profile.profile._id).set('Authorization', 'Bearer ' + profile.token).send({ breed: 'pit' });
    }).then(function (response) {
      expect(response.status).toEqual(200);
      expect(response.body.breed).toEqual('pit');
      expect(response.body.firstName).toEqual(profileToUpdate.profile.firstName);
      expect(response.body.lastName).toEqual(profileToUpdate.profile.lastName);
      expect(response.body.age).toEqual(profileToUpdate.profile.age);
      expect(response.body.location).toEqual(profileToUpdate.profile.location);
      expect(response.body._id).toEqual(profileToUpdate.profile._id.toString());
    });
  });

  test('PUT /profiles/:id should return a 400 due to lack of breed', function () {
    return (0, _profileMock.pCreateProfileMock)().then(function (profile) {
      return _superagent2.default.put(apiUrl + '/profiles/' + profile.profile._id).send({ breed: '' });
    }).catch(function (err) {
      expect(err.status).toEqual(400);
    });
  });

  test('PUT /profiles/:id should retrn a 409 due to duplicated breed', function () {
    return (0, _profileMock.pCreateProfileMock)().then(function (profile) {
      return _superagent2.default.put(apiUrl + '/profiles/' + profile.profile._id).send({ breed: profile.breed });
    }).catch(function (err) {
      expect(err.status).toEqual(409);
    });
  });

  test('GET /profiles/:id should respond with 200 if there are no errors', function () {
    var profileToTest = null;
    return (0, _profileMock.pCreateProfileMock)().then(function (profile) {
      profileToTest = profile;
      return _superagent2.default.get(apiUrl + '/profiles/' + profile.profile._id).set('Authorization', 'Bearer ' + profile.accountSetMock.token);
    }).then(function (response) {
      expect(response.status).toEqual(200);
      expect(response.body.firstName).toEqual(profileToTest.profile.firstName);
      expect(response.body.url).toEqual(profileToTest.profile.url);
      expect(response.body._id).toBeTruthy();
    });
  });

  test('GET /profiles/:id should respond with 404 if there is no profile found', function () {
    return _superagent2.default.get(apiUrl + '/profile/BadId').then(Promise.reject).catch(function (err) {
      expect(err.status).toEqual(404);
    });
  });

  test('GET /profiles/:id should respond with 401 status for bad token', function () {
    return (0, _profileMock.pCreateProfileMock)().then(function (profile) {
      return _superagent2.default.get(apiUrl + '/profiles/' + profile.profile._id).set('Authorization', 'Bearer ');
    }).catch(function (err) {
      expect(err.status).toEqual(401);
    });
  });

  describe('DELETE', function () {
    test('DELETE /profiles/:id should respond with 204 for successful deletion', function () {
      return (0, _profileMock.pCreateProfileMock)().then(function (profileMock) {
        return _superagent2.default.delete(apiUrl + '/profiles/' + profileMock.profile._id).set('Authorization', 'Bearer ' + profileMock.accountSetMock.token);
      }).then(function (response) {
        expect(response.status).toEqual(204);
      });
    });
  });

  test('DELETE /profiles/:id should respond with 404 due to no profile found', function () {
    return _superagent2.default.delete(apiUrl + '/profile/BadId').then(Promise.reject).catch(function (err) {
      expect(err.status).toEqual(404);
    });
  });

  test('DELETE /profiles/:id should return with 401 status for bad token', function () {
    return (0, _profileMock.pCreateProfileMock)().then(function (profile) {
      return _superagent2.default.delete(apiUrl + '/profiles/' + profile.profile._id).set('Authorization', 'Bearer ');
    }).then(Promise.reject).catch(function (err) {
      expect(err.status).toEqual(401);
    });
  });
});
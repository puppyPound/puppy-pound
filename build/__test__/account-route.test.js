'use strict';

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _server = require('../lib/server');

var _accountMock = require('./lib/account-mock');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiUrl = 'http://localhost:' + process.env.PORT;

describe('AUTH Router', function () {
  beforeAll(_server.startServer);
  afterAll(_server.stopServer);
  afterEach(_accountMock.pRemoveAccountMock);

  describe('POST to /signup', function () {
    test('POST - 200 - success', function () {
      return _superagent2.default.post(apiUrl + '/signup').send({
        username: 'Rover',
        email: 'rover@poundpuppy.com',
        phoneNumber: '555-5555',
        password: 'password'
      }).then(function (response) {
        expect(response.status).toEqual(200);
        expect(response.body.token).toBeTruthy();
      });
    });

    test('POST - 400 - bad request', function () {
      return _superagent2.default.post(apiUrl + '/signup').send({
        username: 'Rover',
        email: 'rover@poundpuppy.com',
        password: 'password'
      }).then(Promise.reject).catch(function (response) {
        expect(response.status).toEqual(400);
        expect(response.body).toBeFalsy();
      });
    });

    test('POST - 409 - duplicate keys', function () {
      return (0, _accountMock.pCreateAccountMock)().then(function (mock) {
        return _superagent2.default.post(apiUrl + '/signup').send({
          username: mock.request.username,
          phoneNumber: '123-456-1234',
          email: 'sparky@poundpuppy.com',
          password: 'password'
        });
      }).then(Promise.reject).catch(function (error) {
        expect(error.status).toEqual(409);
      });
    });
  });

  describe('GET from /login', function () {
    test('GET - 200 success', function () {
      return (0, _accountMock.pCreateAccountMock)().then(function (mock) {
        return _superagent2.default.get(apiUrl + '/login').auth(mock.request.username, mock.request.password);
      }).then(function (response) {
        expect(response.status).toEqual(200);
        expect(response.body.token).toBeTruthy();
      });
    });

    test('GET - 400 for bad request', function () {
      return (0, _accountMock.pCreateAccountMock)().then(function (mock) {
        return _superagent2.default.get(apiUrl + '/login').auth('bad request', mock.request.password);
      }).catch(function (response) {
        expect(response.status).toEqual(400);
        expect(response.body).toBeFalsy();
      });
    });

    test('GET /login should respond with 404 status code', function () {
      return _superagent2.default.get(apiUrl + '/login/puppy').then(Promise.reject).catch(function (response) {
        expect(response.status).toEqual(404);
      });
    });
  });
});
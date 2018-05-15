'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _bodyParser = require('body-parser');

var _httpErrors = require('http-errors');

var _httpErrors2 = _interopRequireDefault(_httpErrors);

var _account = require('../models/account');

var _account2 = _interopRequireDefault(_account);

var _basicAuthMiddleware = require('../lib/basic-auth-middleware');

var _basicAuthMiddleware2 = _interopRequireDefault(_basicAuthMiddleware);

var _logger = require('../lib/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var accountRouter = new _express.Router();
var jsonParser = (0, _bodyParser.json)();

accountRouter.post('/signup', jsonParser, function (request, response, next) {
  return _account2.default.create(request.body.username, request.body.phoneNumber, request.body.email, request.body.password) // eslint-disable-line
  .then(function (account) {
    delete request.body.password;
    _logger2.default.log(_logger2.default.INFO, 'AUTH - creating token');
    return account.pCreateToken();
  }).then(function (token) {
    _logger2.default.log(_logger2.default.INFO, 'AUTH - return 200 code');
    return response.json({ token: token });
  }).catch(next);
});

accountRouter.get('/login', _basicAuthMiddleware2.default, function (request, response, next) {
  if (!request.account) {
    return next(new _httpErrors2.default(400, 'AUTH - Invalid request'));
  }
  return request.account.pCreateToken().then(function (token) {
    _logger2.default.log(_logger2.default.INFO, 'responding with 200 status and token');
    return response.json({ token: token });
  }).catch(next);
});

exports.default = accountRouter;
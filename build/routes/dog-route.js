'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _express = require('express');

var _bodyParser = require('body-parser');

var _dog = require('../models/dog');

var _dog2 = _interopRequireDefault(_dog);

var _logger = require('../lib/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jsonParser = (0, _bodyParser.json)();
var dogRouter = new _express.Router();

dogRouter.post('/dogs', jsonParser, function (request, response, next) {
  return new _dog2.default(_extends({}, request.body)).save().then(function (dog) {
    _logger2.default.log(_logger2.default.INFO, 'POST - responding with a 200 status code and a new Dog');
    return response.json(dog);
  }).catch(next);
});

dogRouter.get('/dogs/:id', function (request, response, next) {
  return _dog2.default.findById(request.params.id).then(function (dog) {
    _logger2.default.log(_logger2.default.INFO, 'GET - responding with a 200 status code');
    return response.json(dog);
  }).catch(next);
});

dogRouter.put('/dogs/:id', jsonParser, function (request, response, next) {
  var options = { runValidators: true, new: true };
  return _dog2.default.findByIdAndUpdate(request.params.id, request.body, options).then(function (updatedDog) {
    _logger2.default.log(_logger2.default.INFO, 'PUT - responding with a 200 status code');
    return response.json(updatedDog);
  }).catch(next);
});

dogRouter.delete('/dogs/:id', function (request, response, next) {
  return _dog2.default.findByIdAndRemove(request.params.id).then(function () {
    _logger2.default.log(_logger2.default.INFO, 'DELETE - responding with a 204 status code');
    return response.sendStatus(204);
  }).catch(next);
});

exports.default = dogRouter;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pRemoveDogMock = exports.pCreateDogMock = undefined;

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _dog = require('../../models/dog');

var _dog2 = _interopRequireDefault(_dog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pCreateDogMock = function pCreateDogMock() {
  var mock = {};
  mock.request = {
    firstName: _faker2.default.name.firstName(),
    breed: _faker2.default.lorem.words(10),
    age: Math.floor(Math.random() * 16),
    details: _faker2.default.lorem.words(50),
    location: _faker2.default.address.zipCode()
  };
  return _dog2.default.create(mock.request.firstName, mock.request.breed, mock.request.age, mock.request.details, mock.request.location) // eslint-disable-line
  .then(function (dog) {
    mock.dog = dog;
    return mock;
  });
};

var pRemoveDogMock = function pRemoveDogMock() {
  return _dog2.default.remove({});
};

exports.pCreateDogMock = pCreateDogMock;
exports.pRemoveDogMock = pRemoveDogMock;
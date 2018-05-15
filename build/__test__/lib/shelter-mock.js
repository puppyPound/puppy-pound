'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pRemoveShelterMock = exports.pCreateShelterMock = undefined;

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _shelter = require('../../models/shelter');

var _shelter2 = _interopRequireDefault(_shelter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pCreateShelterMock = function pCreateShelterMock() {
  var mock = {};
  mock.request = {
    name: _faker2.default.name.firstName(),
    location: _faker2.default.address.zipCode()
  };
  return _shelter2.default.create(mock.request.name, mock.request.location) // eslint-disable-line
  .then(function (shelter) {
    mock.shelter = shelter;
    return mock;
  });
};

var pRemoveShelterMock = function pRemoveShelterMock() {
  return _shelter2.default.remove({});
};

exports.pCreateShelterMock = pCreateShelterMock;
exports.pRemoveShelterMock = pRemoveShelterMock;
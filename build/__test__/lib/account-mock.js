'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pRemoveAccountMock = exports.pCreateAccountMock = undefined;

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _account = require('../../models/account');

var _account2 = _interopRequireDefault(_account);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pCreateAccountMock = function pCreateAccountMock() {
  var mock = {};
  mock.request = {
    username: _faker2.default.internet.userName(),
    email: _faker2.default.internet.email(),
    phoneNumber: _faker2.default.phone.phoneNumber(),
    password: _faker2.default.lorem.words(5)
  };
  return _account2.default.create(mock.request.username, mock.request.email, mock.request.phoneNumber, mock.request.password) // eslint-disable-line
  .then(function (account) {
    mock.account = account;
    return account.pCreateToken();
  }).then(function (token) {
    mock.token = token;
    return _account2.default.findById(mock.account._id);
  }).then(function (account) {
    mock.account = account;
    return mock;
  });
};

var pRemoveAccountMock = function pRemoveAccountMock() {
  return _account2.default.remove({});
};

exports.pCreateAccountMock = pCreateAccountMock;
exports.pRemoveAccountMock = pRemoveAccountMock;
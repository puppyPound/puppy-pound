'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dogSchema = _mongoose2.default.Schema({
  firstName: { type: String, required: true, unique: true },
  breed: { type: String, required: true },
  age: { type: String, required: true },
  location: { type: String, required: true },
  details: { type: String }
});

var Dog = _mongoose2.default.model('dog', dogSchema);

Dog.create = function (firstName, breed, age, details, location) {
  return new Dog({
    firstName: firstName,
    breed: breed,
    age: age,
    details: details,
    location: location
  }).save();
};

exports.default = Dog;
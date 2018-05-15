'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var shelterSchema = _mongoose2.default.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  location: {
    type: String,
    required: true
  },
  dogs: [{
    type: _mongoose2.default.Schema.Types.ObjectId, ref: 'dogs'
  }]
}, { usePushEach: true });

var Shelter = _mongoose2.default.model('shelter', shelterSchema);

Shelter.create = function (name, location) {
  return new Shelter({
    name: name,
    location: location
  }).save();
};

exports.default = Shelter;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var profileSchema = _mongoose2.default.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  breed: { type: String },
  age: { type: Number },
  location: { type: String, required: true },
  dogs: [{
    type: _mongoose2.default.Schema.Types.ObjectId, ref: 'dogs'
  }],
  account: {
    type: _mongoose2.default.Schema.ObjectId,
    required: true,
    unique: true
  }
}, { usePushEach: true });

exports.default = _mongoose2.default.model('profile', profileSchema);
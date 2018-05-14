'use strict';

import mongoose from 'mongoose';

const profileSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  breed: { type: String },
  age: { type: String },
  location: { type: String, required: true },
  account: {
    type: mongoose.Schema.ObjectId,
    required: true,
    unique: true,
  },
});

export default mongoose.model('profile', profileSchema);

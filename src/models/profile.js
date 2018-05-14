'use strict';

import mongoose from 'mongoose';

const profileSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  breed: { type: String },
  age: { type: String },
  location: { type: String, required: true },
  dogs: [
    {
      type: mongoose.Schema.Types.ObjectId, ref: 'dogs',
    },
  ],
  account: {
    type: mongoose.Schema.ObjectId,
    required: true,
    unique: true,
  },
}, { usePushEach: true });

export default mongoose.model('profile', profileSchema);

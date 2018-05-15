'use strict';

import mongoose from 'mongoose';

const dogSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: String, required: true },
  location: { type: String, required: true },
  profile: {
    type: mongoose.Schema.ObjectId,
    required: true,
    unique: true,
  },
}, { usePushEach: true });

export default mongoose.model('dog', dogSchema);

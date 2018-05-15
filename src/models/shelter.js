'use strict';

import mongoose from 'mongoose';

const shelterSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
  dogs: [
    {
      type: mongoose.Schema.Types.ObjectId, ref: 'dogs',
    },
  ],
}, { usePushEach: true });

const Shelter = mongoose.model('shelter', shelterSchema);

Shelter.create = (name, location) => {
  return new Shelter({
    name,
    location,
  }).save();
};

export default Shelter;

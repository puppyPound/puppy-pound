'use strict';

import mongoose from 'mongoose';

const dogSchema = mongoose.Schema({
  firstName: { type: String, required: true, unique: true },
  breed: { type: String, required: true },
  age: { type: String, required: true },
  location: { type: String, required: true },
  details: { type: String },
});

const Dog = mongoose.model('dog', dogSchema);

Dog.create = (firstName, breed, age, details, location) => {
  return new Dog({
    firstName,
    breed,
    age,
    details,
    location,
  }).save();
};

export default Dog;

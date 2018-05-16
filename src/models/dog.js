'use strict';

import mongoose from 'mongoose';
import HttpError from 'http-errors';
import Profile from './profile';

const dogSchema = mongoose.Schema({
  firstName: { type: String, required: true, unique: true },
  breed: { type: String, required: true },
  age: { type: String, required: true },
  location: { type: String, required: true },
  details: { type: String },
});

function dogPreHook(done) {
  return Profile.find() 
    .then((profiles) => {
      if (!profiles) {
        throw new HttpError(404, 'profiles not found');
      }
      for (let i = 0; i < profiles.length; i++) {
        profiles[i].dogs.push(this._id);
        profiles[i].save();
      }
    })
    .then(() => done())
    .catch(done);
}

const dogPostHook = (document, done) => {
  return Profile.find()
    .then((profiles) => {
      if (!profiles) {
        throw new HttpError(500, 'profiles not found');
      }
      for (let i = 0; i < profiles.length; i++) {
        profiles[i].dogs = profiles[i].dogs.filter((dog) => {
          return dog._id.toString() !== document._id.toString();
        });
      }
    })
    .then(() => done())
    .catch(done);
};

dogSchema.pre('save', dogPreHook);
dogSchema.post('remove', dogPostHook);

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

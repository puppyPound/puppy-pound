'use strict';

import faker from 'faker';
import Dog from '../../models/dog';
import { pCreateShelterMock, pRemoveShelterMock } from './shelter-mock';

const pCreateDogMock = () => {
  const resultMock = {};

  return pCreateShelterMock()
    .then((shelterSetMock) => {
      resultMock.shelterSetMock = shelterSetMock;

      return new Dog({
        firstName: faker.name.firstName(),
        breed: faker.lorem.words(10),
        age: Math.floor(Math.random() * 16),
        location: faker.address.zipCode(),
        details: faker.lorem.words(50),
        shelter: shelterSetMock.shelter._id,
      }).save();
    })
    .then((dog) => {
      resultMock.dog = dog;
      return resultMock;
    });
};

const pRemoveDogMock = () => {
  return Promise.all([
    Dog.remove({}),
    pRemoveShelterMock(),
  ]);
};

export { pCreateDogMock, pRemoveDogMock };

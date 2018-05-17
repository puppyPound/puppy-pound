'use strict';

import faker from 'faker';
import Dog from '../../models/dog';

const pCreateDogMock = () => {
  const mock = {};
  mock.request = {
    firstName: faker.name.firstName(),
    breed: faker.lorem.words(2),
    age: faker.lorem.words(1),
    details: faker.lorem.words(50),
    location: faker.address.zipCode(),
  };
  return Dog.create(mock.request.firstName, mock.request.breed, mock.request.age, mock.request.details, mock.request.location) // eslint-disable-line
    .then((dog) => {
      mock.dog = dog;
      return mock;
    });
};

const pRemoveDogMock = () => Dog.remove({});

export { pCreateDogMock, pRemoveDogMock };

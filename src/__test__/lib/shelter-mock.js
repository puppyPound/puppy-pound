'use strict';

import faker from 'faker';
import Shelter from '../../models/shelter';

const pCreateShelterMock = () => {
  const mock = {};
  mock.request = {
    name: faker.internet.name(),
    location: faker.internet.location(),
  };
  return Shelter.create(mock.request.name, mock.request.location) // eslint-disable-line
    .then((shelter) => {
      mock.shelter = shelter;
      return mock;
    });
};

const pRemoveShelterMock = () => Shelter.remove({});

export { pCreateShelterMock, pRemoveShelterMock };

'use strict';

import faker from 'faker';
import Profile from '../../models/profile';
import { pCreateAccountMock, pRemoveAccountMock } from './account-mock';

const pCreateProfileMock = () => {
  const resultMock = {};

  return pCreateAccountMock()
    .then((accountSetMock) => {
      resultMock.accountSetMock = accountSetMock;

      return new Profile({
        lastName: faker.name.lastName(),
        firstName: faker.name.firstName(),
        breed: faker.lorem.words(2),
        age: faker.lorem.words(1),
        phoneNumber: '12345',
        location: faker.address.zipCode(),
        account: accountSetMock.account._id,
      }).save();
    })
    .then((profile) => {
      resultMock.profile = profile;
      return resultMock;
    });
};

const pRemoveProfileMock = () => {
  return Promise.all([
    Profile.remove({}),
    pRemoveAccountMock(),
  ]);
};

export { pCreateProfileMock, pRemoveProfileMock };

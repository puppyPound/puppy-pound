'use strict';

import faker from 'faker';
import Account from '../../models/account';

const pCreateAccountMock = () => {
  const mock = {};
  mock.request = {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.phoneNumber(),
    password: faker.lorem.words(5),
  };
  return Account.create(mock.request.username, mock.request.email, mock.request.phoneNumber, mock.request.password) // eslint-disable-line
    .then((account) => {
      mock.account = account;
      return account.pCreateToken();
    })
    .then((token) => {
      mock.token = token;
      return Account.findById(mock.account._id);
    })
    .then((account) => {
      mock.account = account;
      return mock;
    });
};

const pRemoveAccountMock = () => Account.remove({});

export { pCreateAccountMock, pRemoveAccountMock };

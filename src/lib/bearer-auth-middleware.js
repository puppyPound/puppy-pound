'use strict';

import HttpError from 'http-errors';
import jsonWebToken from 'jsonwebtoken';
import Account from '../models/account';

const promisify = callbackStyleFunction => (...args) => {
  return new Promise((resolve) => {
    callbackStyleFunction(...args, (error, data) => {
      return resolve(data);
    });
  });
};

export default (request, response, next) => {
  if (!request.headers.authorization) {
    return next(new HttpError(400, 'AUTH - invalid request'));
  }

  const token = request.headers.authorization.split('Bearer ')[1];

  if (!token) {
    return next(new HttpError(401, 'AUTH - invalid request'));
  }

  return promisify(jsonWebToken.verify)(token, process.env.PUPPY_SECRET)
    .then((decryptedToken) => {
      return Account.findOne({ tokenSeed: decryptedToken.tokenSeed });
    })
    .then((account) => {
      request.account = account;
      return next();
    })
    .catch(next);
};

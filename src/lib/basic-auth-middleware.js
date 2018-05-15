'use strict';

import HttpError from 'http-errors';
import Account from '../models/account';

export default (request, response, next) => {
  const base64AuthHeader = request.headers.authorization.split('Basic ')[1];
  const stringAuthHeader = Buffer.from(base64AuthHeader, 'base64').toString();
  const [username, password] = stringAuthHeader.split(':');
  return Account.findOne({ username })
    .then((account) => {
      if (!account) {
        return next(new HttpError(400, 'AUTH -invalid request'));
      }
      return account.pVerifyPassword(password);
    })
    .then((account) => {
      request.account = account;
      return next();
    })
    .catch(next);
};

'use strict';

import { Router } from 'express';
import { json } from 'body-parser';
import Account from '../models/account';
import basicAuthMiddleware from '../lib/basic-auth-middleware';
import logger from '../lib/logger';

const accountRouter = new Router();
const jsonParser = json();

accountRouter.post('/signup', jsonParser, (request, response, next) => {
  return Account.create(request.body.username, request.body.phoneNumber, request.body.email, request.body.password) // eslint-disable-line
    .then((account) => {
      delete request.body.password;
      logger.log(logger.INFO, 'AUTH - creating token');
      return account.pCreateToken();
    })
    .then((token) => {
      logger.log(logger.INFO, 'AUTH - return 200 code');
      return response.json({ token });
    })
    .catch(next);
});

accountRouter.get('/login', basicAuthMiddleware, (request, response, next) => {
  return request.account.pCreateToken()
    .then((token) => {
      logger.log(logger.INFO, 'responding with 200 status and token');
      return response.json({ token });
    })
    .catch(next);
});

export default accountRouter;

'use strict';

import { Router } from 'express';
import { json } from 'body-parser';
import Profile from '../models/profile';
import bearerAuthMiddleware from '../lib/bearer-auth-middleware';
import logger from '../lib/logger';

const jsonParser = json();
const profileRouter = new Router();

profileRouter.post('/profiles', bearerAuthMiddleware, jsonParser, (request, response, next) => {
  return new Profile({
    ...request.body,
    account: request.account._id,
  })
    .save()
    .then((profile) => {
      logger.log(logger.INFO, 'Returning a 200 and a new Profile');
      return response.json(profile);
    })
    .catch(next);
});

profileRouter.get('/profiles/:id', (request, response, next) => {
  return Profile.findById(request.params.id)
    .then((profile) => {
      logger.log(logger.INFO, 'GET - responding with a 200 status code');
      return response.json(profile);
    })
    .catch(next);
});

profileRouter.put('/profiles/:id', jsonParser, (request, response, next) => {
  const options = { runValidators: true, new: true };
  return Profile.findByIdAndUpdate(request.params.id, request.body, options)
    .then((updatedProfile) => {
      logger.log(logger.INFO, 'PROFILE - ROUTE: responding with a 200 status code');
      return response.json(updatedProfile);
    })
    .catch(next);
});

profileRouter.delete('/profiles/:id', bearerAuthMiddleware, (request, response, next) => {
  return Profile.findByIdAndRemove(request.params.id)
    .then(() => {
      logger.log(logger.INFO, 'DELETE - responding with a 204 status code');
      return response.sendStatus(204);
    })
    .catch(next);
});

export default profileRouter;

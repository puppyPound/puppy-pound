'use strict';

import { Router } from 'express';
import { json } from 'body-parser';
import HttpError from 'http-errors';
import Shelter from '../models/shelter';
import logger from '../lib/logger';

const shelterRouter = new Router();
const jsonParser = json();

shelterRouter.post('/shelters', jsonParser, (request, response, next) => {
  return Shelter.create(request.body.name, request.body.location) // eslint-disable-line
    .then((shelter) => {
      logger.log(logger.INFO, 'POST - responding with a 200 status code and a new Shelter');
      return response.json(shelter);
    })
    .catch(next);
});

shelterRouter.get('/shelters/:id', (request, response, next) => {
  return Shelter.findById(request.params.id)
    .then((shelter) => {
      if (!shelter) {
        return next(new HttpError(400, 'GET - Invalid request'));
      }
      logger.log(logger.INFO, 'GET - responding with 200 status');
      return response.json(shelter);
    })
    .catch(next);
});

export default shelterRouter;

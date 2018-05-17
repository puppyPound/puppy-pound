'use strict';

import { Router } from 'express';
import { json } from 'body-parser';
import HttpError from 'http-errors';
import Dog from '../models/dog';
import logger from '../lib/logger';

const jsonParser = json();
const dogRouter = new Router();

dogRouter.post('/dogs', jsonParser, (request, response, next) => { 
  return new Dog({
    ...request.body,
  })
    .save()
    .then((dog) => {
      logger.log(logger.INFO, 'POST - responding with a 200 status code and a new Dog');
      return response.json(dog);
    })
    .catch(next);
});

dogRouter.get('/dogs/:id', (request, response, next) => {
  return Dog.findById(request.params.id)
    .then((dog) => {
      if (!dog) {
        logger.log(logger.INFO, 'GET - responding with a 404 status code - (!dog)');
        return next(new HttpError(404, 'dog not found'));
      }
      logger.log(logger.INFO, 'GET - responding with a 200 status code');
      return response.json(dog);
    })
    .catch(next);
});

dogRouter.put('/dogs/:id', jsonParser, (request, response, next) => {
  const options = { runValidators: true, new: true };
  return Dog.findByIdAndUpdate(request.params.id, request.body, options)
    .then((updatedDog) => {
      console.log(updatedDog);
      logger.log(logger.INFO, 'PUT - responding with a 200 status code');
      return response.json(updatedDog);
    })
    .catch(next);
});

dogRouter.delete('/dogs/:id', (request, response, next) => {
  if (!request.params.id) {
    return next(new HttpError(404, 'no params id'));
  }
  return Dog.findByIdAndRemove(request.params.id)
    .then((dog) => {
      if (!dog) {
        logger.log(logger.INFO, 'DELETE - responding with a 404 status code - (!dog)');
        return next(new HttpError(404, 'dog not found'));
      }
      logger.log(logger.INFO, 'DELETE - responding with a 204 status code, dog deleted');
      return response.status(204).send('Dog Deleted');
    })
    .catch(next);
});

export default dogRouter;

# Pound Puppy

**Author**: Josiah Green, Kris Sakarias, Lacy Hogan, Mario Flores Jr.

**Version**: 1.0.0

## Overview

This app focuses on the problem domain of providing the user with data of availabilty of dogs for adoption at a specified shelter. The app is built with a RESTful HTTP server that utilizes basic authentication using Express. An account and login is created through basic and bearer authentication. A password is hashed from bcrypt, crypto is used to create a token seed, and a json web token is used to generate the token. Mongoose and MongoDB are used for the Schema and database functionality. 

## Running Locally:

- You will need a Twilio number

- In you .env file:

 * PORT: defaults to 3000
 * NODE_ENV: set to development
 * MONGODB_URI: set to mongodb://localhost/testing
 * PUPPY_SECRET: set to long randomized sequence of alphanumeric characters
 * TWILIO_ACCOUNT_SID: check Twilio account for reference
 * TWILIO_AUTH_TOKEN check Twilio account for reference
 * TWILIO_NUMBER: check Twilio account for reference
 * MY_NUMBER: personal phone number for testing purposes

## Getting Started

To install dependencies, run:

```npm i```

```nodemon``` or ```npm start``` This will start the server and tell you what port you're on

To start the db and test the routes, from the command line, enter:

```npm run dbon``` This turns MongoDB on

```npm run test``` Enter this line in a separate command line tab. This initiates the tests via jest

```npm run dboff``` This turns off MongoDB


## Documentation

 ```POST /signup``` 
- To create an account, the username, email, phone number, and password is sent to the server utilizing the POST /signup. An authentication token is generated with the password provided. The newly created user account is saved into the database.

```GET /login```
- The user will make a GET request with a required username and password that is then authenticated to retrieve a token that is used for login.

```POST /profiles```
- Once the user is authenticated, a POST request is made which creates a new profile that is necessary to establish an identity within the app. This new profile is saved into the database for future use.

```GET /profiles/:id```
- For the user to retrieve their profile from the database, a GET request is made that will initiate a search to find their profile specifically by ID.

```DELETE /profiles/:id```
- If the user wishes to remove their profile from the database, a DELETE request can be made by searching the database for the specific profile by ID which will remove the instance.


## Architecture

JavaScript, Node, Express, MongoDB, Mongoose, Travis, Twilio, Heroku, superagent, winston, logger, jest, babel, dotenv, body-parser, crypto, bcrypt, jsonwebtoken, fs-extra, faker.

## Change Log

 * 5-14-2018 9:30am - Initial scaffolding
 * 5-14-2018 10:00am - Made first merge into master branch to connect to Travis
 * 5-14-2018 2:00pm - Profile model completed with a mock Profile model for testing, a Profile router (post, get, and delete), and tests for Profile route. Tests not passing and functionality needed.
 * 5-14-2018 2:00pm - Account model completed with a mock Account model for testing, an Account router (post & get), and tests for Account route. Tests not passing and functionality needed.
 * 5-14-2018 4:00pm - Resolved Profile and Account route bugs, tests now passing.
 * 5-14-2018 5:30pm - Dog model completed with a mock Dog model for testing, a Dog router (post, get, put, delete), and tests for Dog route. Test not passing.
 * 5-15-2018 9:15am - Began testing on Dog model routes and integrating into other schemas
 * 5-15-2018 9:30am - Began work on Shelter model, mock, router, and tests.
 * 5-15-2018 1:30pm - Shelter Schema is completed, but not fully functional. It was decided to put that particular implementation on standby as a possible MVP until testing and functionality of other schemas are fully passing.
 * 5-15-2018 

## Workflow

![poundpuppy](/assets:/model-relationship-diagram.png)

![poundpuppy](/assets:/poundpuppy-workflow.png)

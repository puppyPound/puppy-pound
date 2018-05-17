# Pound Puppy

</p>
<p align="center">
   <a href="https://github.com/badges/shields/compare/gh-pages...master">
        <img src="https://img.shields.io/travis/USER/REPO.svg"
            alt="commits to be deployed"></a>
            </p>

**Author**: Josiah Green, Kris Sakarias, Lacy Hogan, Mario Flores Jr.

**Version**: 1.0.0

## Overview

This app focuses on the problem domain of providing the user with data of availability of dogs for adoption at a specified shelter. The user signs up for an account and creates a profile with their specific preferences for their desired type of dog, including their give location. The app is built with a RESTful HTTP server that utilizes basic authentication using Express. An account and login is created through basic and bearer authentication. Mongoose and MongoDB are used for the Schema and database functionality. 

## Running Locally:

 You will need a <a href="https://www.twilio.com/">Twilio Number</a>.

#### In Your.env File:

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

## Under the Hood

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

```POST /dogs```
- Once a dog instance is posted into the database, a matched user is notified through text message via third party cloud communications platform service, Twilio. The text message provides the user with matched availability based on the user's preferences.

```GET /dogs/:id```
- For the user to retrieve a particular dog instance in the database, a GET request can be made that will initiate a search to find the desired dog instance retrieved by ID.

```PUT /dogs/:id```
- In a situation where a user would want to update a property on a particular dog instance from the database, a PUT request can be made that will initiate a search to find the desired dog instance retrieved by ID for updating.

```DELETE /dogs/:id```
- If a user wishes to remove a dog instance, a DELETE request can be made by searching the database for the specific dog by ID that will remove the instance.

```DogAge = Puppy(< 1), Youth(1-4), Adult(4-7), Mature(7+)```
- Age range reference

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
 * 5-15-2018 1:30pm - Shelter Schema is completed, but not fully functional. It was decided to put that particular implementation on standby as a possible stretch goal until testing and functionality of other schemas are fully passing.
 * 5-15-2018 5:30pm - App now successfully integrated with Twilio. Functionality is now sending text message to user when new Dog instance is added.
 * 5-16-2018 9:30am - Successful deployment to Heroku.
 * 5-16-2018 5:00pm - Achieved successful functionality to send alert text messages to users based on user preference.

## Workflow

#### Model Relationships

![model-relationship-diagram](https://user-images.githubusercontent.com/35154014/40151133-fccaa6b2-5932-11e8-9e85-5ae156742c5e.png)

#### Entity-Relationship (ER) Model
![poundpuppy-workflow](https://user-images.githubusercontent.com/35154014/40151134-fce488e8-5932-11e8-998c-c27214970200.png)

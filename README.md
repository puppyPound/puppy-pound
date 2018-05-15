# Pound Puppy

**Author**: Josiah Green, Kris Sakarias, Lacy Hogan, Mario Flores Jr.

**Version**: 1.0.0

## Overview

This app focuses on the problem domain of providing the user with data of availabilty of dogs for adoption at a specified shelter. The app is built with a RESTful HTTP server that utilizes basic authentication using Express. An account and login is created through basic and bearer authentication. A password is hashed from bcrypt, crypto is used to create a token seed, and a json web token is used to generate the token. Mongoose and MongoDB are used for the Schema and database functionality. 

## Getting Started

Install dependencies. 

To start the db and test the routes, from the command line, enter:

```npm run dbon``` This turns MongoDB on

```npm run test``` Enter this line in a separate command line tab. This initiates the tests via jest

```npm run dboff``` This turns off MongoDB

## Documentation

 ```POST /signup``` 
- To create an account, the username, email, phone number, and password is sent to the server utilizing the POST /signup. An authentication token is generated with the password provided. The newly created user account is saved into the database.

```GET /login```
- 

```POST /profiles```

```GET /profiles/:id```

```DELETE /profiles/:id```



## Architecture

JavaScript, Node, Express, MongoDB, Mongoose, Travis, Heroku, superagent, winston, logger, jest, babel, dotenv, body-parser, faker.

## Change Log

 * 5-14-2018 9:30am - Initial scaffolding
 * 5-14-2018 10:00am - made first merge into master branch to connect to Travis
 * 5-14-2018 2:00pm - Profile model completed with a mock profile for testing, a profile router (post, get, and delete), and tests for Profile route. Tests not passing and functionality needed.
 * 5-14-2018 2:00pm - Account model completed with a mock profile for testing, an account router (post & get), and tests for Account route. Tests not passing and functionality needed.
 * 5-14-2018 4:00pm - Resolved Profile and Account route bugs, tests now passing.

## Workflow

![poundpuppy](/assets:/poundpuppy.pdf)

## Credits and Collaborations

TA Seth Donohue
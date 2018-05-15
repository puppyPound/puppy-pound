'use strict';

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jsonWebToken from 'jsonwebtoken';

const HASH_ROUNDS = 8;
const TOKEN_SEED_LENGTH = 128;

const accountSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  tokenSeed: {
    type: String,
    required: true,
    unique: true,
  },
});

function pCreateToken() {
  this.tokenSeed = crypto.randomBytes(TOKEN_SEED_LENGTH).toString('hex');
  return this.save()
    .then((account) => {
      return jsonWebToken.sign({
        tokenSeed: account.tokenSeed,
      }, process.env.PUPPY_SECRET);
    });
}

function pVerifyPassword(password) {
  return bcrypt.compare(password, this.passwordHash)
    .then(() => {
      return this;
    });
}

accountSchema.methods.pCreateToken = pCreateToken;
accountSchema.methods.pVerifyPassword = pVerifyPassword;

const Account = mongoose.model('account', accountSchema);

Account.create = (username, email, phoneNumber, password) => {
  return bcrypt.hash(password, HASH_ROUNDS)
    .then((passwordHash) => {
    password = null; //eslint-disable-line
      const tokenSeed = crypto.randomBytes(TOKEN_SEED_LENGTH).toString('hex');
      return new Account({
        username,
        email,
        phoneNumber,
        passwordHash,
        tokenSeed,
      }).save();
    });
};

export default Account;

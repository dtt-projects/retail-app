/**
 * @module routes/API_createAccount
 * @fileoverview Route for creating an account
 * @requires Express
 * @requires routes/controllers/API_createAccount
 * @exports {Express#Router} The createAccout path router.
 */

/**
 * @description Express module
 * @constant
 * @memberof routes/API_createAccount
 */
const express = require('express');

/**
 * @description API_createAccountRouter to create an account.
 * @type {Object}
 * @constant
 */
const API_createAccountRouter = express.Router();

/**
 * @description API_createAccountController for handing the data.
 * @type {Object}
 * @constant
 */
const API_createAccountController = require('./controllers/API_createAccount.controller');


// To send the information to the controller as a post
API_createAccountRouter.post('/', API_createAccountController.createAccount);

module.exports = API_createAccountRouter;

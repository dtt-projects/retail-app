/**
 * @module routes/API_getAllAccounts
 * @fileoverview Routes for the API_getAllAccounts
 * @requires Express
 * @requires routes/controllers/API_getAllAccounts
 * @exports {Express#Router} The API_getAllAccounts path router.
 */

/**
 * @description Express module
 * @constant
 * @memberof routes/API_getAllAccounts
 */
const express = require('express');

/**
 * @description API_getAllAccountsRouter for a getAllAccounts function
 * @type {Object}
 * @constant
 */
const API_getAllAccountsRouter = express.Router();

/**
 * @description API_getAllAccountsController to handle getting a single account
 * @type {Object}
 * @constant
 */
const API_getAllAccountsController = require('./controllers/API_getAllAccounts.controller');


// Get the information to the controller for getting all accounts from the DB
API_getAllAccountsRouter.get('/', API_getAllAccountsController.getAllAccounts);

module.exports = API_getAllAccountsRouter;

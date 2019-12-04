/**
 * @module routes/API_getAccount
 * @fileoverview Routes for the API_getAccount
 * @requires Express
 * @requires routes/controllers/API_getAccount
 * @exports {Express#Router} The API_getAccount path router.
 */

/**
 * @description Express module
 * @constant
 * @memberof routes/API_getAccount
 */
const express = require('express');

/**
 * @description API_getAccountRouter for a getAccount function
 * @type {Object}
 * @constant
 */
const API_getAccountRouter = express.Router();

/**
 * @description API_getAccountController to handle getting a single account
 * @type {Object}
 * @constant
 */
const API_getAccountController = require('./controllers/API_getAccount.controller');


// Get the information to the controller for getting a single account from the DB
API_getAccountRouter.get('/', API_getAccountController.getAccount);

module.exports = API_getAccountRouter;

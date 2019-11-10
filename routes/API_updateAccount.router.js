/**
 * @module routes/API_updateAccount
 * @fileoverview Route for updating an account
 * @requires Express
 * @requires routes/controllers/API_updateAccount
 * @exports {Express#Router} The API_updateAccount path router.
 */

/**
 * @description Express module
 * @constant
 * @memberof routes/API_updateAccount
 */
const express = require('express');

/**
 * @description API_updateAccountRouter to update an account.
 * @type {Object}
 * @constant
 */
const API_updateAccountRouter = express.Router();

/**
 * @description API_updateAccountController for handing the data.
 * @type {Object}
 * @constant
 */
const API_updateAccountController = require('./controllers/API_updateAccount.controller');


// To send the information to the controller as a post for account creation
API_updateAccountRouter.put('/', API_updateAccountController.updateAccount);

module.exports = API_updateAccountRouter;

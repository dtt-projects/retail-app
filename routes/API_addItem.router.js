/**
 * @module routes/API_login
 * @fileoverview Routes for the login
 * @requires Express
 * @requires routes/controllers/API_login
 * @exports {Express#Router} The user path router.
 */

/**
 * @description Express module
 * @constant
 * @memberof routes/API_login
 */
const express = require('express');

/**
 * @description API_loginRouter for a login function
 * @type {Object}
 * @constant
 */
const API_addItemRouter = express.Router();

/**
 * @description API_loginController to handle to login data and validate
 * @type {Object}
 * @constant
 */
const API_addItemController = require('./controllers/API_addItem.controller');


// Post the information to the controller for login
API_addItemRouter.post('/', API_addItemController.addItem);

module.exports = API_addItemRouter;

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
const API_getItemsRouter = express.Router();

/**
 * @description API_loginController to handle to login data and validate
 * @type {Object}
 * @constant
 */
const API_getItemsController = require('./controllers/API_getItems.controller');


// Post the information to the controller for login
API_getItemsRouter.get('/', API_getItemsController.getItems);

module.exports = API_getItemsRouter;

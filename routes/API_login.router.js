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
const API_loginRouter = express.Router();

/**
 * @description API_loginController to handle the login data and validate
 * @type {Object}
 * @constant
 */
const API_loginController = require('./controllers/API_login.controller');


// Post the information to the controller for login
API_loginRouter.post('/', API_loginController.login);

module.exports = API_loginRouter;

/**
 * @module routes/API_forgotPassword
 * @fileoverview Routes for the forgot password call
 * @requires Express
 * @requires routes/controllers/API_forgotPasswordController
 * @exports {Express#Router} The API_forgotPasswordRouter.
 */

/**
 * @description Express module
 * @constant
 * @memberof routes/API_forgotPassword
 */
const express = require('express');

/**
 * @description forgotPassword router to handle the request.
 * @type {Object}
 * @constant
 */
const API_forgotPasswordRouter = express.Router();

/**
 * @description API_forgotPasswordController for the forgotPassword function
 * @type {Object}
 * @constant
 */
const API_forgotPasswordController = require('./controllers/API_forgotPassword.controller');


// Send a post request of the email for resetting a password
API_forgotPasswordRouter.post('/', API_forgotPasswordController.forgotPassword);

module.exports = API_forgotPasswordRouter;

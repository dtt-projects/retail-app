/**
 * @module routes/API_placeOrder
 * @fileoverview Routes for the login
 * @requires Express
 * @requires routes/controllers/API_placeOrder
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
const API_placeOrderRouter = express.Router();

/**
 * @description API_loginController to handle to login data and validate
 * @type {Object}
 * @constant
 */
const API_placeOrderController = require('./controllers/API_placeOrder.controller');


// Post the information to the controller for login
API_placeOrderRouter.post('/', API_placeOrderController.placeOrder);

module.exports = API_placeOrderRouter;

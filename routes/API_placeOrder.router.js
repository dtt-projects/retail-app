/**
 * @module routes/API_placeOrder
 * @fileoverview Routes for the place orders
 * @requires Express
 * @requires routes/controllers/API_placeOrder
 * @exports {Express#Router} The user path router.
 */

/**
 * @description Express module
 * @constant
 * @memberof routes/API_placeOrders
 */
const express = require('express');

/**
 * @description API_placeOrdersRouter for a placeOrders function
 * @type {Object}
 * @constant
 */
const API_placeOrderRouter = express.Router();

/**
 * @description API_placeOrdersController to handle to placeOrders data and validate
 * @type {Object}
 * @constant
 */
const API_placeOrderController = require('./controllers/API_placeOrder.controller');


// Post the information to the controller for placeOrders
API_placeOrderRouter.post('/', API_placeOrderController.placeOrder);

module.exports = API_placeOrderRouter;

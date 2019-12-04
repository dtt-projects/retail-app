/**
 * @module routes/API_getItems
 * @fileoverview Routes for the API_getItems
 * @requires Express
 * @requires routes/controllers/API_getItems
 * @exports {Express#Router} The API_getItems router.
 */

/**
 * @description Express module
 * @constant
 * @memberof routes/API_getItems
 */
const express = require('express');

/**
 * @description API_getItemsRouter for a getItems function
 * @type {Object}
 * @constant
 */
const API_getItemsRouter = express.Router();

/**
 * @description API_getItemsController to handle the get Items data
 * @type {Object}
 * @constant
 */
const API_getItemsController = require('./controllers/API_getItems.controller');


// Get the information to the controller for get all items
API_getItemsRouter.get('/', API_getItemsController.getItems);

module.exports = API_getItemsRouter;

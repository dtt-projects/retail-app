/**
 * @module routes/API_getItem
 * @fileoverview Routes for the API_getItem
 * @requires Express
 * @requires routes/controllers/API_getItem
 * @exports {Express#Router} The API_getItem path router.
 */

/**
 * @description Express module
 * @constant
 * @memberof routes/API_getItem
 */
const express = require('express');

/**
 * @description API_getItemRouter for a getItem function
 * @type {Object}
 * @constant
 */
const API_getItemRouter = express.Router();

/**
 * @description API_getItemController to handle getting a single item
 * @type {Object}
 * @constant
 */
const API_getItemController = require('./controllers/API_getItem.controller');


// Get the information to the controller for getting a single item from the DB
API_getItemRouter.get('/', API_getItemController.getItem);

module.exports = API_getItemRouter;

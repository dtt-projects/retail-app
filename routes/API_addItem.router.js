/**
 * @module routes/API_addItem
 * @fileoverview Routes for the add item api
 * @requires Express
 * @requires routes/controllers/API_addItem
 * @exports {Express#Router} The user path router.
 */

/**
 * @description Express module
 * @constant
 * @memberof routes/API_addItem
 */
const express = require('express');

/**
 * @description API_addItemRouter for an add item function
 * @type {Object}
 * @constant
 */
const API_addItemRouter = express.Router();

/**
 * @description API_addItemController to handle API_addItem data and validate
 * @type {Object}
 * @constant
 */
const API_addItemController = require('./controllers/API_addItem.controller');


// Post the information to the controller for API_addItemController
API_addItemRouter.post('/', API_addItemController.addItem);

module.exports = API_addItemRouter;

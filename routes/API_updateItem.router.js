/**
 * @module routes/API_updateItem
 * @fileoverview Routes for the updateItem
 * @requires Express
 * @requires routes/controllers/API_updateItem
 * @exports {Express#Router} The updateItem router.
 */

/**
 * @description Express module
 * @constant
 * @memberof routes/API_updateItem
 */
const express = require('express');

/**
 * @description API_updateItemRouter for a updateItem function
 * @type {Object}
 * @constant
 */
const API_updateItemRouter = express.Router();

/**
 * @description API_updateItemController to handle data for updating the DB
 * @type {Object}
 * @constant
 */
const API_updateItemController = require('./controllers/API_updateItem.controller');


// Put the information to the controller for updating items
API_updateItemRouter.post('/', API_updateItemController.updateItem);

module.exports = API_updateItemRouter;

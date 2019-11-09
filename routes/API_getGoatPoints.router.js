/**
 * @module routes/API_getGoatPoints
 * @fileoverview Routes for the API_getGoatPoints
 * @requires Express
 * @requires routes/controllers/API_getGoatPoints
 * @exports {Express#Router} The API_getGoatPoints path router.
 */

/**
 * @description Express module
 * @constant
 * @memberof routes/API_getGoatPoints
 */
const express = require('express');

/**
 * @description API_getGoatPointsRouter for a getGoatPoints function
 * @type {Object}
 * @constant
 */
const API_getGoatPointsRouter = express.Router();

/**
 * @description API_getGoatPointsController to handle getting a single item
 * @type {Object}
 * @constant
 */
const API_getGoatPointsController = require('./controllers/API_getGoatPoints.controller');


// Get the information to the controller for getting a single user's Goat
// points from the our DB
API_getGoatPointsRouter.get('/', API_getGoatPointsController.getGoatPoints);

module.exports = API_getGoatPointsRouter;

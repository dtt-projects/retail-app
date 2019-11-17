/**
 * @module routes/API_logout
 * @fileoverview Root router for `/` based paths.
 * @requires Express
 * @requires routes/controllers/API_logout
 * @exports {Express#Router} An Express router instance for the root server path.
 */

/**
 * Express module.
 * @type {Object}
 * @constant
 */
const express = require('express');

/**
 * @description Router to mount user related functions on.
 * @type {Object}
 * @constant
 */
const API_logoutRouter = express.Router();


/**
 * @description API_logoutController for API_logout route.
 * @type {Object}
 * @constant
 */
const API_logoutController = require('./controllers/API_logout.controller');


/**
 * Route serving .
 * @name get /
 * @description Register the routerController's `logout` function on the API_logoutRouter.
 *    Send the page rendered by HBS from `API_logoutController#logout`.
 */
API_logoutRouter.post('/', API_logoutController.logout);

module.exports = API_logoutRouter;

/**
 * @module routes/API_removeFromCart
 * @fileoverview Root router for `/` based paths.
 * @requires Express
 * @requires routes/controllers/API_removeFromCart
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
const API_removeFromCartRouter = express.Router();


/**
 * @description API_removeFromCartController for API_removeFromCart route.
 * @type {Object}
 * @constant
 */
const API_removeFromCartController = require('./controllers/API_removeFromCart.controller');


/**
 * Route serving .
 * @name get /
 * @description Register the routerController's `removeFromCart` function on the API_removeFromCartRouter.
 *    Send the page rendered by HBS from `API_removeFromCartController#sendAPI_removeFromCart`.
 */
API_removeFromCartRouter.post('/', API_removeFromCartController.removeFromCart);

module.exports = API_removeFromCartRouter;

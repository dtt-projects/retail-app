/**
 * @module routes/API_addToCart
 * @fileoverview Root router for `/` based paths.
 * @requires Express
 * @requires routes/controllers/API_addToCart
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
const API_addToCartRouter = express.Router();


/**
 * @description API_addToCartController for API_addToCart route.
 * @type {Object}
 * @constant
 */
const API_addToCartController = require('./controllers/API_addToCart.controller');


/**
 * Route serving .
 * @name get /
 * @description Register the routerController's `API_addToCart` function on the API_addToCartRouter.
 *    Send the page rendered by HBS from `API_addToCartController#sendAPI_addToCart`.
 */
API_addToCartRouter.post('/', API_addToCartController.addToCart);

module.exports = API_addToCartRouter;

/**
 * @module routes/API_setToCart
 * @fileoverview Root router for `/` based paths.
 * @requires Express
 * @requires routes/controllers/API_setToCart
 * @exports {Express#Router} An Express router instance for the root server path.
 */

/**
 * Express module.
 * @type {Object}
 * @constant
 */
const express = require('express');

/**
 * @description Router to mount cart related functions to
 * @type {Object}
 * @constant
 */
const API_setToCartRouter = express.Router();


/**
 * @description API_addToCartController for API_addToCart route.
 * @type {Object}
 * @constant
 */
const API_setToCartController = require('./controllers/API_setToCart.controller');


/**
 * Route serving .
 * @name get /
 * @description Register the routerController's `API_setToCart` function on the API_setToCartRouter.
 *    Send the page rendered by HBS from `API_setToCartController#setToCart`.
 */
API_setToCartRouter.post('/', API_setToCartController.setToCart);

module.exports = API_setToCartRouter;

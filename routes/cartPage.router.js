/**
 * @module routes/cartPage
 * @fileoverview Root router for `/` based paths.
 * @requires Express
 * @requires routes/controllers/cartPage
 * @exports {Express#Router} An Express router instance for the
 *    cartPage server path.
 */

/**
 * Express module.
 * @type {Object}
 * @constant
 */
const express = require('express');

/**
 * @description cartPageRouter Express router to mount the related functions on.
 * @type {Object}
 * @constant
 */
const cartPageRouter = express.Router();


/**
 * @description Controller for cartPageController route.
 * @type {Object}
 * @constant
 */
const cartPageController = require('./controllers/cartPage.controller');


/**
 * Route serving cartPageRouter page.
 * @name get /
 * @description Register the cartPageRouter `sendCartPage` function on the
 *    cartPageRouter.
 *    Send the cartPage rendered by HBS from `cartPageController#sendCartPage`.
 */
cartPageRouter.get('/', cartPageController.sendCartPage);

module.exports = cartPageRouter;

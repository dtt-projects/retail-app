/**
 * @module routes/root
 * @fileoverview Root router for `/` based paths.
 * @requires Express
 * @requires routes/controllers/root
 * @exports {Express#Router} An Express router instance for the root server path.
 */

/**
 * Express module.
 * @type {Object}
 * @constant
 */
const express = require('express');

/**
 * @description cartPageRouter Express router to mount user related functions on.
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
 * @description Register the cartPageRouter `cartPageController` function on the
 *    loginRouter.
 *    Send the loginPage rendered by HBS from `loginController#sendLoginpage`.
 */
cartPageRouter.get('/', cartPageController.sendCartPage);

module.exports = cartPageRouter;

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
const print_cookiesRouter = express.Router();


/**
 * @description Controller for cartPageController route.
 * @type {Object}
 * @constant
 */
const print_cookiesController = require('./controllers/print_cookies.controller');


/**
 * Route serving cartPageRouter page.
 * @name get /
 * @description Register the cartPageRouter `cartPageController` function on the
 *    loginRouter.
 *    Send the loginPage rendered by HBS from `loginController#sendLoginpage`.
 */
print_cookiesRouter.get('/', print_cookiesController.printDaCookies);

module.exports = print_cookiesRouter;

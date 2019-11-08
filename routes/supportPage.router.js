/**
 * @module routes/supportPage
 * @fileoverview Root router for `/` based paths.
 * @requires Express
 * @requires routes/controllers/supportPage
 * @exports {Express#Router} An Express router instance for the
 *    supportPage server path.
 */

/**
 * Express module.
 * @type {Object}
 * @constant
 */
const express = require('express');

/**
 * @description supportPageRouter to mount support related functions on.
 * @type {Object}
 * @constant
 */
const supportPageRouter = express.Router();


/**
 * @description Controller for supportPage route.
 * @type {Object}
 * @constant
 */
const supportPageController = require('./controllers/supportPage.controller');


/**
 * Route serving supportPageRouter page.
 * @name get /
 * @description Register the supportPageRouter  `sendSupportPage` function
 *    on the supportPageRouter.
 *    Send the supportPage rendered by HBS from `supportPageRouter#sendSupportPage`.
 */
supportPageRouter.get('/', supportPageController.sendSupportPage);

module.exports = supportPageRouter;

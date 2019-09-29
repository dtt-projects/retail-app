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
 * @description supportPageRouter to mount user related functions on.
 * @type {Object}
 * @constant
 */
const supportPageRouter = express.Router();


/**
 * @description supportPageController for supportPageController route.
 * @type {Object}
 * @constant
 */
const supportPageController = require('./controllers/supportPage.controller');


/**
 * Route serving supportPageRouter page.
 * @name get /
 * @description Register the supportPageRouter  `sendsupportPageRouter` function on the
 *    supportPageRouter.
 *    Send the supportPage rendered by HBS from `supportPageRouter#sendsupportPageRouter page`.
 */
supportPageRouter.get('/', supportPageController.sendSupportPage);

module.exports = supportPageRouter;

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
 * @description Express router to mount user related functions on.
 * @type {Object}
 * @constant
 */
const supportPageRouter = express.Router();


/**
 * @description Controller for support route.
 * @type {Object}
 * @constant
 */
const supportPageController = require('./controllers/supportPage.controller');


/**
 * Route serving support page.
 * @name get /
 * @description Register the supportController's `sendSupportPage` function on the
 *    supportRouter.
 *    Send the supportPage rendered by HBS from `supportController#sendSupportpage`.
 */
supportPageRouter.get('/', supportPageController.sendSupportPage);

module.exports = supportPageRouter;

/**
 * @module routes/forgotPasswordPage
 * @fileoverview Root router for `/` based paths.
 * @requires Express
 * @requires routes/controllers/forgotPasswordPage
 * @exports {Express#Router} An Express router instance for the
 *    forgotPasswordPage server path.
 */

/**
 * Express module.
 * @type {Object}
 * @constant
 */
const express = require('express');

/**
 * @description forgotPasswordPageRouter to mount password related functions on.
 * @type {Object}
 * @constant
 */
const forgotPasswordPageRouter = express.Router();


/**
 * @description Controller for forgotPasswordPageController route.
 * @type {Object}
 * @constant
 */
const forgotPasswordPageController = require('./controllers/forgotPasswordPage.controller');


/**
 * Route serving forgotPasswordPageRouter page.
 * @name get /
 * @description Register the forgotPasswordPageRouter Controller's
 *    `sendforgotPasswordPage` function on the
 *    forgotPasswordPageRouter router.
 *    Send the forgotPasswordPage rendered by HBS from
 *    `forgotPasswordPageController#sendForgotPasswordPage`.
 */
forgotPasswordPageRouter.get('/', forgotPasswordPageController.sendForgotPasswordPage);

module.exports = forgotPasswordPageRouter;

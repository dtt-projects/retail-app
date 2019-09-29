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
 * @description forgotPasswordRouter to mount user related functions on.
 * @type {Object}
 * @constant
 */
const forgotPasswordRouter = express.Router();


/**
 * @description Controller for forgotPasswordController route.
 * @type {Object}
 * @constant
 */
const forgotPasswordController = require('./controllers/forgotPassword.controller');


/**
 * Route serving forgotPasswordRouter page.
 * @name get /
 * @description Register the forgotPasswordRouter Controller's `sendforgotPasswordRouter Page` function on the
 *    forgotPasswordRouter router.
 *    Send the loginPage rendered by HBS from `loginController#sendLoginpage`.
 */
forgotPasswordRouter.get('/', forgotPasswordController.sendForgotPasswordPage);

module.exports = forgotPasswordRouter;

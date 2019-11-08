/**
 * @module routes/loginPage
 * @fileoverview Root router for `/` based paths.
 * @requires Express
 * @requires routes/controllers/loginPage
 * @exports {Express#Router} An Express router instance for the
 *    loginPage server path.
 */

/**
 * Express module.
 * @type {Object}
 * @constant
 */
const express = require('express');

/**
 * @description loginPageRouter to mount user related functions on.
 * @type {Object}
 * @constant
 */
const loginPageRouter = express.Router();


/**
 * @description Controller for loginPageController route.
 * @type {Object}
 * @constant
 */
const loginPageController = require('./controllers/loginPage.controller');


/**
 * Route serving loginPageRouter page.
 * @name get /
 * @description Register the loginPageRouter's `sendLoginPage` function on the
 *    loginPageRouter.
 *    Send the loginPageRouter rendered by HBS from
 *    `loginPageController#sendloginPage`.
 */
loginPageRouter.get('/', loginPageController.sendLoginPage);

module.exports = loginPageRouter;

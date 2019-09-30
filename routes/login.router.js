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
 * @description loginRouter to mount user related functions on.
 * @type {Object}
 * @constant
 */
const loginRouter = express.Router();


/**
 * @description Controller for loginController route.
 * @type {Object}
 * @constant
 */
const loginController = require('./controllers/login.controller');


/**
 * Route serving loginRouter page.
 * @name get /
 * @description Register the loginRouter's `sendloginRouter` function on the
 *    loginRouter.
 *    Send the loginRouter rendered by HBS from `loginController#sendloginRouter page`.
 */
loginRouter.get('/', loginController.sendLoginPage);

module.exports = loginRouter;

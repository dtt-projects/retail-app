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
 * @description checkOutPageRouter to mount user related functions on.
 * @type {Object}
 * @constant
 */
const checkOutPageRouter = express.Router();


/**
 * @description Controller for checkOutPageController route.
 * @type {Object}
 * @constant
 */
const checkOutPageController = require('./controllers/checkOutPage.controller');


/**
 * Route serving checkOutPageRouter page.
 * @name get /
 * @description Register the loginController's `checkOutPageRouter` function on the
 *    checkOutPage Router.
 *    Send the checkOutPageRouter rendered by HBS from `checkOutPageRouterController#sendcheckOutPage`.
 */
checkOutPageRouter.get('/', checkOutPageController.sendCheckOutPage);

module.exports = checkOutPageRouter;

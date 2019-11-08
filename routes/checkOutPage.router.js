/**
 * @module routes/checkOutPage
 * @fileoverview Root router for `/` based paths.
 * @requires Express
 * @requires routes/controllers/checkOutPage
 * @exports {Express#Router} An Express router instance for the
 *    checkOutPage server path.
 */

/**
 * Express module.
 * @type {Object}
 * @constant
 */
const express = require('express');

/**
 * @description checkOutPageRouter to mount the related functions on.
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
 * @description Register the checkOutPageController's `checkOutPage`
 *    function on the checkOutPage Router.
 *    Send the checkOutPage rendered by HBS from
 *    `checkOutPageController#sendCheckOutPage`.
 */
checkOutPageRouter.get('/', checkOutPageController.sendCheckOutPage);

module.exports = checkOutPageRouter;

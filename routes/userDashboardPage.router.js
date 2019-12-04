/**
 * @module routes/userDashboardPage
 * @fileoverview Root router for `/` based paths.
 * @requires Express
 * @requires routes/controllers/userDashboardPage
 * @exports {Express#Router} An Express router instance for the root server path.
 */

/**
 * Express module.
 * @type {Object}
 * @constant
 */
const express = require('express');

/**
 * @description userDashboardRouter to mount user related functions on.
 * @type {Object}
 * @constant
 */
const userDashboardPageRouter = express.Router();


/**
 * @description Controller for userDashboardPageController route.
 * @type {Object}
 * @constant
 */
const userDashboardPageController = require('./controllers/userDashboardPage.controller');


/**
 * Route serving usesrDashboardPageRouter page.
 * @name get /
 * @description Register the userDashboardPageRouter `senduserDashboardPage`
 *    function on the userDashboardPageRouter.
 *    Send the userDashboardPageRouter rendered by HBS from `
 *    userDashboardPageRouter#senduserDashboardPage`.
 */
userDashboardPageRouter.get('/', userDashboardPageController.sendUserDashboardPage);

module.exports = userDashboardPageRouter;

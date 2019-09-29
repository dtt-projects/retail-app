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
 * @description userDashboarrdRouter to mount user related functions on.
 * @type {Object}
 * @constant
 */
const userDashboardRouter = express.Router();


/**
 * @description Controller for userDashboardController route.
 * @type {Object}
 * @constant
 */
const userDashboardController = require('./controllers/userDashboard.controller');


/**
 * Route serving usesrDashboardRouter page.
 * @name get /
 * @description Register the userDashboardRouter `senduserDashboardRouter` function on the
 *    userDashboardRouter.
 *    Send the userDashboardRouter rendered by HBS from `userDashboardRouter#senduserDashboardRouterpage`.
 */
userDashboardRouter.get('/', userDashboardController.sendUserDashboardPage);

module.exports = userDashboardRouter;

/**
 * @module routes/userDashboardViewOrdersPage
 * @fileoverview Root router for `/` based paths.
 * @requires Express
 * @requires routes/controllers/userDashboardViewOrdersPage
 * @exports {Express#Router} An Express router instance for the
 *    userDashboardViewOrdersPage server path.
 */

/**
 * Express module.
 * @type {Object}
 * @constant
 */
const express = require('express');

/**
 * @description userDashboardViewOrdersPageRouter to mount user related functions on.
 * @type {Object}
 * @constant
 */
const userDashboardViewOrdersPageRouter = express.Router();


/**
 * @description Controller for userDashboardViewOrdersPageController route.
 * @type {Object}
 * @constant
 */
const userDashboardViewOrdersPageController = require('./controllers/userDashboardViewOrdersPage.controller');


/**
 * Route serving usesrDashboardViewOrdersPageRouter page.
 * @name get /
 * @description Register the userDashboardViewOrdersPageRouter
 *    `sendUserDashboardViewOrdersPage` function on the
 *    userDashboardViewOrdersPageRouter.
 *    Send the userDashboardViewOrdersPageRouter rendered by HBS from
 *    `userDashboardViewOrdersPageRouter#sendUserDashboardViewOrdersPage`.
 */
userDashboardViewOrdersPageRouter.get('/', userDashboardViewOrdersPageController.sendUserDashboardViewOrdersPage);

module.exports = userDashboardViewOrdersPageRouter;

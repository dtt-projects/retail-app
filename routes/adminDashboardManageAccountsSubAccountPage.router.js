/**
 * @module routes/adminDashboardManageAccountsSubAccountPage
 * @fileoverview Root router for `/` based paths.
 * @requires Express
 * @requires routes/controllers/adminDashboardManageAccountsSubAccountPage
 * @exports {Express#Router} An Express router instance for the root server path.
 */

/**
 * Express module.
 * @type {Object}
 * @constant
 */
const express = require('express');

/**
 * @description Router to mount user related functions on.
 * @type {Object}
 * @constant
 */
const adminDashboardManageAccountsSubAccountPageRouter = express.Router();


/**
 * @description adminDashboardManageAccountsSubAccountPageController for adminDashboardManageAccountsSubAccountPage route.
 * @type {Object}
 * @constant
 */
const adminDashboardManageAccountsSubAccountPageController = require('./controllers/adminDashboardManageAccountsSubAccountPage.controller');


/**
 * Route serving .
 * @name get /
 * @description Register the routerController's `AdminDashboardManageAccountsSubAccountPage` function on the adminDashboardManageAccountsSubAccountPageRouter.
 *    Send the page rendered by HBS from `adminDashboardManageAccountsSubAccountPageController#sendAdminDashboardManageAccountsSubAccountPage`.
 */
adminDashboardManageAccountsSubAccountPageRouter.get('/', adminDashboardManageAccountsSubAccountPageController.sendAdminDashboardManageAccountsSubAccountPage);

module.exports = adminDashboardManageAccountsSubAccountPageRouter;

/**
 * @module routes/adminDashboardManageAccountsCreateAccountPage
 * @fileoverview Root router for `/` based paths.
 * @requires Express
 * @requires routes/controllers/adminDashboardManageAccountsCreateAccountPage
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
const adminDashboardManageAccountsCreateAccountPageRouter = express.Router();


/**
 * @description adminDashboardManageAccountsCreateAccountPageController for adminDashboardManageAccountsCreateAccountPage route.
 * @type {Object}
 * @constant
 */
const adminDashboardManageAccountsCreateAccountPageController = require('./controllers/adminDashboardManageAccountsCreateAccountPage.controller');


/**
 * Route serving .
 * @name get /
 * @description Register the routerController's `AdminDashboardManageAccountsCreateAccountPage` function on the adminDashboardManageAccountsCreateAccountPageRouter.
 *    Send the page rendered by HBS from `adminDashboardManageAccountsCreateAccountPageController#sendAdminDashboardManageAccountsCreateAccountPage`.
 */
adminDashboardManageAccountsCreateAccountPageRouter.get('/', adminDashboardManageAccountsCreateAccountPageController.sendAdminDashboardManageAccountsCreateAccountPage);

module.exports = adminDashboardManageAccountsCreateAccountPageRouter;

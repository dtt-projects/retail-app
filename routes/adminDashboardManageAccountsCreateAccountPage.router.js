/**
 * @module routes/adminDashboardManageAccountsCreateAccountPage
 * @fileoverview Root router for `/` based paths.
 * @requires Express
 * @requires routes/controllers/adminDashboardManageAccountsPage
 * @exports {Express#Router} An Express router instance for the
 *    adminDashboardManageAccountsPage server path.
 */

/**
 * Express module.
 * @type {Object}
 * @constant
 */
const express = require('express');

/**
 * @description adminDashboardManageAccountsCreateAccountPageRouter router to mount
 *    the related functions on.
 * @type {Object}
 * @constant
 */
const adminDashboardManageAccountsCreateAccountPageRouter = express.Router();


/**
 * @description Controller for adminDashboardManageAccountsCreateAccountPage route.
 * @type {Object}
 * @constant
 */
const adminDashboardManageAccountsCreateAccountPageController = require('./controllers/adminDashboardManageAccountsCreateAccountPage.controller');


/**
 * Route serving adminDashboardManageAccountsCreateAccountPageRouter page.
 * @name get /
 * @description Register the adminDashboardManageAccountsCreateAccountPageRouter Controller's
 *    `sendAdminDashboardManageAccountsCreateAccountPage` function on the
 *    adminDashboardManageAccountsCreateAccountPageRouter.
 *    Send the adminDashboardManageAccountsCreateAccountPage rendered by HBS from
 *    `adminDashboardManageAccountsCreateAccountPageController#sendAdminDashboardManageAccountsSubAccountPage`.
 */
adminDashboardManageAccountsCreateAccountPageRouter.get('/', adminDashboardManageAccountsCreateAccountPageController.sendAdminDashboardManageAccountCreateAccountPage);

module.exports = adminDashboardManageAccountsCreateAccountPageRouter;

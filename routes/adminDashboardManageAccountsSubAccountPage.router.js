/**
 * @module routes/adminDashboardManageAccountsSubAccountPage
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
 * @description adminDashboardManageAccountsSubAccountPageRouter router to mount
 *    the related functions on.
 * @type {Object}
 * @constant
 */
const adminDashboardManageAccountsSubAccountPageRouter = express.Router();


/**
 * @description Controller for adminDashboardManageAccountsSubAccountPage route.
 * @type {Object}
 * @constant
 */
const adminDashboardManageAccountsSubAccountPageController = require('./controllers/adminDashboardManageAccountsSubAccountPage.controller');


/**
 * Route serving adminDashboardManageAccountsSubAccountPageRouter page.
 * @name get /
 * @description Register the adminDashboardManageAccountsSubAccountPageRouter Controller's
 *    `sendAdminDashboardManageAccountsSubAccountPage` function on the
 *    adminDashboardManageAccountsSubAccountPageRouter.
 *    Send the adminDashboardManageAccountsSubAccountPage rendered by HBS from
 *    `adminDashboardManageAccountsSubAccountPageController#sendAdminDashboardManageAccountsSubAccountPage`.
 */
adminDashboardManageAccountsSubAccountPageRouter.get('/', adminDashboardManageAccountsSubAccountPageController.sendAdminDashboardManageAccountsSubAccountPage);

module.exports = adminDashboardManageAccountsSubAccountPageRouter;

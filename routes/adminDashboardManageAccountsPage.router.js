/**
 * @module routes/adminDashboardManageAccountsPage
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
 * @description adminDashboardManageAccountsPageRouter router to mount
 *    the related functions on.
 * @type {Object}
 * @constant
 */
const adminDashboardManageAccountsPageRouter = express.Router();


/**
 * @description Controller for adminDashboardManageAccountsPage route.
 * @type {Object}
 * @constant
 */
const adminDashboardManageAccountsPageController = require('./controllers/adminDashboardManageAccountsPage.controller');


/**
 * Route serving adminDashboardManageAccountsPageRouter page.
 * @name get /
 * @description Register the adminDashboardManageAccountsPageRouter Controller's
 *    `sendAdminDashboardManageAccountsPage` function on the
 *    adminDashboardManageAccountsPageRouter.
 *    Send the adminDashboardManageAccountsPage rendered by HBS from
 *    `adminDashboardManageAccountsPageController#sendAdminDashboardManageAccountsPage`.
 */
adminDashboardManageAccountsPageRouter.get('/', adminDashboardManageAccountsPageController.sendAdminDashboardManageAccountsPage);

module.exports = adminDashboardManageAccountsPageRouter;

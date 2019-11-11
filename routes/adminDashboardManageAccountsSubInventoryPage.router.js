/**
 * @module routes/adminDashboardManageAccountsSubInventoryPage
 * @fileoverview Root router for `/` based paths.
 * @requires Express
 * @requires routes/controllers/adminDashboardManageAccountsSubInventoryPage
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
 * @description adminDashboardManageAccountsSubInventoryPageRouter router to mount
 *    the related functions on.
 * @type {Object}
 * @constant
 */
const adminDashboardManageAccountsSubInventoryPageRouter = express.Router();


/**
 * @description Controller for adminDashboardManageAccountsSubInventoryPage route.
 * @type {Object}
 * @constant
 */
const adminDashboardManageAccountsSubInventoryPageController = require('./controllers/adminDashboardManageAccountsSubInventoryPage.controller');


/**
 * Route serving adminDashboardManageAccountsCreateAccountPageRouter page.
 * @name get /
 * @description Register the adminDashboardManageAccountsSubInventoryPageRouter Controller's
 *    `sendAdminDashboardManageAccountsSubInventoryPage` function on the
 *    adminDashboardManageAccountsSubInventoryPageRouter.
 *    Send the adminDashboardManageAccountsSubInventoryPage rendered by HBS from
 *    `adminDashboardManageAccountsSubInventoryPageController#sendAdminDashboardManageAccountsSubAccountPage`.
 */
adminDashboardManageAccountsSubInventoryPageRouter.get('/', adminDashboardManageAccountsSubInventoryPageController.sendAdminDashboardManageAccountSubInventoryPage);

module.exports = adminDashboardManageAccountsSubInventoryPageRouter;

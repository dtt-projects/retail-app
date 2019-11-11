/**
 * @module routes/adminDashboardManageAccountsCreateInventoryPage
 * @fileoverview Root router for `/` based paths.
 * @requires Express
 * @requires routes/controllers/adminDashboardManageAccountsCreateInventoryPage
 * @exports {Express#Router} An Express router instance for the
 *    adminDashboardManageAccountsCreateInventoryPage server path.
 */

/**
 * Express module.
 * @type {Object}
 * @constant
 */
const express = require('express');

/**
 * @description adminDashboardManageAccountsCreateInventoryPageRouter router to mount
 *    the related functions on.
 * @type {Object}
 * @constant
 */
const adminDashboardManageAccountsCreateInventoryPageRouter = express.Router();


/**
 * @description Controller for adminDashboardManageAccountsCreateInventoryPage route.
 * @type {Object}
 * @constant
 */
const adminDashboardManageAccountsCreateInventoryPageController = require('./controllers/adminDashboardManageAccountsCreateInventoryPage.controller');


/**
 * Route serving adminDashboardManageAccountsCreateInventoryPageRouter page.
 * @name get /
 * @description Register the adminDashboardManageAccountsCreateInventoryPageRouter Controller's
 *    `sendAdminDashboardManageAccountsCreateInventoryPage` function on the
 *    adminDashboardManageAccountsCreateInventoryPageRouter.
 *    Send the adminDashboardManageAccountsCreateInventoryPage rendered by HBS from
 *    `adminDashboardManageAccountsCreateInventoryPageController#sendAdminDashboardManageAccountsCreateInventoryPage`.
 */
adminDashboardManageAccountsCreateInventoryPageRouter.get('/', adminDashboardManageAccountsCreateInventoryPageController.sendAdminDashboardManageAccountCreateInventoryPage);

module.exports = adminDashboardManageAccountsCreateInventoryPageRouter;

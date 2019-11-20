/**
 * @module routes/adminDashboardManageInventoryCreateInventoryPage
 * @fileoverview Root router for `/` based paths.
 * @requires Express
 * @requires routes/controllers/adminDashboardManageInventoryCreateInventoryPage
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
const adminDashboardManageInventoryCreateInventoryPageRouter = express.Router();


/**
 * @description adminDashboardManageInventoryCreateInventoryPageController for adminDashboardManageInventoryCreateInventoryPage route.
 * @type {Object}
 * @constant
 */
const adminDashboardManageInventoryCreateInventoryPageController = require('./controllers/adminDashboardManageInventoryCreateInventoryPage.controller');


/**
 * Route serving .
 * @name get /
 * @description Register the routerController's `AdminDashboardManageInventoryCreateInventoryPage` function on the adminDashboardManageInventoryCreateInventoryPageRouter.
 *    Send the page rendered by HBS from `adminDashboardManageInventoryCreateInventoryPageController#sendAdminDashboardManageInventoryCreateInventoryPage`.
 */
adminDashboardManageInventoryCreateInventoryPageRouter.get('/', adminDashboardManageInventoryCreateInventoryPageController.sendAdminDashboardManageInventoryCreateInventoryPage);

module.exports = adminDashboardManageInventoryCreateInventoryPageRouter;

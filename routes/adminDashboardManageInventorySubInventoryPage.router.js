/**
 * @module routes/adminDashboardManageInventorySubInventoryPage
 * @fileoverview Root router for `/` based paths.
 * @requires Express
 * @requires routes/controllers/adminDashboardManageInventorySubInventoryPage
 * @exports {Express#Router} An Express router instance for the root server path.
 */

/**
 * Express module.
 * @type {Object}
 * @constant
 */
const express = require('express');

/**
 * @description Router to mount subInventoryPage related functions on.
 * @type {Object}
 * @constant
 */
const adminDashboardManageInventorySubInventoryPageRouter = express.Router();


/**
 * @description adminDashboardManageInventorySubInventoryPageController for adminDashboardManageInventorySubInventoryPage route.
 * @type {Object}
 * @constant
 */
const adminDashboardManageInventorySubInventoryPageController = require('./controllers/adminDashboardManageInventorySubInventoryPage.controller');


/**
 * Route serving .
 * @name get /
 * @description Register the routerController's `AdminDashboardManageInventorySubInventoryPage` function on the adminDashboardManageInventorySubInventoryPageRouter.
 *    Send the page rendered by HBS from `adminDashboardManageInventorySubInventoryPageController#sendAdminDashboardManageInventorySubInventoryPage`.
 */
adminDashboardManageInventorySubInventoryPageRouter.get('/', adminDashboardManageInventorySubInventoryPageController.sendAdminDashboardManageInventorySubInventoryPage);

module.exports = adminDashboardManageInventorySubInventoryPageRouter;

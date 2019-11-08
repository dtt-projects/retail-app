/**
 * @module routes/adminDashboardManageInventoryPage
 * @fileoverview Root router for `/` based paths.
 * @requires Express
 * @requires routes/controllers/adminDashboardManageInventoryPage
 * @exports {Express#Router} An Express router instance for the
 *    adminDashboardManageInventoryPage server path.
 */

/**
 * Express module.
 * @type {Object}
 * @constant
 */
const express = require('express');

/**
 * @description adminDashboardManageInventoryPageRouter router to mount
 *    the related functions on.
 * @type {Object}
 * @constant
 */
const adminDashboardManageInventoryPageRouter = express.Router();


/**
 * @description Controller for adminDashboardManageInventoryPageController route.
 * @type {Object}
 * @constant
 */
const adminDashboardManageInventoryPageController = require('./controllers/adminDashboardManageInventoryPage.controller');


/**
 * Route serving adminDashboardManageInventoryPageRouter page.
 * @name get /
 * @description Register the adminDashboardManageInventoryPage Controller's
 *    `sendAdminDashboardManageInventoryPage` function on the
 *    adminDashboardManageInventoryPageRouter.
 *    Send the adminDashboardManageInventoryPage rendered by HBS from
 *    `adminDashboardManageInventoryPageController#sendAdminDashboardManageInventoryPage`.
 */
adminDashboardManageInventoryPageRouter.get('/', adminDashboardManageInventoryPageController.sendAdminDashboardManageInventoryPage);

module.exports = adminDashboardManageInventoryPageRouter;

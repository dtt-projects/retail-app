/**
 * @module routes/adminDashboardManageOrdersSubOrderPage
 * @fileoverview Root router for `/` based paths.
 * @requires Express
 * @requires routes/controllers/adminDashboardManageOrdersSubOrderPage
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
const adminDashboardManageOrdersSubOrderPageRouter = express.Router();


/**
 * @description adminDashboardManageOrdersSubOrderPageController for adminDashboardManageOrdersSubOrderPage route.
 * @type {Object}
 * @constant
 */
const adminDashboardManageOrdersSubOrderPageController = require('./controllers/adminDashboardManageOrdersSubOrderPage.controller');


/**
 * Route serving .
 * @name get /
 * @description Register the routerController's `AdminDashboardManageOrdersSubOrderPage` function on the adminDashboardManageOrdersSubOrderPageRouter.
 *    Send the page rendered by HBS from `adminDashboardManageOrdersSubOrderPageController#sendAdminDashboardManageOrdersSubOrderPage`.
 */
adminDashboardManageOrdersSubOrderPageRouter.get('/', adminDashboardManageOrdersSubOrderPageController.sendAdminDashboardManageOrdersSubOrderPage);

module.exports = adminDashboardManageOrdersSubOrderPageRouter;

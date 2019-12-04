/**
 * @module routes/adminDashboardManageOrdersPage
 * @fileoverview Root router for `/` based paths.
 * @requires Express
 * @requires routes/controllers/adminDashboardManageOrdersPage
 * @exports {Express#Router} An Express router instance for the
 *    adminDashboardManageOrdersPage server path.
 */

/**
 * Express module.
 * @type {Object}
 * @constant
 */
const express = require('express');

/**
 * @description adminDashboardManageOrdersPageRouter router to mount
 *    the related functions on.
 * @type {Object}
 * @constant
 */
const adminDashboardManageOrdersPageRouter = express.Router();


/**
 * @description Controller for adminDashboardManageOrdersPageController route.
 * @type {Object}
 * @constant
 */
const adminDashboardManageOrdersPageController = require('./controllers/adminDashboardManageOrdersPage.controller');


/**
 * Route serving adminDashboardManageOrdersPageRouter page.
 * @name get /
 * @description Register the adminDashboardManageOrdersPageRouter Controller's
 *    `sendAdminDashboardManageOrdersPage` function on the
 *    adminDashboardManageOrdersPageRouter.
 *    Send the adminDashboardManageOrdersPage rendered by HBS from
 *    `adminDashboardManageOrdersPageController#sendAdminDashboardManageOrdersPage`.
 */
adminDashboardManageOrdersPageRouter.get('/', adminDashboardManageOrdersPageController.sendAdminDashboardManageOrdersPage);

module.exports = adminDashboardManageOrdersPageRouter;

/**
 * @module routes/root
 * @fileoverview Root router for `/` based paths.
 * @requires Express
 * @requires routes/controllers/root
 * @exports {Express#Router} An Express router instance for the root server path.
 */

/**
 * Express module.
 * @type {Object}
 * @constant
 */
const express = require('express');

/**
 * @description adminDashboardRouter router to mount user related functions on.
 * @type {Object}
 * @constant
 */
const adminDashboardManageAccountsRouter = express.Router();


/**
 * @description Controller for adminDashboardController route.
 * @type {Object}
 * @constant
 */
const adminDashboardManageAccountsController = require('./controllers/adminDashboardManageAccounts.controller');


/**
 * Route serving adminDashboardRouter page.
 * @name get /
 * @description Register the adminDashboardRouter Controller's `sendAdminDashboardPage` function on the
 *    loginRouter.
 *    Send the loginPage rendered by HBS from `loginController#sendLoginpage`.
 */
adminDashboardManageAccountsRouter.get('/', adminDashboardManageAccountsController.sendAdminDashboardManageAccountsPage);

module.exports = adminDashboardManageAccountsRouter;

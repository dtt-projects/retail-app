/**
 * @module routes/adminDashboardPage
 * @fileoverview Root router for `/` based paths.
 * @requires Express
 * @requires routes/controllers/adminDashboardPage
 * @exports {Express#Router} An Express router instance for the
 *    adminDashboardPage server path.
 */

/**
 * Express module.
 * @type {Object}
 * @constant
 */
const express = require('express');

/**
 * @description adminDashboardRouter router to mount the related functions on.
 * @type {Object}
 * @constant
 */
const adminDashboardPageRouter = express.Router();


/**
 * @description Controller for adminDashboardPageController route.
 * @type {Object}
 * @constant
 */
const adminDashboardPageController = require('./controllers/adminDashboardPage.controller');


/**
 * Route serving adminDashboardPageRouter page.
 * @name get /
 * @description Register the adminDashboardPageRouter Controller's
 *    `sendAdminDashboardPage` function on the adminDashboardPageRouter.
 *    Send the adminDashboardPage rendered by HBS from
 *    `adminDashboardPageController#sendAdminDashboardPage`.
 */
adminDashboardPageRouter.get('/', adminDashboardPageController.sendAdminDashboardPage);

module.exports = adminDashboardPageRouter;

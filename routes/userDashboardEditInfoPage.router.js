/**
 * @module routes/userDashboardEditInfoPage
 * @fileoverview Root router for `/` based paths.
 * @requires Express
 * @requires routes/controllers/userDashboardEditInfoPage
 * @exports {Express#Router} An Express router instance for the
 *    userDashboardEditInfoPage server path.
 */

/**
 * Express module.
 * @type {Object}
 * @constant
 */
const express = require('express');

/**
 * @description userDashboardEditInfoPageRouter to mount user related functions on.
 * @type {Object}
 * @constant
 */
const userDashboardEditInfoPageRouter = express.Router();


/**
 * @description Controller for userDashboardEditInfoPageController route.
 * @type {Object}
 * @constant
 */
const userDashboardEditInfoPageController = require('./controllers/userDashboardEditInfoPage.controller');


/**
 * Route serving userDashboardEditInfoPageRouter page.
 * @name get /
 * @description Register the userDashboardEditInfoPageRouter
 *    `sendUserDashboardEditInfoPage` function on the
 *    userDashboardEditInfoPageRouter.
 *    Send the userDashboardEditInfoPageRouter rendered by HBS from
 *    `userDashboardEditInfoPageRouter#sendUserDashboardEditInfoPage`.
 */
userDashboardEditInfoPageRouter.get('/', userDashboardEditInfoPageController.sendUserDashboardEditInfoPage);

module.exports = userDashboardEditInfoPageRouter;

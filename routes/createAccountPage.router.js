/**
 * @module routes/createAccountPage
 * @fileoverview Root router for `/` based paths.
 * @requires Express
 * @requires routes/controllers/createAccountPage
 * @exports {Express#Router} An Express router instance for the
 *    createAccountPage server path.
 */

/**
 * Express module.
 * @type {Object}
 * @constant
 */
const express = require('express');

/**
 * @description createAccountPageRouter for createAccountPage
 * @type {Object}
 * @constant
 */
const createAccountPageRouter = express.Router();


/**
 * @description Controller for createAccountPageController route.
 * @type {Object}
 * @constant
 */
const createAccountPageController = require('./controllers/createAccountPage.controller');


/**
 * Route serving createAccountPageRouter page.
 * @name get /
 * @description Register the createAccountPageRouter Controller's
 *    `sendCreateAccountPage` function on the
 *    createAccountPageRouter router.
 *    Send the sendCreateAccountPage rendered by HBS from
 *    `createAccountController#sendCreateAccountPage`.
 */
createAccountPageRouter.get('/', createAccountPageController.sendCreateAccountPage);

module.exports = createAccountPageRouter;

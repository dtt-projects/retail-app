/**
 * @module routes/createAccount
 * @fileoverview Root router for `/` based paths.
 * @requires Express
 * @requires routes/controllers/createAccount
 * @exports {Express#Router} An Express router instance for the root server path.
 */

/**
 * Express module.
 * @type {Object}
 * @constant
 */
const express = require('express');

/**
 * @description createAccountRouter for createAccount page
 * @type {Object}
 * @constant
 */
const createAccountRouter = express.Router();


/**
 * @description Controller for createAccountController route.
 * @type {Object}
 * @constant
 */
const createAccountController = require('./controllers/createAccount.controller');


/**
 * Route serving createAccountRouter page.
 * @name get /
 * @description Register the createAccountRouter Controller's
 *    `sendCreateAccountPage Page` function on the
 *    createAccountRouter router.
 *    Send the sendCreateAccountPage rendered by HBS from
 *    `createAccountController#sendCreateAccountPage`.
 */
createAccountRouter.get('/', createAccountController.sendCreateAccountPage);

module.exports = createAccountRouter;

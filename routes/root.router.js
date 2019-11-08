/**
 * @module routes/rootPage
 * @fileoverview Root router for `/` based paths.
 * @requires Express
 * @requires routes/controllers/rootPage
 * @exports {Express#Router} An Express router instance for the rootPage server path.
 */

/**
 * Express module.
 * @type {Object}
 * @constant
 */
const express = require('express');

/**
 * @description Router to mount root related functions on.
 * @type {Object}
 * @constant
 */
const routerPage = express.Router();


/**
 * @description rootPageController for root route.
 * @type {Object}
 * @constant
 */
const rootPageController = require('./controllers/root.controller');


/**
 * Route serving homepage.
 * @name get /
 * @description Register the routerController's `sendHomepage` function
 *    on the rootPageRouter. Send the homepage rendered by HBS
 *    from `rootPageController#sendHomepage`.
 */
routerPage.get('/', rootPageController.sendHomePage);

module.exports = routerPage;

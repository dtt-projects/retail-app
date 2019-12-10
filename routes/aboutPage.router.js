/**
 * @module routes/aboutPage
 * @fileoverview Root router for `/` based paths.
 * @requires Express
 * @requires routes/controllers/aboutPage
 * @exports {Express#Router} An Express router instance for the
 *    aboutPage server path.
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
const aboutPageRouter = express.Router();


/**
 * @description aboutPageController for aboutPage route.
 * @type {Object}
 * @constant
 */
const aboutPageController = require('./controllers/aboutPage.controller');


/**
 * Route serving .
 * @name get /
 * @description Register the routerController's `sendAboutPage` function on the aboutPageRouter.
 *    Send the page rendered by HBS from `aboutPageController#sendAboutPage`.
 */
aboutPageRouter.get('/', aboutPageController.sendAboutPage);

module.exports = aboutPageRouter;

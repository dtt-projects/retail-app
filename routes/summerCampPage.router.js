/**
 * @module routes/summerCampPage
 * @fileoverview Root router for `/` based paths.
 * @requires Express
 * @requires routes/controllers/summerCampPage
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
const summerCampPageRouter = express.Router();


/**
 * @description summerCampPageController for summerCampPage route.
 * @type {Object}
 * @constant
 */
const summerCampPageController = require('./controllers/summerCampPage.controller');


/**
 * Route serving .
 * @name get /
 * @description Register the routerController's `sendSummerCampPage` function on the summerCampPageRouter.
 *    Send the page rendered by HBS from `summerCampPageController#sendSummerCampPage`.
 */
summerCampPageRouter.get('/', summerCampPageController.sendSummerCampPage);

module.exports = summerCampPageRouter;

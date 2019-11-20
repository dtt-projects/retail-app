/**
 * @module routes/visitTheFarmPage
 * @fileoverview Root router for `/` based paths.
 * @requires Express
 * @requires routes/controllers/visitTheFarmPage
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
const visitTheFarmPageRouter = express.Router();


/**
 * @description visitTheFarmPageController for visitTheFarmPage route.
 * @type {Object}
 * @constant
 */
const visitTheFarmPageController = require('./controllers/visitTheFarmPage.controller');


/**
 * Route serving .
 * @name get /
 * @description Register the routerController's `sendVisitTheFarmPage` function on the visitTheFarmPageRouter.
 *    Send the page rendered by HBS from `visitTheFarmPageController#sendVisitTheFarmPage`.
 */
visitTheFarmPageRouter.get('/', visitTheFarmPageController.sendVisitTheFarmPage);

module.exports = visitTheFarmPageRouter;

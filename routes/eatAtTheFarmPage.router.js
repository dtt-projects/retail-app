/**
 * @module routes/eatAtTheFarmPage
 * @fileoverview Root router for `/` based paths.
 * @requires Express
 * @requires routes/controllers/eatAtTheFarmPage
 * @exports {Express#Router} An Express router instance for the
 *    eatAtTheFarmPage server path.
 */

/**
 * Express module.
 * @type {Object}
 * @constant
 */
const express = require('express');

/**
 * @description eatAtTheFarmPageRouter to mount the related functions on.
 * @type {Object}
 * @constant
 */
const eatAtTheFarmPageRouter = express.Router();


/**
 * @description Controller for eatAtTheFarmPageController route.
 * @type {Object}
 * @constant
 */
const eatAtTheFarmPageController = require('./controllers/eatAtTheFarmPage.controller');


/**
 * Route serving eatAtTheFarmPageRouter page.
 * @name get /
 * @description Register the eatAtTheFarmPageRouter Controller's
 *    `sendeatAtTheFarmPage` function on the eatAtTheFarmPageRouter Router.
 *    Send the eatAtTheFarmPageRouter Page rendered by HBS from
 *    `eatAtTheFarmPageController#sendEatAtTheFarmPage`.
 */
eatAtTheFarmPageRouter.get('/', eatAtTheFarmPageController.sendEatAtTheFarmPage);

module.exports = eatAtTheFarmPageRouter;

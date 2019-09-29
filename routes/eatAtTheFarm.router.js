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
 * @description eatAtTheFarmRouter to mount user related functions on.
 * @type {Object}
 * @constant
 */
const eatAtTheFarmRouter = express.Router();


/**
 * @description Controller for eatAtTheFarmController route.
 * @type {Object}
 * @constant
 */
const eatAtTheFarmController = require('./controllers/eatAtTheFarm.controller');


/**
 * Route serving eatAtTheFarmRouter page.
 * @name get /
 * @description Register the eatAtTheFarmRouter Controller's `sendeatAtTheFarmRouterPage` function on the
 *    eatAtTheFarmRouter Router.
 *    Send the eatAtTheFarmRouter Page rendered by HBS from `eatAtTheFarmRouter Controller#sendeatAtTheFarmRouter page`.
 */
eatAtTheFarmRouter.get('/', eatAtTheFarmController.sendeatAtTheFarmPage);

module.exports = eatAtTheFarmRouter;

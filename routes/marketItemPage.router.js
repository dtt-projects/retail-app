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
 * @description marketPageRouter to mount user related functions on.
 * @type {Object}
 * @constant
 */
const marketItemPageRouter = express.Router();


/**
 * @description marketPageController for marketPageController route.
 * @type {Object}
 * @constant
 */
const marketItemPageController = require('./controllers/marketItemPage.controller');


/**
 * Route serving marketPageRouter page.
 * @name get /
 * @description Register the marketPageRouter Controller's `sendmarketPageRouterPage` function on the
 *    marketPageRouter.
 *    Send the marketPageRouter rendered by HBS from `marketPageRouterController#sendmarketPageRouterControllerpage`.
 */
marketItemPageRouter.get('/', marketItemPageController.sendMarketItemPage);

module.exports = marketItemPageRouter;

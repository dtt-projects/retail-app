/**
 * @module routes/marketPage
 * @fileoverview Root router for `/` based paths.
 * @requires Express
 * @requires routes/controllers/marketPage
 * @exports {Express#Router} An Express router instance for the
 *    marketPage server path.
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
const marketPageRouter = express.Router();


/**
 * @description marketPageController for marketPageController route.
 * @type {Object}
 * @constant
 */
const marketPageController = require('./controllers/marketPage.controller');


/**
 * Route serving marketPageRouter page.
 * @name get /
 * @description Register the marketPageRouter Controller's `sendmarketPagePage`
 *    function on the marketPageRouter.
 *    Send the marketPageRouter rendered by HBS from
 *    `marketPageRouterr#sendMarketPage`.
 */
marketPageRouter.get('/', marketPageController.sendMarketPage);

module.exports = marketPageRouter;

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
 * @description Express router to mount user related functions on.
 * @type {Object}
 * @constant
 */
const router = express.Router();


/**
 * @description Controller for root route.
 * @type {Object}
 * @constant
 */
const rootController = require('./controllers/root.controller');


/**
 * Route serving homepage.
 * @name get /
 * @description Register the rootController's `sendHomepage` function on the rootRouter.
 *    Send the homepage rendered by HBS from `rootController#sendHomepage`.
 */
router.get('/', rootController.sendHomepage);

module.exports = router;

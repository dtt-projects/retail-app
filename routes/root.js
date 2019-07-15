/**
 * @module routes/root
 * @fileoverview Root router for `/` based paths.
 * @requires Express
 * @requires routes/controllers/root
 */

/**
 * @description Express module
 * @constant
 */
const express = require('express');

/**
 * @description Express router to mount user related functions on.
 * @type {Object}
 * @constant
 * @namespace rootRouter
 */
const router = express.Router();


/**
 * @description Controller for root route.
 * @type {Object}
 * @constant
 */
const rootController = require('./controllers/root');


/**
 * Route serving login form.
 * @name get/
 * @function
 * @memberof module:routers/root~rootRouter
 * @description Send the homepage rendered by HBS from `rootController#sendHomepage`.
 */
router.get('/', rootController.sendHomepage);

module.exports = router;

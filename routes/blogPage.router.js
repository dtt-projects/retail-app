/**
 * @module routes/blogPage
 * @fileoverview Root router for `/` based paths.
 * @requires Express
 * @requires routes/controllers/blogPage
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
const blogPageRouter = express.Router();


/**
 * @description blogPageController for blogPage route.
 * @type {Object}
 * @constant
 */
const blogPageController = require('./controllers/blogPage.controller');


/**
 * Route serving .
 * @name get /
 * @description Register the routerController's `sendBlogPage` function on the blogPageRouter.
 *    Send the page rendered by HBS from `blogPageController#sendBlogPage`.
 */
blogPageRouter.get('/', blogPageController.sendBlogPage);

module.exports = blogPageRouter;

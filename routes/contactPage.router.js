/**
 * @module routes/contactPage
 * @fileoverview Root router for `/` based paths.
 * @requires Express
 * @requires routes/controllers/contactPage
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
const contactPageRouter = express.Router();


/**
 * @description contactPageController for contactPage route.
 * @type {Object}
 * @constant
 */
const contactPageController = require('./controllers/contactPage.controller');


/**
 * Route serving .
 * @name get /
 * @description Register the routerController's `sendContactPage` function on the contactPageRouter.
 *    Send the page rendered by HBS from `contactPageController#sendContactPage`.
 */
contactPageRouter.get('/', contactPageController.sendContactPage);

module.exports = contactPageRouter;

/**
 * @module routes/users
 * @fileoverview Routes for user-related tasks
 * @requires Express
 * @requires routes/controllers/users
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
 * @namespace router~userRouter
 */
const userRouter = express.Router();

/**
 * @description Controller for user routes.
 * @type {Object}
 * @constant
 */
const userController = require('./controllers/user');


/* GET users listing. */
router.post('/login', userController.login);

module.exports = router;

/**
 * @module routes/users
 * @fileoverview Routes for user-related tasks
 * @requires Express
 * @requires routes/controllers/users
 * @exports {Express#Router} The user path router.
 */

/**
 * @description Express module
 * @constant
 * @memberof routes/users
 */
const express = require('express');

/**
 * @description userRouter to mount user related functions on.
 * @type {Object}
 * @constant
 */
const userRouter = express.Router();

/**
 * @description userController for user routes.
 * @type {Object}
 * @constant
 */
const userController = require('./controllers/user.controller');


/* GET users listing. */
userRouter.post('/login', userController.login);

module.exports = userRouter;

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
const API_loginRouter = express.Router();

/**
 * @description userController for user routes.
 * @type {Object}
 * @constant
 */
const API_loginController = require('./controllers/API_login.controller');


/* GET users listing. */
API_loginRouter.post('/', API_loginController.login);

module.exports = API_loginRouter;

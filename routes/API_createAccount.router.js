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
 * @memberof routes/API_login
 */
const express = require('express');

/**
 * @description userRouter to mount user related functions on.
 * @type {Object}
 * @constant
 */
const API_createAccountRouter = express.Router();

/**
 * @description userController for user routes.
 * @type {Object}
 * @constant
 */
const API_createAccountController = require('./controllers/API_createAccount.controller');


/* GET users listing. */
API_createAccountRouter.post('/', API_createAccountController.createAccount);

module.exports = API_createAccountRouter;

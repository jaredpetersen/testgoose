'use strict';

const router = require('express').Router();
const bodyParser = require('body-parser');
const tasksRouter = require('./src/tasks/router');
const errorMiddleware = require('./src/error-middleware');

// Add parsing middleware
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Add routes
router.use('/tasks', tasksRouter);

// Add error middleware
router.use(errorMiddleware.errorHandler);
router.use(errorMiddleware.nullRoute);

module.exports = router;

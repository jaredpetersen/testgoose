'use strict';

const router = require('express').Router();
const tasksRouter = require('./src/tasks/router');
const errorMiddleware = require('./src/error-middleware');

// Add routes
router.use('/tasks', tasksRouter);

// Add error middleware
router.use(errorMiddleware.errorHandler);
router.use(errorMiddleware.nullRoute);

module.exports = router;

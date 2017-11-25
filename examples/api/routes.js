'use strict';

let router = require('express').Router();

// Tasks
let tasks = require('./controllers/task');
router.get('/tasks', tasks.getAll);
router.get('/tasks/:id', tasks.getSingle);
router.post('/tasks', tasks.create);

// Error Handling
let errors = require('./controllers/errors');
router.use(errors.errorHandler);

// Request was not picked up by a route, send 404
router.use(errors.nullRoute);

// Export the router
module.exports = router;

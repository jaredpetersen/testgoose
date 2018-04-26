'use strict';

const router = require('express').Router();
const tasks = require('./tasks');

router.get('/', tasks.getAll);
router.get('/:id', tasks.getSingle);
router.post('/', tasks.create);

module.exports = router;

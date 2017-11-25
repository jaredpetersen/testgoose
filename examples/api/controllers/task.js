'use strict';

let Task = require('../models/task')
let errors = require('./errors.js');

exports.getAll = (req, res, next) => {
  Task.find('__v', (err, tasks) => {
    if (err) return next(err);
    res.json(tasks);
  });
};

exports.getSingle = (req, res, next) => {
  Task.findById(req.params.id, '__v', (err, task) => {
    if (err) return next(err);
    if (task == null) return next(errors.newHttpError(404, 'specified task does not exist'));
    res.json(task);
  });
};

exports.create = (req, res, next) => {
  const newTask = new Task();
  newTask.name = req.body.name;
  newTask.description = req.body.description || null;

  newTask.save((err, savedTask) => {
    if (err) return next(err);
    res.status(201).json(savedTask);
  });
};

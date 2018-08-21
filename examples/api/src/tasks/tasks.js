'use strict';

const Task = require('./model')
const errors = require('../error-middleware');

exports.getAll = (req, res, next) => {
  Task.find((err, tasks) => {
    if (err) return next(err);
    res.json(tasks);
  });
};

exports.getSingle = (req, res, next) => {
  Task.findById(req.params.id, (err, task) => {
    if (err) return next(err);
    if (task == null) return next(errors.newHttpError(404, 'specified task does not exist'));
    res.json(task);
  });
};

exports.create = (req, res, next) => {
  // You would actually want to sanitize the input here to prevent issues like injecting an _id
  const newTask = new Task(req.body);

  newTask.save((err, savedTask) => {
    if (err) return next(err);
    res.status(201).json(savedTask);
  });
};

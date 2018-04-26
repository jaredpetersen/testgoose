'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Don't include the document version when converting the data to JSON
const options = {
  toJSON: {
    versionKey: false
  }
};

const taskSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String, default: null},
  created: {type: Date, default: Date.now}
}, options);

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;

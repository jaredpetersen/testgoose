'use strict';

const model = {};
model.mock = require('./lib/model-mock');
model.stub = require('./lib/model-stub');
module.exports.model = model;

const query = {};
query.mock = require('./lib/query-mock');
query.stub = require('./lib/query-stub');
module.exports.query = query;

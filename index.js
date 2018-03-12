'use strict';

const model = {};
model.mock = require('./lib/model/model-mock');
model.stub = require('./lib/model/model-stub');
module.exports.model = model;

const query = {};
query.mock = require('./lib/query/query-mock');
query.stub = require('./lib/query/query-stub');
module.exports.query = query;

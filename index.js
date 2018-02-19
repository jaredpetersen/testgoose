'use strict';

const model = {};
model.mock = require('./lib/model/model-mock');
model.stub = require('./lib/model/model-stub');
module.exports.model = model;

// TODO Make query directly available as a mock/stub
// const query = {};
// query.mock = () => { return require('./lib/query/query-mock'); };
// query.stub = () => { return require('./lib/query/query-stub'); };
// module.exports.query = query;

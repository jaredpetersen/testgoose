'use strict';

const deepEqual = require('deep-equal');
const chainableQueryFunctions = require('./chainableQueryFunctions');

// Mongoose Query docs: http://mongoosejs.com/docs/api.html#query-js
// Mongoose Query code: https://github.com/Automattic/mongoose/blob/master/lib/query.js

class Query {
  constructor(err, data) {
    this.err = err;
    this.data = data;
  }

  returns(err, data) {
    this.err = err;
    this.data = data;
  }

  then(resolve, reject) {
    return this.exec().then(resolve, reject);
  }

  exec(...parameters) {
    const lastParam = parameters[parameters.length - 1];

    if (typeof lastParam === 'function') {
      // User specified a callback, use it
      lastParam(this.err, this.data);
    }
    else if (this.err != null) {
      return Promise.reject(this.err);
    }
    else {
      return Promise.resolve(this.data);
    }
  }
}

// Query logic for a query function that is chainable
const chainableQueryFunction = function(...parameters) {
  return this;
};

// Query logic for a query function that is chainable and can have a callback
const chainableCallbackQueryFunction = function (...parameters) {
  const callback = parameters[parameters.length - 1];
  return (callback != null && typeof callback === 'function') ? callback(this.err, this.data) : this;
};

// Dynamically add functions that just return a query to the Query mock
// TODO Do something about functions that do not return callbacks
for (const chainableFunction of chainableQueryFunctions) {
  Query.prototype[chainableFunction] = chainableCallbackQueryFunction;
}

module.exports = Query;

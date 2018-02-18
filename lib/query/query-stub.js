'use strict';

// Mongoose Query docs: http://mongoosejs.com/docs/api.html#query-js
// Mongoose Query code: https://github.com/Automattic/mongoose/blob/master/lib/query.js

const chainableQueryFunctions = require('./chainable-query-functions');

class Query {
  constructor() {}

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

// Dynamically add functions that just return a query to the Query mock
for (const functionName of chainableQueryFunctions) {
  Query.prototype[functionName] = function(...parameters) {
    const callback = parameters[parameters.length - 1];
    return (callback != null && typeof callback === 'function') ? callback(this.err, this.data) : this;
  };
}

module.exports = Query;

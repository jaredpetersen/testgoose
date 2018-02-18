'use strict';

// Mongoose Query docs: http://mongoosejs.com/docs/api.html#query-js
// Mongoose Query code: https://github.com/Automattic/mongoose/blob/master/lib/query.js

const chainableQueryFunctions = require('./chainable-query-functions');
const callbackUtil = require('../util/callback-util');

class Query {
  constructor() {}

  returns(err, data) {
    this.err = err;
    this.data = data;
  }

  then(resolve, reject) {
    return this.exec().then(resolve, reject);
  }

  catch(reject) {
    return this.exec().then(null, reject);
  }

  exec(...parameters) {
    const callback = callbackUtil.getCallback(parameters);

    if (callback !== null) {
      callback(this.err, this.data);
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
for (const chainableFunction of chainableQueryFunctions) {
  if (chainableFunction.callback === true) {
    Query.prototype[chainableFunction.name] = function(...parameters) {
      const callback = callbackUtil.getCallback(parameters);
      return (callback != null) ? callback(this.err, this.data) : this;
    };
  }
  else {
    Query.prototype[chainableFunction.name] = function(...parameters) {
      return this;
    };
  }
}

module.exports = Query;

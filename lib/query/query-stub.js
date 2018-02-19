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

  exec(...args) {
    const callback = callbackUtil.getCallback(args);

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

// Set up all of the static query functions

for (const chainableFunction of chainableQueryFunctions) {
  if (chainableFunction.callback === true) {
    Query.prototype[chainableFunction.name] = function(...args) {
      const callback = callbackUtil.getCallback(args);
      return (callback != null) ? callback(this.err, this.data) : this;
    };
  }
  else {
    Query.prototype[chainableFunction.name] = function() {
      return this;
    };
  }
}

module.exports = Query;

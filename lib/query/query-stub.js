'use strict';

const chainableQueryFunctions = require('./chainable-query-functions');
const callbackUtil = require('../util/callback-util');

// Unfortunately can't just return the Query stub directly due to caching so instead we return a builder function
module.exports = () => {
  class Query {
    constructor() {
      this.err = Query.err;
      this.data = Query.data;

      // Remove the stub data and returns function so that the stub cannot be redefined after it is instantiated
      delete Query.err;
      delete Query.data;
      delete Query.returns;
    }

    static returns(err, data) {
      Query.err = err;
      Query.data = data;
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

  // Set up the chainable query functions
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

  return Query;
};

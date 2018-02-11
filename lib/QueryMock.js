'use strict';

const deepEqual = require('deep-equal');
const chainableQueryFunctions = require('./chainableQueryFunctions');

// Mongoose Query docs: http://mongoosejs.com/docs/api.html#query-js
// Mongoose Query code: https://github.com/Automattic/mongoose/blob/master/lib/query.js

class QueryMock {
  constructor(err, data) {
    this.err = err;
    this.data = data;
    this.chains = [[]];
    this.executingChain = [];

    // Dynamically add a withParams parameter matching function
    // Have to do this inside of the constructor due to scoping issues
    /*for (let chainableFunction of chainableQueryFunctions) {
      QueryMock.prototype[chainableFunction].withParams = function(...parameters) {
        console.log(chain);
        chain.matchers = parameters;
        //{func: chainableFunction, matchers: parameters, returns: null}
        this.chains[this.chains.length - 1].push(chain);
        return this;
      }.bind(this);
    }*/

    QueryMock.prototype.where.withParams = function(...parameters) {
      this.chains[this.chains.length - 1].push({func: 'where', matchers: parameters, returns: null});
      return this;
    }.bind(this);
  }

  returns(err, data) {
    this.err = err;
    this.data = data;

    // Add return data to the last item in the chain
    this.chains[this.chains.length - 1].returns = {err, data};;

    // Prepare for a new chain to be added
    this.chains.push([]);
  }

  then(resolve, reject) {
    return this.exec().then(resolve, reject);
  }

  exec(...parameters) {
    // Grab the last parameter to determine if it's a callback
    const lastParam = parameters[parameters.length - 1];

    // Grab the return data from the last chain in the execution
    const swoop = this.executingChain[this.executingChain.length - 1].returns;

    // Clear out the executing chain since the chain has come to an end
    this.executingChain = [];

    // Call the exec callback if provided or return a promise
    if (typeof lastParam === 'function') {
      // User specified a callback, use it
      lastParam(swoop.err, swoop.data);
    }
    else if (this.err != null) {
      return Promise.reject(swoop.err);
    }
    else {
      return Promise.resolve(swoop.data);
    }
  }
}

// QueryMock logic for a query function that is chainable
const chainableQueryFunction = function(...parameters) {
  return this;
};

// [[where age=35, where age=49], [where age=35, where age=35]]

// need executing chain that is pushed to during a run
// this.executionChain = []

// matching has to be deepEqual(execChain, chain.slice(0, execChain.length));

// execIdx = 0, execChain = []
// user calls where with age=35
// execChain = [{where, age=35}]
// Looking through chain...
// found a match in chain at 0, return this
// user calls where with age=35
// execChain = [{where, age=35}, {where, age=35}]
// Looking through chain...
// Found a match at 1
// return this;

// where age=35 // found a match in index 1, return this
// where age=35 // no match in index 1, check another chain
                // found a match in index 2

// QueryMock logic for a query function that is chainable and can have a callback
const chainableCallbackQueryFunction = function (...parameters) {
  const callback = parameters[parameters.length - 1];
  return (callback != null && typeof callback === 'function') ? callback(this.err, this.data) : this;
};

// Dynamically add functions that just return a query to the Query mock
// TODO Do something about functions that do not return callbacks
for (const chainableFunction of chainableQueryFunctions) {
  QueryMock.prototype[chainableFunction] = function (...parameters) {
    this.executingChain.push({func: chainableFunction, matchers: parameters});

    for (const chain of this.chains) {
      // Remove returns from the chain so that we can do a proper deep equal
      const chainWithoutReturns = chain.map((record) => {
        delete record.returns;
        return record;
      });

      // Does the currently executing chain match one of the asserted chains that the user defined?
      if (deepEqual(this.executingChain, chainWithoutReturns.slice(0, this.executingChain.length))) {
        this.executingChain[this.executingChain.length - 1].returns = chain.returns;
        const callback = parameters[parameters.length - 1];
        return (callback != null && typeof callback === 'function') ? callback(chain.returns.err, chain.returns.data) : this;
      }
    }
  };
}

module.exports = QueryMock;

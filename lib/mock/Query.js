'use strict';

const deepEqual = require('deep-equal');
const chainableQueryFunctions = require('../chainableQueryFunctions');

// Mongoose Query docs: http://mongoosejs.com/docs/api.html#query-js
// Mongoose Query code: https://github.com/Automattic/mongoose/blob/master/lib/query.js

class Query {
  constructor() {
    this.chains = [[]];
    this.executingChain = [];

    //this.assertionChain = [{ chain: [], returns: null }];
    //this.executingChain = { chain: [], returns: null };

    // Add a withArgs parameter matching function to each chainable query function for setting up the mock assertions
    // Has to be defined in the constructor in order for the chaininig to work properly (needs the correct `this`)
    for (let chainableFunction of chainableQueryFunctions) {
      Query.prototype[chainableFunction].withArgs = function(...argMatchers) {
        // Add a new chain to the function chain using the provided argument matchers
        this.chains[this.chains.length - 1].push({ func: chainableFunction, matchers: argMatchers, returns: null });
        return this;
      }.bind(this);
    }
  }

  // Specify what the query should return at the end of the assertion chain
  returns(err, data) {
    // Add return data to the last item in the chain
    const lastChain = this.chains[this.chains.length - 1];
    const lastChainRecord = lastChain[lastChain.length - 1];
    lastChainRecord.returns = {err, data};

    // Prepare for a new chain to be added
    this.chains.push([]);
  }

  // Convenience wrapper over exec that returns a promise
  then(resolve, reject) {
    return this.exec().then(resolve, reject);
  }

  // Would normally execute the query but in our mock just calls the callback or resolves/rejects a promise with the
  // data from the matching assertion chain
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

// Helper function to remove the returns value from the chain

// TODO Do something about functions that do not return callbacks

// Dynamically add chain functions that allow the next chain to continue if the
for (const chainableFunction of chainableQueryFunctions) {
  Query.prototype[chainableFunction] = function (...parameters) {
    // Remove callback function from parameters for param matching purposes
    const parametersWithoutCallback = (typeof parameters[parameters.length - 1] === 'function') ?
      parameters.slice(0, -1) :
      parameters;

    // Add to the executing chain to indicate that the function has been called
    this.executingChain.push({ func: chainableFunction, matchers: parametersWithoutCallback, returns: null });

    // Loop over all of the assertion chains and see the arguments passed matches one of the assertion chains defined
    // by the tester during the mock setup
    for (const chain of this.chains) {

      // Remove returns property from the each of the chain records on so that we can do a deep equal against the
      // currently executing chain

      const chainWithoutReturns = chain.map(({ func, matchers, returns }) => {
        return { func, matchers };
      });

      // Remove returns
      const chainExecutionWithoutReturns = this.executingChain.map(({ func, matchers, returns }) => {
        return { func, matchers };
      });

      console.log('regular chain');
      console.log(chain);

      console.log('executing chain');
      console.log(this.executingChain);

      console.log('executing chain without returns');
      console.log(chainExecutionWithoutReturns);

      console.log('regular chain without returns');
      console.log(chainWithoutReturns);

      console.log('------------------');

      // Does the currently executing chain match one of the assertion chains that the user defined?
      // Have to slice the tester-defined chain so that not-fully-formed execution chains can still match up
      const chainMatchingExecution = chainWithoutReturns.slice(0, chainExecutionWithoutReturns.length);

      if (deepEqual(chainExecutionWithoutReturns, chainMatchingExecution)) {

        // Update the currently executing chain record's returns property to the returns property of the matching
        // chain record so that the two have parity
        const lastExecutingChainRecord = this.executingChain[this.executingChain.length - 1];
        const lastChainRecord = chain[chain.length - 1];
        lastExecutingChainRecord.returns = chain[chainMatchingExecution.length - 1].returns;

        // Call the callback or return the Query so that the next part of the chain can continue
        const callback = parameters[parameters.length - 1];
        return (callback != null && typeof callback === 'function') ? callback(lastChainRecord.returns.err, lastChainRecord.returns.data) : this;
      }

    }

    // Match does not exist for the currently executing chain, throw an error
    throw new Error('match not found');
  };
}

module.exports = Query;

'use strict';

const deepEqual = require('deep-equal');
const chainableQueryFunctions = require('./chainable-query-functions');

// Mongoose Query docs: http://mongoosejs.com/docs/api.html#query-js
// Mongoose Query code: https://github.com/Automattic/mongoose/blob/master/lib/query.js

class Query {
  constructor() {
    this.assertionChains = [{ chain: [], returns: null }];
    this.executingChain = { chain: [], returns: null };

    // Add a withArgs parameter matching function to each chainable query function for setting up the mock assertions
    // Has to be defined in the constructor in order for the chaininig to work properly (needs the correct `this`)
    for (let chainableFunction of chainableQueryFunctions) {
      Query.prototype[chainableFunction.name].withArgs = function(...argMatchers) {
        // Add a new chain to the function chain using the provided argument matchers
        this.assertionChains[this.assertionChains.length - 1].chain.push({ func: chainableFunction.name, matchers: argMatchers });
        return this;
      }.bind(this);
    }
  }

  // Specify what the query should return at the end of the assertion chain
  // TODO Look into making this only accessible on the function
  returns(err, data) {
    // Add return data to the last item in the chain
    const lastAssertionChain = this.assertionChains[this.assertionChains.length - 1];
    lastAssertionChain.returns = {err, data};

    // Prepare for a new chain to be added
    this.assertionChains.push({ chain: [], returns: null });
  }

  // Convenience wrapper over exec that returns a promise
  then(resolve, reject) {
    return this.exec().then(resolve, reject);
  }

  catch(reject) {
    return this.exec().then(null, reject);
  }

  // Would normally execute the query but in our mock just calls the callback or resolves/rejects a promise with the
  // data from the matching assertion chain
  exec(...parameters) {
    // Grab the last parameter to determine if it's a callback
    const lastParam = parameters[parameters.length - 1];

    // Grab the return data from the last chain in the execution
    const executingChainReturns = this.executingChain.returns;

    // Clear out the executing chain since the chain has come to an end
    this.executingChain = { chain: [], returns: null };

    // Call the exec callback if provided or return a promise
    if (typeof lastParam === 'function') {
      // User specified a callback, use it
      lastParam(executingChainReturns.err, executingChainReturns.data);
    }
    else if (executingChainReturns.err != null) {
      return Promise.reject(executingChainReturns.err);
    }
    else {
      return Promise.resolve(executingChainReturns.data);
    }
  }
}

// Dynamically add chain functions that allow the next chain to continue
for (const chainableFunction of chainableQueryFunctions) {

  // Set up the chainable query function
  Query.prototype[chainableFunction.name] = function (...parameters) {

    // Remove callback function from parameters for param matching purposes
    const parametersWithoutCallback = (typeof parameters[parameters.length - 1] === 'function') ?
      parameters.slice(0, -1) :
      parameters;

    // Add to the executing chain to indicate that the function has been called
    this.executingChain.chain.push({ func: chainableFunction.name, matchers: parametersWithoutCallback });

    // Loop over all of the assertion chains and see the arguments passed matches one of the assertion chains defined
    // by the tester during the mock setup
    for (const assertionChain of this.assertionChains) {

      // Pare down the assertion chain in order to be able to compare it to a not-fully-executed execution chain
      const assertionChainMatchingExecution = assertionChain.chain.slice(0, this.executingChain.chain.length);

      // Check if the executing chain matches the assertion chain
      if (deepEqual(this.executingChain.chain, assertionChainMatchingExecution)) {

        // Update the execution chain returns value so that the two have parity
        this.executingChain.returns = assertionChain.returns;

        // Call the callback or return the Query so that the next part of the chain can continue
        // But only allow a callback to be called if the query function supports it
        const callback = parameters[parameters.length - 1];
        if (chainableFunction.callback === true && (callback != null && typeof callback === 'function')) {
          callback(assertionChain.returns.err, assertionChain.returns.data);
        }
        else {
          return this;
        }

      }

    }

    // Match does not exist for the currently executing chain, throw an error
    throw new Error(`invoked query with incorrect chain: ${JSON.stringify(this.executingChain.chain)}`);
  };
}

module.exports = Query;

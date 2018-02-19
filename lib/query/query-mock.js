'use strict';

const deepEqual = require('deep-equal');
const chainableQueryFunctions = require('./chainable-query-functions');
const callbackUtil = require('../util/callback-util');

// Mongoose Query docs: http://mongoosejs.com/docs/api.html#query-js
// Mongoose Query code: https://github.com/Automattic/mongoose/blob/master/lib/query.js

class Query {
  constructor() {
    // Store information about the assertion chains the tester has defined and the currently executing chain
    this.assertionChains = [{ chain: [], returns: null }];
    this.executionChain = { chain: [], returns: null };

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

  static returns(err, data) {
    // Add return data to the last item in the chain
    const lastAssertionChain = this.assertionChains[this.assertionChains.length - 1];
    lastAssertionChain.returns = {err, data};

    // Prepare for a new chain to be added
    this.assertionChains.push({ chain: [], returns: null });
  }

  then(resolve, reject) {
    return this.exec().then(resolve, reject);
  }

  catch(reject) {
    return this.exec().then(null, reject);
  }

  exec(...args) {
    // Grab the return data from the last chain in the execution so that we can use it and then clear it out
    const executingChainReturns = this.executionChain.returns;
    this.executionChain = { chain: [], returns: null };

    const callback = callbackUtil.getCallback(args);

    if (callback !== null) {
      callback(executingChainReturns.err, executingChainReturns.data);
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
  Query.prototype[chainableFunction.name] = function (...args) {
    // Add to the executing chain to indicate that the function has been called
    this.executionChain.chain.push({ func: chainableFunction.name, matchers: callbackUtil.getArgumentsWithoutCallback(args) });

    // Loop over all of the assertion chains and see the arguments passed matches one of the assertion chains defined
    // by the tester during the mock setup
    for (const assertionChain of this.assertionChains) {

      // Pare down the assertion chain in order to be able to compare it to a not-fully-executed execution chain
      const assertionChainMatchingExecution = assertionChain.chain.slice(0, this.executionChain.chain.length);

      // Check if the executing chain matches the assertion chain
      if (deepEqual(this.executionChain.chain, assertionChainMatchingExecution)) {
        // Update the execution chain returns value so that the two have parity
        this.executionChain.returns = assertionChain.returns;

        // Call the callback or return the Query so that the next part of the chain can continue
        // But only allow a callback to be called if the query function supports it
        const callback = callbackUtil.getCallback(args);
        if (chainableFunction.callback === true && callback != null) {
          return callback(assertionChain.returns.err, assertionChain.returns.data);
        }
        else {
          return this;
        }
      }
    }

    // Match does not exist for the currently executing chain, throw an error
    throw new Error(`invoked query with incorrect chain: ${JSON.stringify(this.executionChain.chain)}`);
  };
}

module.exports = Query;

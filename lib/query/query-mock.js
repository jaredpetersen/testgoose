'use strict';

const callbackUtil = require('../util/callback-util');
const chainableQueryFunctions = require('./chainable-query-functions');
const deepEqual = require('deep-equal');

// Set up the mock of Mongoose Query
const Query = function () {
  this.executionChain = { chain: [], returns: null };
  this.assertionChains = Query.proto._chains;

  // Reset the proto object of tester functions
  Query.proto = buildProto();

  // Add the actual query functions to the object
  for (const chainableFunction of chainableQueryFunctions) {

    this[chainableFunction.name] = (...args) => {
      const argsWithoutCallback = callbackUtil.getArgumentsWithoutCallback(args);
      this.executionChain.chain.push({ name: chainableFunction.name, args: argsWithoutCallback });

      for (const assertionChain of this.assertionChains) {
        // Remove links from the assertion chain so that we can accurately assess the execution
        const assertionChainMatchingExecution = assertionChain.chain.slice(0, this.executionChain.chain.length);

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

  this.exec = (...args) => {
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
  };

  this.then = (resolve, reject) => {
    return this.exec().then(resolve, reject);
  }

  this.catch = (reject) => {
    return this.exec().then(null, reject);
  }
}

// Build the proto object used by the tester to setup the assertion chains
const buildProto = () => {
  const proto = { _chains: [ { chain: [], returns: null } ] };

  proto.returns = (err, data) => {
    const latestChain = Query.proto._chains[Query.proto._chains.length - 1];
    latestChain.returns = { err, data };
    Query.proto._chains.push({ chain: [], returns: null });
  };

  for (const chainableFunction of chainableQueryFunctions) {
    proto[chainableFunction.name] = {};
    proto[chainableFunction.name].withArgs = (...argMatchers) => {
      const chain = proto._chains[proto._chains.length - 1].chain;
      chain.push({ name: chainableFunction.name, args: argMatchers });
      return proto;
    };
  };

  /*proto.find = {};
  proto.find.withArgs = (...argMatchers) => {
    const chain = proto._chains[proto._chains.length - 1].chain;
    chain.push({ name: 'find', args: argMatchers });
    return proto;
  };*/

  // Create a sub-proto object so that testers can chain another .proto off of withArgs()
  proto.proto = proto;

  return proto;
}

// Set up the proto object of tester functions for the first time
Query.proto = buildProto();


module.exports = Query;

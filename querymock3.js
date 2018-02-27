'use strict';

const callbackUtil = require('./lib/util/callback-util');
const deepEqual = require('deep-equal');

const Query = function () {
  this.executionChain = { chain: [], returns: null };
  this.assertionChains = Query.proto._chains;

  // Reset the proto bag of data so that it can be redefined
  //Query.proto = buildProto();
  delete Query.proto;

  // Add the actual query functions to the object

  this.find = (...args) => {
    this.executionChain.chain.push({ name: 'find', args: args });

    for (const assertionChain of this.assertionChains) {
      // Remove links from the assertion chain so that we can accurately assess the execution
      const assertionChainMatchingExecution = assertionChain.chain.slice(0, this.executionChain.chain.length);

      if (deepEqual(this.executionChain.chain, assertionChainMatchingExecution)) {
        // Update the execution chain returns value so that the two have parity
        this.executionChain.returns = assertionChain.returns;

        // Call the callback or return the Query so that the next part of the chain can continue
        // But only allow a callback to be called if the query function supports it
        const callback = callbackUtil.getCallback(args);
        //if (chainableFunction.callback === true && callback != null) {
        if (callback != null) {
          return callback(assertionChain.returns.err, assertionChain.returns.data);
        }
        else {
          return this;
        }
      }
    }

    throw new Error('no match found');
  };

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
  }
}

// Think about whether or not adding the function to Query on returns is the right move or during the construction is the right move
// Leaning towards construction;

// This will have to be a function so that it can be reset by the constructor

Query.proto = { _chains: [ { chain: [], returns: null } ] };

Query.proto.returns = (err, data) => {
  const latestChain = Query.proto._chains[Query.proto._chains.length - 1];
  latestChain.returns = { err, data };
  Query.proto._chains.push({ chain: [], returns: null });
};

Query.proto.find = {};
Query.proto.find.withArgs = (...argMatchers) => {
  const chain = Query.proto._chains[Query.proto._chains.length - 1].chain;
  chain.push({ name: 'find', args: argMatchers });
  return Query.proto;
};

Query.proto.proto = Query.proto;

// Setup the initial proto bag of data
//buildProto();

// Start actual usage
Query.proto.find.withArgs('banana').returns(null, 'peanut');
Query.proto.find.withArgs('orange').returns('bad', null);
Query.proto.find.withArgs('orange').proto.find.withArgs('orange').returns('hiya', null);

const query = new Query();
query.find('orange').exec((err, data) => {
  console.log('orange:');
  console.log('err', err);
  console.log('data', data);
});
console.log('banana ----------------------');
query.find('banana').exec((err, data) => {
  console.log('banana:');
  console.log('err', err);
  console.log('data', data);
});
console.log('orange orange ----------------------');
query.find('orange').find('orange').exec((err, data) => {
  console.log('orange orange:');
  console.log('err', err);
  console.log('data', data);
});


module.exports = Query;

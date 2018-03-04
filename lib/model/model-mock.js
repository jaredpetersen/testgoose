'use strict';

const modelQueryFunctions = require('./model-query-functions');
const queryMock = require('../query/query-mock');
const deepEqual = require('deep-equal');
const callbackUtil = require('../util/callback-util');

module.exports = (modelName, schema) => {
  const Query = queryMock();

  class Model {
    constructor() {
      this.save.argMatchers = Model.proto.save.argMatchers;

      // Remove the proto object so that the mock cannot be redefined after it is instantiated
      delete Model.proto;
    }
    static get modelName() { return modelName; }
    static get schema() { return schema; }
  }

  // Set up all of the static query functions

  Model.static = {};

  for (const modelQueryFunction of modelQueryFunctions) {
    Model[modelQueryFunction.name] = function(...args) {
      const argsWithoutCallback = callbackUtil.getArgumentsWithoutCallback(args);

      // Use the argument matchers specified by the tester to determine if the function should return a query
      for (const parameterMatcher of Model[modelQueryFunction.name].argMatchers) {
        if (parameterMatcher.matcher === null || deepEqual(argsWithoutCallback, parameterMatcher.matcher)) {
          if (!(parameterMatcher.query instanceof Query)) {
            parameterMatcher.query = new Query();
          }
          return parameterMatcher.query[modelQueryFunction.queryName](...args);
        }
      }

      // Function was called with arguments the tester did not specify -- throw an error
      throw new Error(`invoked model.${modelQueryFunction.name}() with incorrect arguments: ${JSON.stringify(argsWithoutCallback)}`);
    };

    Model[modelQueryFunction.name].argMatchers = [];

    Model.static[modelQueryFunction.name] = {};
    Model.static[modelQueryFunction.name].withArgs = (...argMatchers) => {
      // Return the matching query if the arguments have already been specified before
      for (const matcher of Model[modelQueryFunction.name].argMatchers) {
        if (deepEqual(matcher.matcher, argMatchers)) {
          return matcher.query.proto[modelQueryFunction.queryName].withArgs(...argMatchers);
        }
      }

      // Arguments have not been specified before so create a new matcher with a new query
      // Have to call withArgs on the new query so that it can have an accurate execution record
      const newMatcher = {
        matcher: argMatchers,
        query: Query.proto[modelQueryFunction.queryName].withArgs(...argMatchers)
      };

      // Add the matcher to the function's argument matcher list
      Model[modelQueryFunction.name].argMatchers.push(newMatcher);

      // Return the query for the new matcher so that more assertions can be chained off it
      return newMatcher.query;
    };
  }

  // Set up all of the document-based functions

  // prototype.save

  Model.prototype.save = function (...args) {
    const argsWithoutCallback = callbackUtil.getArgumentsWithoutCallback(args);

    // Use the argument matchers specified by the tester to determine if the function should return err/data
    for (const parameterMatcher of this.save.argMatchers) {
      if (parameterMatcher.matcher === null || deepEqual(argsWithoutCallback, parameterMatcher.matcher)) {
        const callback = callbackUtil.getCallback(args);

        if (callback) callback(parameterMatcher.returns.err, parameterMatcher.returns.doc);
        else if (parameterMatcher.returns.err) return Promise.reject(parameterMatcher.returns.err);
        else return Promise.resolve(parameterMatcher.returns.doc);
      }
    }

    // Function was called with arguments the tester did not specify -- throw an error
    throw new Error(`invoked model.prototype.save() with incorrect arguments: ${JSON.stringify(argsWithoutCallback)}`);
  };

  // Build the proto object used by the tester to setup the assertion chains
  const buildProto = () => {
    const proto = {};

    proto.save = { argMatchers: [] };
    proto.save.withArgs = (...argMatchers) => {
      // Always create a new matcher with empty returns data (which will later be set by the returns function)
      const newMatcher = { matcher: argMatchers, returns: {err: null, doc: null} };

      // Add the matcher to the list for the function
      proto.save.argMatchers.push(newMatcher);

      return proto.save.withArgs;
    };
    proto.save.withArgs.returns = (err, doc) => {
      const argMatcher = proto.save.argMatchers[proto.save.argMatchers.length - 1];
      argMatcher.returns.err = err;
      argMatcher.returns.doc = doc;
    };

    return proto;
  };

  // Set up the proto object of tester functions for the first time
  Model.proto = buildProto();

  return Model;
};

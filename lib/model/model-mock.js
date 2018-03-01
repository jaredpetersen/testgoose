'use strict';

const modelQueryFunctions = require('./model-query-functions');
//const Query = require('../query/query-mock').build();
const queryBuilder = require('../query/query-mock');
const deepEqual = require('deep-equal');
const callbackUtil = require('../util/callback-util');

module.exports = (modelName, schema) => {
  const Query = queryBuilder.build();

  class Model {
    static get modelName() { return modelName; }
    static get schema() { return schema; }
  }

  // Set up all of the static query functions

  for (const modelQueryFunction of modelQueryFunctions) {
    // Model query function
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

    // Store the argument matchers the tester has specified for the model query function
    Model[modelQueryFunction.name].argMatchers = [];

    // Allow the tester to specify the arguments the model query function should expect to be called with
    Model[modelQueryFunction.name].withArgs = (...argMatchers) => {
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
    for (const parameterMatcher of Model.prototype.save.argMatchers) {
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

  // Store the argument matchers the tester has specified for prototype.save
  Model.prototype.save.argMatchers = [];

  // Allow the tester to specify the arguments the function should expect to be run with
  Model.prototype.save.withArgs = (...argMatchers) => {
    // Always create a new matcher with empty returns data (which will later be set by the returns function)
    const newMatcher = { matcher: argMatchers, returns: {err: null, doc: null} };

    // Add the matcher to the list for the function
    Model.prototype.save.argMatchers.push(newMatcher);

    return Model.prototype.save.withArgs;
  };

  // Allow the tester to specify the arguments that prototype.save should expect to be called with
  Model.prototype.save.withArgs.returns = (err, doc) => {
    const argMatcher = Model.prototype.save.argMatchers[Model.prototype.save.argMatchers.length - 1];
    argMatcher.returns.err = err;
    argMatcher.returns.doc = doc;
  };

  return Model;
};

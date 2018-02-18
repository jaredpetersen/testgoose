'use strict';

const modelQueryFunctions = require('./model-query-functions');
const Query = require('../query/query-mock');
const deepEqual = require('deep-equal');
const callbackUtil = require('../util/callback-util');

module.exports = (modelName, schema) => {
  class Model {
    static get modelName() { return modelName; }
    static get schema() { return schema; }
  }

  // Set up all of static query functions on the fly

  for (const modelQueryFunction of modelQueryFunctions) {
    // Model query function invoked by the system under test
    Model[modelQueryFunction.name] = function(...parameters) {
      const parametersWithoutCallback = callbackUtil.getParametersWithoutCallback(parameters);

      // Use the argument matchers specified by the tester to determine if the function should return a query
      for (const parameterMatcher of Model[modelQueryFunction.name].paramMatchers) {
        if (parameterMatcher.matcher === null || deepEqual(parametersWithoutCallback, parameterMatcher.matcher)) {
          return parameterMatcher.query[modelQueryFunction.queryName](...parameters);
        }
      }

      // Function was called with arguments the tester did not specify -- throw an error
      throw new Error(`invoked model.${modelQueryFunction.name}() with incorrect arguments: ${JSON.stringify(parametersWithoutCallback)}`);
    }

    // Store the argument matchers the tester has specified for the model query function
    Model[modelQueryFunction.name].paramMatchers = [];

    // Allow the tester to specify the arguments the model query function should expect to be called with
    Model[modelQueryFunction.name].withArgs = (...paramMatchers) => {
      // Return the matching query if the arguments have already been specified before
      for (const matcher of Model[modelQueryFunction.name].paramMatchers) {
        if (deepEqual(matcher.matcher, paramMatchers)) {
          return matcher.query[modelQueryFunction.queryName].withArgs(...paramMatchers)
        }
      }

      // Arguments have not been specified before so create a new matcher with a new query
      // Have to call withArgs on the new query so that it can have an accurate execution record
      const newMatcher = {
        matcher: paramMatchers,
        query: new Query()[modelQueryFunction.queryName].withArgs(...paramMatchers)
      };

      // Add the matcher to the function's argument matcher list
      Model[modelQueryFunction.name].paramMatchers.push(newMatcher);

      // Return the query for the new matcher so that more assertions can be chained off of the mock
      return newMatcher.query;
    };
  }

  // Set up all of the document-based functions

  // prototype.save

  Model.prototype.save = function (...parameters) {
    const parametersWithoutCallback = callbackUtil.getParametersWithoutCallback(parameters);

    // Use the argument matchers specified by the tester to determine if the function should return err/data
    for (const parameterMatcher of Model.prototype.save.paramMatchers) {
      if (parameterMatcher.matcher === null || deepEqual(parametersWithoutCallback, parameterMatcher.matcher)) {
        const callback = callbackUtil.getCallback(parameters);

        if (callback) callback(parameterMatcher.returns.err, parameterMatcher.returns.doc);
        else if (err) return Promise.reject(parameterMatcher.returns.err);
        else return Promise.resolve(parameterMatcher.returns.doc);
      }
    }

    // Function was called with arguments the tester did not specify -- throw an error
    throw new Error(`invoked model.prototype.save() with incorrect arguments: ${JSON.stringify(parametersWithoutCallback)}`);
  };

  // Store the argument matchers the tester has specified for prototype.save
  Model.prototype.save.paramMatchers = [];

  // Allow the tester to specify the arguments the mock should expect to be run with
  Model.prototype.save.withArgs = (...paramMatchers) => {
    // Always create a new matcher with empty returns data (which will later be set by the returns function)
    const newMatcher = { matcher: paramMatchers, returns: {err: null, doc: null} };

    // Add the matcher to the list for the function
    Model.prototype.save.paramMatchers.push(newMatcher);

    return Model.prototype.save.withArgs;
  };

  // Allow the tester to specify the arguments that prototype.save should expect to be called with
  Model.prototype.save.withArgs.returns = (err, doc) => {
    const paramMatcher = Model.prototype.save.paramMatchers[Model.prototype.save.paramMatchers.length - 1];
    paramMatcher.returns.err = err;
    paramMatcher.returns.doc = doc;
  };

  return Model;
};

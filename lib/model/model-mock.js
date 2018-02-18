'use strict';

const modelQueryFunctions = require('./model-query-functions');
const Query = require('../query/query-mock');
const deepEqual = require('deep-equal');

module.exports = (modelName, schema) => {
  class Model {
    static get modelName() { return modelName; }
    static get schema() { return schema; }
    save() {}
  }

  // Set up all of the functions that return a Query

  for (const modelQueryFunction of modelQueryFunctions) {
    // Set up the query function on the class
    // TODO see if this is needed anymore
    Model[modelQueryFunction.name] = () => {};

    // Define the mock behavior
    Model[modelQueryFunction.name] = function(...parameters) {
      // Remove callback function from parameters for param matching purposes
      const parametersWithoutCallback = (typeof parameters[parameters.length - 1] === 'function') ?
        parameters.slice(0, -1) :
        parameters;

      // Find the matching parameter
      for (const parameterMatcher of Model[modelQueryFunction.name].paramMatchers) {
        if (parameterMatcher.matcher === null || deepEqual(parametersWithoutCallback, parameterMatcher.matcher)) {
          return parameterMatcher.query[modelQueryFunction.queryName](...parameters);
        }
      }

      // Throw an error -- match wasn't found
      throw new Error(`invoked model.${modelQueryFunction.name}() with incorrect arguments: ${JSON.stringify(parametersWithoutCallback)}`);
    }

    // Setup the parameter matchers
    Model[modelQueryFunction.name].paramMatchers = [];

    // Setup the parameter matcher setter
    Model[modelQueryFunction.name].withArgs = (...paramMatchers) => {
      // Try to find if the matcher already exists
      for (const matcher of Model[modelQueryFunction.name].paramMatchers) {
        if (deepEqual(matcher.matcher, paramMatchers)) {
          // Matcher already exists, return the query
          return matcher.query[modelQueryFunction.queryName].withArgs(...paramMatchers)
        }
      }

      // Matcher does not already exist so create it
      // Query for the matcher needs to have withArgs called too so that it can have an accurate matcher record too
      const newMatcher = {
        matcher: paramMatchers,
        query: new Query()[modelQueryFunction.queryName].withArgs(...paramMatchers)
      };

      // Add the matcher to the list for the function
      Model[modelQueryFunction.name].paramMatchers.push(newMatcher);

      // Return the query for the new matcher so that more mock assertions can be chained off of it
      return newMatcher.query;
    };
  }

  // Set up all of the document-based functions

  Model.prototype.save = function (...parameters) {
    // Remove callback function from parameters for param matching purposes
    const parametersWithoutCallback = (typeof parameters[parameters.length - 1] === 'function') ?
      parameters.slice(0, -1) :
      parameters;

    // Find the matching parameter
    for (const parameterMatcher of Model.prototype.save.paramMatchers) {
      if (parameterMatcher.matcher === null || deepEqual(parametersWithoutCallback, parameterMatcher.matcher)) {
        // Found the match

        // Get the callback function out of a list of parameters if one exists
        const parseCallback = (parameters) => {
          const lastParam = parameters[parameters.length - 1];
          return (typeof lastParam === 'function') ? lastParam : null;
        };

        // Get the callback function from the parameters
        const callback = parseCallback(parameters);

        // Call the callback or return a promise
        if (callback) callback(parameterMatcher.returns.err, parameterMatcher.returns.doc);
        else if (err) return Promise.reject(parameterMatcher.returns.err);
        else return Promise.resolve(parameterMatcher.returns.doc);
      }
    }

    // Throw an error -- match wasn't found
    throw new Error(`invoked model.prototype.save() with incorrect arguments: ${JSON.stringify(parametersWithoutCallback)}`);
  };

  Model.prototype.save.paramMatchers = [];

  Model.prototype.save.withArgs = (...paramMatchers) => {
    const newMatcher = {
      matcher: paramMatchers,
      returns: {err: null, doc: null}
    };

    // Add the matcher to the list for the function
    Model.prototype.save.paramMatchers.push(newMatcher);

    return Model.prototype.save.withArgs;
  };

  Model.prototype.save.withArgs.returns = (err, doc) => {
    const paramMatcher = Model.prototype.save.paramMatchers[Model.prototype.save.paramMatchers.length - 1];
    paramMatcher.returns.err = err;
    paramMatcher.returns.doc = doc;
  };

  return Model;
};

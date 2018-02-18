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

  // Set up extra functions on supported Mongoose Model functions that allows users to override behavior

  // Set up all of the functions that return a Query
  for (const modelQueryFunction of modelQueryFunctions) {
    // Set up the query function on the class
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

  // TODO define save

  return Model;
};

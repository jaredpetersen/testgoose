'use strict';

const Query = require('./Query');
const deepEqual = require('deep-equal');

module.exports = (modelName, schema) => {
  class Model {
    static find() {}
    static findById() {}
    static findByIdAndRemove() {}
    static findByIdAndUpdate() {}
    static get modelName() { return modelName; }
    static get schema() { return schema; }

    save() {}
  }

  // Set up extra functions on supported Mongoose Model functions that allows users to override behavior
  const queryReturningFunctions = ['find', 'findById', 'findByIdAndRemove', 'findByIdAndUpdate'];

  for (const queryReturningFunction of queryReturningFunctions) {
    // Define the mock behavior
    Model[queryReturningFunction] = function(...parameters) {
      // Remove callback function from parameters for param matching purposes
      const parametersWithoutCallback = (typeof parameters[parameters.length - 1] === 'function') ?
        parameters.slice(0, -1) :
        parameters;

      for (const parameterMatcher of Model[queryReturningFunction].paramMatchers) {
        if (parameterMatcher.matcher === null || deepEqual(parametersWithoutCallback, parameterMatcher.matcher)) {
          return parameterMatcher.query;
        }
      }
    }

    // Setup the parameter matchers
    Model[queryReturningFunction].paramMatchers = [];

    // Setup the parameter matcher setter
    Model[queryReturningFunction].withArgs = (...paramMatchers) => {
      // Try to find if the matcher already exists
      for (const matcher of Model[queryReturningFunction].paramMatchers) {
        if (deepEqual(matcher.matcher, paramMatchers)) {
          // Matcher already exists, return the query
          return matcher.query;
        }
      }

      // Matcher does not already exist so add it
      Model[queryReturningFunction].paramMatchers.push({ matcher: paramMatchers, query: new Query(null, 'pizza')});
      return Model[queryReturningFunction].paramMatchers[Model[queryReturningFunction].paramMatchers.length - 1].query;
    };
  }

  return Model;
};

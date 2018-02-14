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
  const queryReturningFunctions = [
    {modelFunc: 'find', queryFunc: 'find'},
    {modelFunc: 'findById', queryFunc: 'findOne'},
    {modelFunc: 'findByIdAndRemove', queryFunc: 'findOneAndRemove'},
    {modelFunc: 'findByIdAndUpdate', queryFunc: 'findOneAndUpdate'}
  ];

  for (const queryReturningFunction of queryReturningFunctions) {
    // Define the mock behavior
    Model[queryReturningFunction.modelFunc] = function(...parameters) {
      // Remove callback function from parameters for param matching purposes
      const parametersWithoutCallback = (typeof parameters[parameters.length - 1] === 'function') ?
        parameters.slice(0, -1) :
        parameters;

      for (const parameterMatcher of Model[queryReturningFunction.modelFunc].paramMatchers) {
        if (parameterMatcher.matcher === null || deepEqual(parametersWithoutCallback, parameterMatcher.matcher)) {
          return parameterMatcher.query[queryReturningFunction.queryFunc](...parameters);
        }
      }
    }

    // Setup the parameter matchers
    Model[queryReturningFunction.modelFunc].paramMatchers = [];

    // Setup the parameter matcher setter
    Model[queryReturningFunction.modelFunc].withArgs = (...paramMatchers) => {
      // Try to find if the matcher already exists
      for (const matcher of Model[queryReturningFunction.modelFunc].paramMatchers) {
        if (deepEqual(matcher.matcher, paramMatchers)) {
          // Matcher already exists, return the query
          return matcher.query[queryReturningFunction.queryFunc].withArgs(...paramMatchers)
        }
      }

      // Matcher does not already exist so add it
      Model[queryReturningFunction.modelFunc].paramMatchers.push({ matcher: paramMatchers, query: new Query()[queryReturningFunction.queryFunc].withArgs(...paramMatchers)});
      return Model[queryReturningFunction.modelFunc].paramMatchers[Model[queryReturningFunction.modelFunc].paramMatchers.length - 1].query;
    };
  }

  return Model;
};

'use strict';

const QueryMock = require('./lib/QueryMock');
const QueryStub = require('./lib/Query');
const deepEqual = require('deep-equal');

module.exports.mock = (modelName, schema) => {
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
    Model[queryReturningFunction].withParams = (...paramMatchers) => {
      // Try to find if the matcher already exists
      for (const matcher of Model[queryReturningFunction].paramMatchers) {
        if (deepEqual(matcher.matcher, paramMatchers)) {
          // Matcher already exists, return the query
          return matcher.query;
        }
      }

      // Matcher does not already exist so add it
      Model[queryReturningFunction].paramMatchers.push({ matcher: paramMatchers, query: new QueryMock(null, 'pizza')});
      return Model[queryReturningFunction].paramMatchers[Model[queryReturningFunction].paramMatchers.length - 1].query;
    };
  }

  /*Model.goob = function(...parameters) {
    // Remove callback function from parameters for param matching purposes
    const parametersWithoutCallback = (typeof parameters[parameters.length - 1] === 'function') ?
      parameters.slice(0, -1) :
      parameters;

    for (const parameterMatcher of Model.goob.paramMatchers) {
      if (parameterMatcher.matcher === null || deepEqual(parametersWithoutCallback, parameterMatcher.matcher)) {
        return parameterMatcher.query;
      }
    }
  }

  Model.goob.paramMatchers = [];

  Model.goob.withParams = (...paramMatchers) => {
    // Try to find if the matcher already exists
    for (const matcher of Model.goob.paramMatchers) {
      if (deepEqual(matcher.matcher, paramMatchers)) {
        // Matcher already exists, return the query
        return matcher.query;
      }
    }

    // Matcher does not already exist so add it
    Model.goob.paramMatchers.push({ matcher: paramMatchers, query: new Query(null, 'pizza')});
    return Model.goob.paramMatchers[Model.goob.paramMatchers.length - 1].query;
  };

  // Not used right now
  Model.goob.returns = (err, doc) => {
    this.paramMatchers = [ {matcher: null, query: new Query(err, doc)} ];
  };*/

  return Model;
};

module.exports.stub = (modelName, schema) => {
  class Model {
    static find() {}
    static findById() {}
    static findByIdAndRemove() {}
    static findByIdAndUpdate() {}
    static get modelName() { return modelName; }
    static get schema() { return schema; }

    save() {}
  }

  // Parse out the callback from the model function call and prepare it for later use
  const parseCallback = (parameters) => {
    // Grab the last parameter which should be a callback function unless promises are used
    const lastParam = parameters[parameters.length - 1];

    // If the last parameter is a function then return it, otherwise return null
    return (typeof lastParam === 'function') ? lastParam : null;
  };

  // Dynamically set up functions that return query objects
  const queryReturningFunctions = [
    {modelFunc: 'find', queryFunc: 'find'},
    {modelFunc: 'findById', queryFunc: 'findOne'},
    {modelFunc: 'findByIdAndRemove', queryFunc: 'findOneAndRemove'},
    {modelFunc: 'findByIdAndUpdate', queryFunc: 'findOneAndUpdate'}
  ];

  for (const queryReturningFunction of queryReturningFunctions) {
    // Add the returns() function to specify what the stub should return (without an argument matcher)
    Model[queryReturningFunction.modelFunc].returns = (err, data) => {
      const paramMatchers = Model[queryReturningFunction.modelFunc].paramMatchers;

      // Define the stub behavior
      Model[queryReturningFunction.modelFunc] = (...parameters) => {
        // Remove callback function from parameters for param matching purposes
        const parametersWithoutCallback = (typeof parameters[parameters.length - 1] === 'function') ?
          parameters.slice(0, -1) :
          parameters;

        // If the user specified param matchers, don't execute if they are not met
        if (paramMatchers === undefined || deepEqual(parametersWithoutCallback, paramMatchers)) {
          const callback = parseCallback(parameters);
          return new QueryStub(err, data)[queryReturningFunction.queryFunc](callback);
        }
      };
    };
  }

  // Document functions

  Model.prototype.save.returns = (err, doc, numAffected=1) => {
    Model.prototype.save = function (...parameters) {
      // Use model properties for the data or use user-defined data from the mock setup if it was provided
      const callbackData = (err === undefined || doc === undefined) ?
        { err: null, doc: Object.assign({}, this), numAffected } :
        { err, doc, numAffected };

      // Get the callback function from the parameters
      const callback = parseCallback(parameters);

      // Call the callback or return a promise
      if (callback) callback(callbackData.err, callbackData.doc, callbackData.numAffected);
      else if (err) return Promise.reject(callbackData.err);
      else return Promise.resolve(callbackData.doc);
    };
  };

  return Model;
};

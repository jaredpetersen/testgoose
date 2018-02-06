'use strict';

const deepEqual = require('deep-equal');

const Query = require('./lib/Query');

module.exports.mock = (modelName, schema) => {
  // Mongoose Model docs: http://mongoosejs.com/docs/api.html#model-js
  // Mongoose Model code: https://github.com/Automattic/mongoose/blob/master/lib/model.js

  // Mock the Mongoose Model
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
  const setupCallback = (parameters, callbackData) => {
    // Grab the last parameter which should be a callback function unless promises are used
    let lastParam = parameters[parameters.length - 1];

    if (typeof lastParam === 'function') {
      // It is a callback function -- wrap it with the right data for passing to QueryMock
      return () => lastParam.apply(null, callbackData);
    }
    else {
      // Not a callback function so we must be using promises
      return null;
    }
  };

  // Set up extra functions on supported Mongoose Model functions that allows users to override behavior

  // Model functions

  // Dynamically set up functions that return query objects
  const queryReturningFunctions = [
    {modelFunc: 'find', queryFunc: 'find'},
    {modelFunc: 'findById', queryFunc: 'findOne'},
    {modelFunc: 'findByIdAndRemove', queryFunc: 'findOneAndRemove'},
    {modelFunc: 'findByIdAndUpdate', queryFunc: 'findOneAndUpdate'}
  ];

  for (const queryReturningFunction of queryReturningFunctions) {
    // Add the withParams() argument matching function
    Model[queryReturningFunction.modelFunc].withParams = (...paramMatchers) => {
      Model[queryReturningFunction.modelFunc].paramMatchers = paramMatchers;
      return Model[queryReturningFunction.modelFunc];
    };

    // Add the returns() function to specify what the stub should return (without an argument matcher)
    Model[queryReturningFunction.modelFunc].returns = (err, data) => {
      const paramMatchers = Model[queryReturningFunction.modelFunc].paramMatchers;

      Model[queryReturningFunction.modelFunc] = (...parameters) => {
        // Remove callback function from parameters for param matching purposes
        const parametersWithoutCallback = (typeof parameters[parameters.length - 1] === 'function') ?
          parameters.slice(0, -1) :
          parameters;

        // If the user specified param matchers, don't execute if they are not met
        if (paramMatchers === undefined || deepEqual(parametersWithoutCallback, paramMatchers)) {
          const callback = setupCallback(parameters, [err, data]);
          return new Query(err, data)[queryReturningFunction.queryFunc](callback);
        }
      };
    };

    // Make sure that withParams is chainable so that returns can be called after it
    Model[queryReturningFunction.modelFunc].withParams.returns = Model[queryReturningFunction.modelFunc].returns;
  }

  // Document functions

  Model.prototype.save.returns = (err, doc, numAffected=1) => {
    Model.prototype.save = function (...parameters) {
      // Setup the callback data
      let callbackData;

      // Use model properties for the data or use user-defined data from the mock setup if it was provided
      if (err === undefined || doc === undefined) {
        callbackData = [null, Object.assign({}, this), numAffected];
      }
      else {
        callbackData = [err, doc, numAffected];
      }

      // Setup the callback
      const callback = setupCallback(parameters, callbackData);

      // Call the callback or return a promise
      if (callback) callback();
      else if (err) return Promise.reject(err);
      else return Promise.resolve(callbackData[1]);
    };
  };

  return Model;
};

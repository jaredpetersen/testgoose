'use-strict';

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
          return new Query(err, data)[queryReturningFunction.queryFunc](callback);
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

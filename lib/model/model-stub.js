'use-strict';

const modelQueryFunctions = require('./model-query-functions');
const Query = require('../query/query-stub');

module.exports = (modelName, schema) => {
  class Model {
    static get modelName() { return modelName; }
    static get schema() { return schema; }
    save() {}
  }

  // Set up some generic helper functions

  // Get the callback function out of a list of parameters if one exists
  const parseCallback = (parameters) => {
    const lastParam = parameters[parameters.length - 1];
    return (typeof lastParam === 'function') ? lastParam : null;
  };

  // Set up all of the functions that return a query

  for (const modelQueryFunction of modelQueryFunctions) {
    // Set up the query function on the class
    Model[modelQueryFunction.name] = () => {};

    // Add the returns() function to specify what the stub should return (without an argument matcher)
    Model[modelQueryFunction.name].returns = (err, data) => {
      // Override the stub behavior and remove the ability to define it again
      Model[modelQueryFunction.name] = (...parameters) => {
        const callback = parseCallback(parameters);
        const query = new Query();
        query.returns(err, data);
        return query[modelQueryFunction.queryName](callback);
      };
    };
  }

  // Set up all of the document-based functions

  Model.prototype.save.returns = (err, doc) => {
    Model.prototype.save = function (...parameters) {
      // Use model properties for the data or use user-defined data from the mock setup if it was provided
      const callbackData = (err === undefined || doc === undefined) ?
        { err: null, doc: Object.assign({}, this) } :
        { err, doc };

      // Get the callback function from the parameters
      const callback = parseCallback(parameters);

      // Call the callback or return a promise
      if (callback) callback(callbackData.err, callbackData.doc);
      else if (err) return Promise.reject(callbackData.err);
      else return Promise.resolve(callbackData.doc);
    };
  };

  return Model;
};

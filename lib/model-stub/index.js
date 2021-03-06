'use-strict';

const modelQueryFunctions = require('../function-mappings/model-query-functions');
const queryStub = require('../query-stub');
const callbackUtil = require('../util/callback-util');

module.exports = (modelName, schema) => {
  class Model {
    constructor(doc) {
      // Remove the proto object so that the mock cannot be redefined after it is instantiated
      delete Model.proto;

      // Add any passed in document key/values to the object
      for (const key in doc) {
        this[key] = doc[key];
      }
    }

    static get modelName() {
      return modelName;
    }

    static get schema() {
      return schema;
    }
  }

  // Set up the objects that will contain the assertion functions used by testers
  Model.static = {};
  Model.proto = {};

  // Set up all of the static query functions

  for (const modelQueryFunction of modelQueryFunctions) {
    Model.static[modelQueryFunction.name] = {};
    Model.static[modelQueryFunction.name].returns = (err, data) => {
      // Create a new query for each model query function since each query stub can only have one definition
      const Query = queryStub();
      Query.proto.returns(err, data);
      const query = new Query();

      Model[modelQueryFunction.name] = (...args) => {
        return query[modelQueryFunction.queryName](...args);
      };
    };
  }

  // Set up all of the document-based functions

  Model.proto.save = {};
  Model.proto.save.returns = (err, doc) => {
    Model.prototype.save = function (...args) {
      // Use model properties for the data or use user-defined data from the mock setup if it was provided
      const callbackData = (err === undefined || doc === undefined) ?
        { err: null, doc: Object.assign({}, this) } :
        { err, doc };

      const callback = callbackUtil.getCallback(args);

      if (callback) callback(callbackData.err, callbackData.doc);
      else if (err) return Promise.reject(callbackData.err);
      else return Promise.resolve(callbackData.doc);
    };
  };

  return Model;
};

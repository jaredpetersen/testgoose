'use-strict';

const modelQueryFunctions = require('./model-query-functions');
const queryStub = require('../query/query-stub');
const callbackUtil = require('../util/callback-util');

module.exports = (modelName, schema) => {
  const Query = queryStub();

  class Model {
    constructor() {
      // Remove the proto object so that the mock cannot be redefined after it is instantiated
      delete Model.proto;
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
      Model[modelQueryFunction.name] = (...args) => {
        Query.proto.returns(err, data);
        const query = new Query();
        return query[modelQueryFunction.queryName](...args);
      };
    };
  }

  // Set up all of the document-based functions

  Model.proto.save = { argMatchers: [] };
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

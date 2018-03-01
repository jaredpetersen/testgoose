'use-strict';

const modelQueryFunctions = require('./model-query-functions');
const queryStub = require('../query/query-stub');
const callbackUtil = require('../util/callback-util');

module.exports = (modelName, schema) => {
  const Query = queryStub();

  class Model {
    static get modelName() { return modelName; }
    static get schema() { return schema; }
  }

  // Set up all of the static query functions

  for (const modelQueryFunction of modelQueryFunctions) {
    Model[modelQueryFunction.name] = () => {};

    Model[modelQueryFunction.name].returns = (err, data) => {
      Model[modelQueryFunction.name] = (...args) => {
        Query.returns(err, data);
        const query = new Query();
        return query[modelQueryFunction.queryName](...args);
      };
    };
  }

  // Set up all of the document-based functions

  // prototype.save

  Model.prototype.save = () => {};

  Model.prototype.save.returns = (err, doc) => {
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

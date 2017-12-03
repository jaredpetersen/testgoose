'use strict';

const Query = require('./lib/Query');

module.exports.mock = () => {
  // Mongoose Model docs: http://mongoosejs.com/docs/api.html#model-js
  // Mongoose Model code: https://github.com/Automattic/mongoose/blob/master/lib/model.js

  // Mock the Mongoose Model
  class ModelMock {
    static find() {}
    static findById() {}
    save() {}
  }

  // Wrap the callback function so that we don't actually call it yet
  const wrapCallback = (callback, args) => {
    return () => callback.apply(null, args);
  };

  // Define the behavior of each of the model functions

  ModelMock.find.returns = (err, docs) => {
    ModelMock.find = (...parameters) => {
      // Grab the last parameter which should be a callback function unless
      // promises are used
      let callback = parameters[parameters.length - 1];

      if (typeof callback === 'function') {
        // It is a callback function -- wrap it for passing to QueryMock
        callback = wrapCallback(callback, [err, docs]);
      }
      else {
        // Not a callback function so we must be using promises
        callback = null;
      }

      // Return a query
      return new Query(err, docs).find(callback);
    };
  };

  ModelMock.findById.returns = (err, doc) => {
    ModelMock.findById = (...parameters) => {
      // Callback is always the last argument in the list
      const callback = parameters[parameters.length - 1];
      callback(err, doc);
    };
  };

  ModelMock.prototype.save.returns = (err, doc, numAffected=1) => {
    ModelMock.prototype.save = function (...parameters) {
      // Callback is always the last argument in the list
      const callback = parameters[parameters.length - 1];

      if (err === undefined || doc === undefined) {
        // User did not specify callback values so use the object properties
        callback(null, Object.assign({}, this), numAffected);
      }
      else {
        // User specified callback values so honor them
        callback(err, doc, numAffected);
      }
    };
  };

  return ModelMock;
};

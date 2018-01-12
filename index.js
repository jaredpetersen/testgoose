'use strict';

const Query = require('./lib/Query');

module.exports.mock = () => {
  // Mongoose Model docs: http://mongoosejs.com/docs/api.html#model-js
  // Mongoose Model code: https://github.com/Automattic/mongoose/blob/master/lib/model.js

  // Mock the Mongoose Model
  class ModelMock {
    static find() {}
    static findById() {}
    static findByIdAndRemove() {}
    static findByIdAndUpdate() {}
    save() {}
  }

  // Parse out the callback from the model function call and prepare it for
  // later use
  const setupCallback = (parameters, callbackData) => {
    // Grab the last parameter which should be a callback function unless
    // promises are used
    let lastParam = parameters[parameters.length - 1];

    if (typeof lastParam === 'function') {
      // It is a callback function --
      // wrap it with the right data for passing to QueryMock
      return () => lastParam.apply(null, callbackData);
    }
    else {
      // Not a callback function so we must be using promises
      return null;
    }
  };

  // Set up a `returns` on supported Mongoose Model functions that allows users to override behavior

  // Model functions

  ModelMock.find.returns = (err, docs) => {
    ModelMock.find = (...parameters) => {
      const callback = setupCallback(parameters, [err, docs]);
      return new Query(err, docs).find(callback);
    };
  };

  ModelMock.findById.returns = (err, doc) => {
    ModelMock.findById = (...parameters) => {
      const callback = setupCallback(parameters, [err, doc]);
      return new Query(err, doc).findOne(callback);
    };
  };

  ModelMock.findByIdAndRemove.returns = (err, doc) => {
    ModelMock.findByIdAndRemove = (...parameters) => {
      const callback = setupCallback(parameters, [err, doc]);
      return new Query(err, doc).findOneAndRemove(callback);
    };
  };

  ModelMock.findByIdAndUpdate.returns = (err, doc) => {
    ModelMock.findByIdAndUpdate = (...parameters) => {
      const callback = setupCallback(parameters, [err, doc]);
      return new Query(err, doc).findOneAndUpdate(callback);
    };
  };

  // Document functions

  ModelMock.prototype.save.returns = (err, doc, numAffected=1) => {
    ModelMock.prototype.save = function (...parameters) {
      // Setup the callback data
      let callbackData;

      // Use model properties for the data or use user-defined data
      // from the mock setup if it was provided
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

  return ModelMock;
};

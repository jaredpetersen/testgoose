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

  // Parse out the callback from the model function call and prepare it for
  // later use
  const setupCallback = (parameters, callbackData) => {
    // Grab the last parameter which should be a callback function unless
    // promises are used
    let lastParam = parameters[parameters.length - 1];

    // Callback we will be setting up
    let callback;

    if (typeof lastParam === 'function') {
      // It is a callback function --
      // wrap it with the right data for passing to QueryMock
      callback = () => lastParam.apply(null, callbackData);
    }
    else {
      // Not a callback function so we must be using promises
      callback = null;
    }

    return callback;
  };

  // Define the behavior of each of the model functions

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

  ModelMock.prototype.save.returns = (err, doc, numAffected=1) => {
    ModelMock.prototype.save = function (...parameters) {
      let callback;
      let callbackDoc;

      if (err === undefined || doc === undefined) {
        // Use model properties since we weren't given any
        callbackDoc = Object.assign({}, this);
        callback = setupCallback(parameters, [null, callbackDoc, numAffected]);
      }
      else {
        // Use user-defined data for the callback
        callbackDoc = doc;
        callback = setupCallback(parameters, [err, doc, numAffected]);
      }

      if (callback == null) {
        // Return a promise if a callback function was not provided
        if (err) {
          return Promise.reject(err);
        }
        else {
          return Promise.resolve(callbackDoc);
        }
      }
      else {
        // Use the callback
        callback();
      }
    };
  };

  return ModelMock;
};

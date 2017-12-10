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
  const setupCallback = (parameters, err, data) => {
    // Grab the last parameter which should be a callback function unless
    // promises are used
    let lastParam = parameters[parameters.length - 1];

    // Callback we will be setting up
    let callback;

    if (typeof lastParam === 'function') {
      // It is a callback function --
      // wrap it with the right data for passing to QueryMock
      callback = () => lastParam.apply(null, [err, data]);
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
      const callback = setupCallback(parameters, err, docs);
      return new Query(err, docs).find(callback);
    };
  };

  ModelMock.findById.returns = (err, doc) => {
    ModelMock.findById = (...parameters) => {
      const callback = setupCallback(parameters, err, doc);
      return new Query(err, doc).findOne(callback);
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

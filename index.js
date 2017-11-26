'use strict';

module.exports.mock = () => {
  // Mongoose model docs: http://mongoosejs.com/docs/api.html#model-js
  // Mongoose model code: https://github.com/Automattic/mongoose/blob/master/lib/model.js

  // Mock of the Mongoose model
  class ModelMock {
    static find() {}
    static findById() {}
    save() {}
  }

  // Define the behavior of each of the model functions

  ModelMock.find.returns = (err, docs) => {
    ModelMock.find = (...parameters) => {
      // Callback is always the last argument in the list
      const callback = parameters[parameters.length - 1];
      callback(err, docs);
    };
  };

  ModelMock.findById.returns = (err, doc) => {
    ModelMock.findById = (...parameters) => {
      // Callback is always the last argument in the list
      const callback = parameters[parameters.length - 1];
      callback(err, doc);
    };
  };

  ModelMock.prototype.save.returns = (err, doc) => {
    ModelMock.prototype.save = function (...parameters) {
      // Callback is always the last argument in the list
      const callback = parameters[parameters.length - 1];

      if (err === undefined || doc === undefined) {
        // User did not specify callback values so use the object properties
        callback(null, Object.assign({}, this));
      }
      else {
        // User specified callback values so honor them
        callback(err, doc);
      }
    };
  };

  return ModelMock;
};

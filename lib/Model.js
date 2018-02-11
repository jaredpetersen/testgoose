'use strict';

// Mongoose Model docs: http://mongoosejs.com/docs/api.html#model-js
// Mongoose Model code: https://github.com/Automattic/mongoose/blob/master/lib/model.js

class Model {
  static find() {}
  static findById() {}
  static findByIdAndRemove() {}
  static findByIdAndUpdate() {}
  static get modelName() { return modelName; }
  static get schema() { return schema; }

  save() {}
}

module.exports = Model;

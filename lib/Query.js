'use strict';

// Mongoose Query docs: http://mongoosejs.com/docs/api.html#query-js
// Mongoose Query code: https://github.com/Automattic/mongoose/blob/master/lib/query.js

class Query {
  constructor(err, data) {
    this.err = err;
    this.data = data;
  }

  find(callback) {
    if (callback != null) {
      return callback();
    }

    return this;
  }

  then(resolve, reject) {
    return this.exec().then(resolve, reject);
  }

  exec(...parameters) {
    const lastParam = parameters[parameters.length - 1];

    if (typeof lastParam === 'function') {
      // User specified a callback, use it
      lastParam(this.err, this.data);
    }
    else if (this.err != null) {
      return Promise.reject(this.err);
    }
    else {
      return Promise.resolve(this.data);
    }
  }
}

module.exports = Query;

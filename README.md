# mongoose-model-mock
[![Build Status](https://travis-ci.org/jaredpetersen/mongoose-model-mock.svg?branch=master)](https://travis-ci.org/jaredpetersen/mongoose-model-mock)
[![NPM Version](https://img.shields.io/npm/v/mongoose-model-mock.svg)](https://www.npmjs.com/package/mongoose-model-mock)

mongoose-model-mock is a testing library that helps you mock [Mongoose](http://mongoosejs.com/) models so that your unit tests never have to hit a real MongoDB database ([in-memory](https://github.com/mockgoose/mockgoose) or otherwise).

## Installation
```
npm install mongoose-model-mock
```

## Usage
### Getting Started
```javascript
const modelmock = require('mongoose-model-mock');

// Mock out the Mongoose Task model
const TaskMock = modelmock.mock();
TaskMock.find.returns(null, [ { id: 1234, name: "fix gutters" }, { id: 1234, name: "paint bathroom" } ]);

// Call the Task model mock just like a real Mongoose model
TaskMock.find('__v', (err, tasks) => {
  if (err) return next(err);
  res.json(tasks);
});
```

Using mongoose-model-mock is easy and doesn't require the usage of other mocking libraries like [Sinon.js](http://sinonjs.org/) to make it work. Just create your mock, define its behavior, and [proxyquire](https://github.com/thlorenz/proxyquire) it in to your module under test as needed.

To define the behavior of your mock, specify the name of the Mongoose function that needs its behavior to be defined and call `.returns()` on it, e.g. `mymock.findById.returns(error, data)`. To define the behavior of document functions, specify `.prototype` and then the name of the function, e.g. `mymock.prototype.save.returns(error, data)`. When the function under test calls your mocked model, the model will return the data that was specified via the model function's callback or via a promise that can be handled.

Defining the behavior in this way even works with query chains like `Task.find().where('priority').gt(10).exec()`.

### Documentation
For more specific information on the available mongoose-model-mock functions, check out the [docs](/docs).

### Examples
To help you get started faster and give you an idea of how mongoose-model-mock can be used in a real world application, we've provided a simple [Express.js](https://expressjs.com/) REST API example that utilizes mongoose-model-mock to unit test its controllers. Check out `examples/api` to learn more.

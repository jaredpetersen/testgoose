# testgoose
[![Build Status](https://travis-ci.org/jaredpetersen/testgoose.svg?branch=master)](https://travis-ci.org/jaredpetersen/testgoose)
[![NPM Version](https://img.shields.io/npm/v/testgoose.svg)](https://www.npmjs.com/package/testgoose)

testgoose is a testing library that helps you stub and mock [Mongoose](http://mongoosejs.com/) models so that your unit tests never have to hit a real MongoDB database ([in-memory](https://github.com/mockgoose/mockgoose) or otherwise).

## Installation
```
npm install testgoose --save-dev
```

## Usage
### Getting Started
Using testgoose is easy and doesn't require the usage of other mocking libraries like [Sinon.js](http://sinonjs.org/) to make it work. Just create your stub/mock, define its behavior, and [proxyquire](https://github.com/thlorenz/proxyquire) it in to your module under test as needed.

#### Model Stubs
```javascript
const testgoose = require('testgoose');

// Stub out the Mongoose Task model
const TaskStub = testgoose.model.stub();
TaskStub.findById.returns(null, { id: 1234, name: "fix gutters", priority: 4 });

// Call the Task model stub just like a real Mongoose model
TaskStub.findById(1234, (err, task) => {
  if (err) return next(err);
  res.json(task);
});
```

To define the behavior of your stub, specify the name of the Mongoose function that needs its behavior to be defined and call `.returns()` on it, e.g. `MyStub.find.returns(error, data)`. For document functions, specify `.prototype` and then the name of the function, e.g. `MyStub.prototype.save.returns(error, data)`. When the function under test calls your stubbed model, the model will return the data that was specified via the model function's callback or via a promise.

This even works with query chains. With a model stub, you don't need to specify the exact query chain that comes after; you just need to define the behavior of top-level model function. Whatever query comes after it will be resolved with the data that you specified. This allows you to write tests that aren't tightly coupled to the implementation of the system under test.

```javascript
const testgoose = require('testgoose');

// Set up the data that the model should return
const errStub = null;
const dataStub = [
  { id: 1234, name: "fix gutters", priority: 4 },
  { id: 5678, name: "paint bathroom", priority: 21 }
];

// Stub out the Mongoose Task model
const TaskStub = testgoose.model.stub();
TaskStub.find.returns(errStub, dataStub);

// Call the Task model stub just like a real Mongoose model
TaskStub.find().where('priority').gt(10)
  .then(task => {
    res.json(task);
  })
  .catch(err => {
    return next(err);
  });
});
```

#### Model Mocks
```javascript
const testgoose = require('testgoose');

// Mock out the Mongoose Task model
const TaskMock = testgoose.model.mock();
TaskMock.findById.withArgs(1234).returns(null, { id: 1234, name: "fix gutters" });

// Call the Task model mock just like a real Mongoose model
TaskMock.findById(1234, (err, task) => {
  if (err) return next(err);
  res.json(task);
});
```

Model mocks work the exact same as model stubs but with one exception: you must use argument matchers to specify the arguments that you expect your mock to be called with.

To define the behavior of your mock, specify the name of the Mongoose function that needs its behavior defined and call `.withArgs()` on it with the arguments that you expect and then `.returns()` with the data you want the mock to return, e.g. `MyStub.find.withArgs('__v').returns(error, data)`. If the mock is called the exact same way that it was defined, the mock will return the data that was specified. If the mock is invoked in a way that you did not define during the mock setup, the mock will throw an error. This ensures that the system under test uses your mock correctly.

The requirement to specify argument matchers extends to queries as well:

```javascript
const testgoose = require('testgoose');

// Set up the data that the model should return
const errStub = null;
const dataStub = [
  { id: 1234, name: "fix gutters", priority: 4 },
  { id: 5678, name: "paint bathroom", priority: 21 }
];

// Mock out the Mongoose Task model
const TaskMock = testgoose.model.mock();
TaskMock
  .find.withArgs(1234)
  .where.withArgs('priority')
  .gt.withArgs(10)
  .returns(errStub, dataStub);

// Call the Task model mock just like a real Mongoose model
TaskMock.find().where('priority').gt(10)
  .then(tasks => {
    res.json(tasks);
  })
  .catch(err => {
    return next(err);
  });  
});
```

Since the model mock uses argument matchers to determine the data that it should return, you are also able to define multiple matchers:

```javascript
const testgoose = require('testgoose');

// Mock out the Mongoose Task model
const TaskMock = testgoose.model.mock();
TaskMock.findById.withArgs(1234).returns(null, { id: 1234, name: "fix gutters", priority: 4 });
TaskMock.findById.withArgs(5678).returns(null, { id: 5678, name: "paint bathroom", priority: 21 });

// Call the Task model mock just like a real Mongoose model

TaskMock.findById(1234)
  .then(tasks => {
    res.json(tasks);
  })
  .catch(err => {
    return next(err);
  });  
});

TaskMock.findById(5678)
  .then(tasks => {
    res.json(tasks);
  })
  .catch(err => {
    return next(err);
  });  
});
```

**We advise that you generally stick to stubs when possible** as mocks tightly couple your tests to the system under test. This is sometimes necessary though in order to assert that the system under test is performing correctly.

At this point in time, the argument matchers must be the exact same as the data that is coming in. In the future, we'd like to also support matchers like `testgoose.match.string` for any string, `testgoose.match.boolean` for any boolean, `testgoose.match.number` for any number, etc. to alleviate the level of coupling. Look forward to an update on this in the future.

### Documentation
For more specific information on the available testgoose functions, check out the [docs](/docs).

### Examples
To help you get started faster and give you an idea of how testgoose can be used in a real world application, we've provided a simple [Express.js](https://expressjs.com/) REST API example that utilizes testgoose to unit test its controllers. Check out [examples/api](/examples/api) to learn more.

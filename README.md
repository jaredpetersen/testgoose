# testgoose
[![Build Status](https://travis-ci.org/jaredpetersen/testgoose.svg?branch=master)](https://travis-ci.org/jaredpetersen/testgoose)
[![NPM Version](https://img.shields.io/npm/v/testgoose.svg)](https://www.npmjs.com/package/testgoose)

testgoose is a testing library that helps you stub and mock [Mongoose](http://mongoosejs.com/) models and queries so that your unit tests never have to hit a real MongoDB database ([in-memory](https://github.com/mockgoose/mockgoose) or otherwise).

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
TaskStub.static.findById.returns(null, { id: 1234, name: "fix gutters", priority: 4 });

// Call the Task model stub just like a real Mongoose model
TaskStub.findById(1234, (err, task) => {
  if (err) return next(err);
  res.json(task);
});
```

Model stubs are a great way of unit testing an application that relies on Mongoose [Models](http://mongoosejs.com/docs/api.html#Model) because they're flexible and don't tightly couple your test code to the unit under test.

To use a model stub, all you have to do is:
1. Create a model stub with `testgoose.model.stub()`
2. Specify the type of the Mongoose model function that needs its behavior defined (`proto` for document functions and `static` for static functions)
3. Specify the name of the model function
4. Call `.returns()` to define the data that the stub should return any time the previous function is invoked

Any time the mock's defined function is invoked, the data that was defined will be returned either through the provided callback or through a promise (whichever the unit under test specifies). If there are queries that are chained off of the model function in the system under test, the queries will be resolved with the defined data as well. This allows you to write flexible tests that don't need to be rewritten every time a minor change to a query is made.

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
TaskStub.static.find.returns(errStub, dataStub);

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
TaskMock
  .static.findById.withArgs(1234)
  .returns(null, { id: 1234, name: "fix gutters" });

// Call the Task model mock just like a real Mongoose model
TaskMock.findById(1234, (err, task) => {
  if (err) return next(err);
  res.json(task);
});
```

Model mocks work the exact same as model stubs but with one exception: you must use argument matchers to specify the arguments on every function you expect mock to be called with.

Defining the argument expectations and behavior of your mock is pretty simple. Here's how to do it:
1. Create a model mock with `testgoose.model.mock()`
2. Specify the type of the Mongoose model function that needs its behavior defined (`proto` for document functions and `static` for static functions)
3. Specify the name of the model function
4. Call `.withArgs()` on it and provide it with the arguments you expect your mock to be called with
5. Call `.returns()` to define the data that the mock should return any time the sequence of Mongoose [Model](http://mongoosejs.com/docs/api.html#Model) and [Query](http://mongoosejs.com/docs/api.html#Query) functions are invoked

If your mock is called the exact same way that you defined it, the mock will return the data that you specified. If the mock is invoked in a way that you did not define during the mock setup, the mock will immediately throw an error. This ensures that the unit under test uses your mock correctly.

Model mocks also support mocking the [Query](http://mongoosejs.com/docs/api.html#Query) that is returned by some Model functions. All you need to do is continue your assertion chain off of the original function:

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
  .static.find.withArgs()
  .proto.where.withArgs('priority')
  .proto.gt.withArgs(10)
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

Since the model mock uses argument matchers to determine the data that it should return, you are also able to define the multiple behaviors for the same top-level Model function of the mock:

```javascript
const testgoose = require('testgoose');

const TaskMock = testgoose.model.mock();

TaskMock
  .static.findById.withArgs(1234)
  .returns(null, { id: 1234, name: "fix gutters", priority: 4 });

TaskMock
  .static.findById.withArgs(5678)
  .returns(null, { id: 5678, name: "paint bathroom", priority: 21 });

TaskMock
  .static.find.withArgs({ name: /fix/i })
  .proto.where.withArgs('priority')
  .proto.lt.withArgs(18)
  .returns(new Error('something went wrong'), null);

TaskMock
  .static.find.withArgs({ name: /fix/i })
  .proto.where.withArgs('priority')
  .proto.lt.withArgs(100)
  .returns(new Error('another thing went wrong'), null);

// Call the Task model mock like a real Mongoose model
```

**We advise that you generally stick to stubs when possible** as mocks tightly couple your tests to the unit under test. This is sometimes necessary though in order to assert that the unit under test is behaving correctly.

At this point in time, the argument matchers provided to `withArgs()` must be the exact same as the data that is coming in. In the future, we'd like to also support matchers like `testgoose.match.string` for any string, `testgoose.match.boolean` for any boolean, `testgoose.match.number` for any number, etc. to alleviate the level of coupling. Look forward to an update on this in the future.

### Documentation
For more specific information on the available testgoose functions, check out the [docs](/docs).

### Examples
To help you get started faster and give you an idea of how testgoose can be used in a real world application, we've provided a simple [Express.js](https://expressjs.com/) REST API example that utilizes testgoose to unit test its controllers. Check out [examples/api](/examples/api) to learn more.

# mongoose-model-mock
mongoose-model-mock is a testing library that helps you mock [Mongoose](http://mongoosejs.com/) models so that your unit tests never have to hit a real MongoDB database ([in-memory](https://github.com/mockgoose/mockgoose) or otherwise).

## Installation
```
npm install mongoose-model-mock
```

## Usage
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

To define the behavior of your mock, specify the name of the Mongoose function that needs its behavior to be defined and call `.returns()` on it, e.g. `mymock.findById.returns(error, data)`. When the function under test calls your mocked model, the model will return the data that was specified via the model callback.

### Supported Model Methods
* [Model.find](http://mongoosejs.com/docs/api.html#model_Model.find)
* [Model.findById](http://mongoosejs.com/docs/api.html#model_Model.findById)

## Examples
To help you get started faster, we've provided a simple [Express.js](https://expressjs.com/) REST API example that utilizes mongoose-model-mock to unit test its controllers. Check out `examples/api` to learn more.

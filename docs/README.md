# testgoose
## model.stub()
Creates a stub of a Mongoose [Model](http://mongoosejs.com/docs/api.html#model-js).

### Parameters
- `modelName` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** name of the model to be returned (optional, default `undefined`)
- `schema` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** schema of the model to be returned (optional, default `undefined`)

### Example
```javascript
const testgoose = require('mongoose-model-mock');
const MyMock = testgoose.model.mock();
```
```javascript
const testgoose = require('mongoose-model-mock');
const MyMock = testgoose.model.mock('Task', {key: 'value'});
```

### Returns
Returns [Model Stub](/docs/MODEL-STUB.md).


## model.mock()
Creates a mock of a Mongoose [Model](http://mongoosejs.com/docs/api.html#model-js).

### Parameters
- `modelName` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** name of the model to be returned (optional, default `undefined`)
- `schema` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** schema of the model to be returned (optional, default `undefined`)

### Example
```javascript
const testgoose = require('mongoose-model-mock');
const MyMock = testgoose.model.mock();
```
```javascript
const testgoose = require('mongoose-model-mock');
const MyMock = testgoose.model.mock('Task', {key: 'value'});
```

### Returns
Returns [Model Mock](/docs/MODEL-MOCK.md).

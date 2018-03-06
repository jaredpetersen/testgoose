# testgoose
## model.stub()
Creates a stub of a Mongoose [Model](http://mongoosejs.com/docs/api.html#model-js).

### Parameters
- `modelName` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** name of the model to be returned (optional, default `undefined`)
- `schema` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** schema of the model to be returned (optional, default `undefined`)

### Example
```javascript
const testgoose = require('testgoose');
const MyStub = testgoose.model.stub();
```
```javascript
const testgoose = require('testgoose');
const MyStub = testgoose.model.stub('Task', {key: 'value'});
```

### Returns
Returns [Model Stub](/docs/model-stub.md).


## model.mock()
Creates a mock of a Mongoose [Model](http://mongoosejs.com/docs/api.html#model-js).

### Parameters
- `modelName` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** name of the model to be returned (optional, default `undefined`)
- `schema` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** schema of the model to be returned (optional, default `undefined`)

### Example
```javascript
const testgoose = require('testgoose');
const MyMock = testgoose.model.mock();
```
```javascript
const testgoose = require('testgoose');
const MyMock = testgoose.model.mock('Task', {key: 'value'});
```

### Returns
Returns [Model Mock](/docs/model-mock.md).


## query.stub()
Creates a stub of a Mongoose [Query](http://mongoosejs.com/docs/api.html#Query).

### Parameters
None

### Example
```javascript
const testgoose = require('testgoose');
const MyStub = testgoose.query.stub();
```

### Returns
Returns [Query Stub](/docs/query-stub.md).


## query.mock()
Creates a mock of a Mongoose [Query](http://mongoosejs.com/docs/api.html#Query).

### Parameters
None

### Example
```javascript
const testgoose = require('testgoose');
const MyMock = testgoose.query.mock();
```

### Returns
Returns [Query Mock](/docs/query-mock.md).

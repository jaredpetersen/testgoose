# mongoose-model-mock
## mock
Creates a mock of a Mongoose [Model](http://mongoosejs.com/docs/api.html#model-js).

### Parameters
- `modelName` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** name of the model to be returned (optional, default `undefined`)
- `schema` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** schema of the model to be returned (optional, default `undefined`)

### Example
```javascript
const modelmock = require('mongoose-model-mock');
const MyMock = modelmock.mock();
```
```javascript
const modelmock = require('mongoose-model-mock');
const MyMock = modelmock.mock('Task', {key: 'value'});
```

### Returns
Returns [Model](/docs/MODEL.md)

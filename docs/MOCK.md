# Mock
Mock of Mongoose [Model](http://mongoosejs.com/docs/api.html#model-js). To get your module under test to require it instead of the real Mongoose Model, use [proxyquire](https://github.com/thlorenz/proxyquire):
```javaScript
const proxyquire = require('proxyquire').noCallThru();
const modelmock = require('mongoose-model-mock');

const TaskMock = modelmock.mock();
// Define mock behavior

const taskController = proxyquire('../controllers/task', { '../models/task': TaskMock } );
// Call the function under test and make assertions
```

## find.returns
Define the data returned from Mongoose [Model.find](http://mongoosejs.com/docs/api.html#model_Model.find).

##### Parameters
- `err` **[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)** error to be returned by the find callback
- `docs` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)>** documents to be returned by the find callback

##### Example
```javascript
const modelmock = require('mongoose-model-mock');
const ProductMock = modelmock.mock();
ProductMock.find.returns(new Error('something bad happened'), null);
```

```javascript
const modelmock = require('mongoose-model-mock');
const ProductMock = modelmock.mock();
const productData = [
  { _id: '507f191e810c19729de860ea', name: 'banana' },
  { _id: '5a16602357c05c3a06a4dca8', name: 'orange' }
];
ProductMock.find.returns(null, productData);
```

## findById.returns
Define the data returned from Mongoose [Model.findById](http://mongoosejs.com/docs/api.html#model_Model.findById).

##### Parameters
- `err` **[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)** error to be returned by the findById callback
- `doc` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** document to be returned by the findById callback

##### Example
```javascript
const modelmock = require('mongoose-model-mock');
const UserMock = modelmock.mock();
UserMock.findById.returns(new Error('something bad happened'), null);
```

```javascript
const modelmock = require('mongoose-model-mock');
const UserMock = modelmock.mock();
UserMock.findById.returns(null, { _id: '507f1f77bcf86cd799439011', firstName: 'Sally', lastName: 'Saltwater' });
```

## prototype.save.returns
Define the data returned from Mongoose [Model#save](http://mongoosejs.com/docs/api.html#model_Model-save). If no data is specified, the mock Model instance will use the properties assigned to it instead to return a new object

##### Parameters
- `err` **[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)** error to be returned by the save callback
- `doc` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** document to be returned by the save callback

##### Example
```javascript
const modelmock = require('mongoose-model-mock');
const CarMock = modelmock.mock();
CarMock.prototype.save.returns(new Error('something bad happened'), null);
```

```javascript
const modelmock = require('mongoose-model-mock');
const TaskMock = modelmock.mock();
CarMock.prototype.save.returns(null, { vin: '1B7HC16Z6SS365053', color: 'viper red' });
```

```javascript
const modelmock = require('mongoose-model-mock');
const TaskMock = modelmock.mock();
CarMock.prototype.save.returns();
```

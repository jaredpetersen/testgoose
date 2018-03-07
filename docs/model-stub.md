# ModelStub
Stub of Mongoose [Model](http://mongoosejs.com/docs/api.html#model-js). To get your module under test to require it instead of the real Mongoose Model, use [proxyquire](https://github.com/thlorenz/proxyquire):
```javaScript
const proxyquire = require('proxyquire').noCallThru();
const testgoose = require('testgoose');

const TaskStub = testgoose.model.stub();
// Define stub behavior

const taskController = proxyquire('../controllers/task', { '../models/task': TaskStub } );
// Call the function under test and make assertions
```


## static.find.returns()
Define the data returned from Mongoose [Model.find](http://mongoosejs.com/docs/api.html#model_Model.find). Any additional query functions chained off of it in the system under test will return the specified data.

### Parameters
- `err` **[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)** error to be returned by the find callback
- `docs` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)>** documents to be returned by the find callback

### Returns
**[undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)**

### Example
```javascript
const testgoose = require('testgoose');
const ProductStub = testgoose.model.stub();
ProductStub.static.find.returns(new Error('something bad happened'), null);
```

```javascript
const testgoose = require('testgoose');
const ProductStub = testgoose.model.stub();
const productData = [
  { _id: '507f191e810c19729de860ea', name: 'banana' },
  { _id: '5a16602357c05c3a06a4dca8', name: 'orange' }
];
ProductStub.static.find.returns(null, productData);
```


## static.findById.returns()
Define the data returned from Mongoose [Model.findById](http://mongoosejs.com/docs/api.html#model_Model.findById). Any additional query functions chained off of it in the system under test will return the specified data.

### Parameters
- `err` **[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)** error to be returned by the findById callback
- `doc` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** document to be returned by the findById callback

### Returns
**[undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)**

### Example
```javascript
const testgoose = require('testgoose');
const UserStub = testgoose.model.stub();
UserStub.static.findById.returns(new Error('something bad happened'), null);
```

```javascript
const testgoose = require('testgoose');
const UserStub = testgoose.model.stub();
UserStub.static.findById.returns(null, { _id: '507f1f77bcf86cd799439011', firstName: 'Sally', lastName: 'Saltwater' });
```


## static.findByIdAndRemove.returns()
Define the data returned from Mongoose [Model.findByIdAndRemove](http://mongoosejs.com/docs/api.html#model_Model.findByIdAndRemove). Any additional query functions chained off of it in the system under test will return the specified data.

### Parameters
- `err` **[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)** error to be returned by the findByIdAndRemove callback
- `doc` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** document to be returned by the findByIdAndRemove callback

### Returns
**[undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)**

### Example
```javascript
const testgoose = require('testgoose');
const UserStub = testgoose.model.stub();
UserStub.static.findByIdAndRemove.returns(new Error('something bad happened'), null);
```

```javascript
const testgoose = require('testgoose');
const UserStub = testgoose.model.stub();
UserStub
  .static.findByIdAndRemove
  .returns(null, { _id: '507f1f77bcf86cd799439011', firstName: 'Sally', lastName: 'Saltwater' });
```


## static.findByIdAndUpdate.returns()
Define the data returned from Mongoose [Model.findByIdAndUpdate](http://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate). Any additional query functions chained off of it in the system under test will return the specified data.

### Parameters
- `err` **[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)** error to be returned by the findByIdAndUpdate callback
- `doc` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** document to be returned by the findByIdAndUpdate callback

### Returns
**[undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)**

### Example
```javascript
const testgoose = require('testgoose');
const UserStub = testgoose.model.stub();
UserStub
  .static.findByIdAndUpdate
  .returns(new Error('something bad happened'), null);
```

```javascript
const testgoose = require('testgoose');
const UserStub = testgoose.model.stub();
UserStub
  .static.findByIdAndUpdate
  .returns(null, { _id: '507f1f77bcf86cd799439011', firstName: 'Sally', lastName: 'Saltwater' });
```


## proto.save.returns()
Define the data returned from Mongoose [Model#save](http://mongoosejs.com/docs/api.html#model_Model-save). If parameters are not specified, the stub Model instance will use the properties assigned to it instead to return a new object.

### Parameters
- `err` **[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)** error to be returned by the save callback
- `doc` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** document to be returned by the save callback

### Returns
**[undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)**

### Example
```javascript
const testgoose = require('testgoose');
const CarStub = testgoose.model.stub();
CarStub.proto.save.returns(new Error('something bad happened'), null);
```

```javascript
const testgoose = require('testgoose');
const TaskStub = testgoose.model.stub();
CarStub.proto.save.returns(null, { vin: '1B7HC16Z6SS365053', color: 'viper red' });
```

```javascript
const testgoose = require('testgoose');
const TaskStub = testgoose.model.stub();
CarStub.proto.save.returns();
```

# Model Stub
Stub of Mongoose [Model](http://mongoosejs.com/docs/api.html#model-js). To get your module under test to require it instead of the real Mongoose Model, use [proxyquire](https://github.com/thlorenz/proxyquire):
```javaScript
const proxyquire = require('proxyquire').noCallThru();
const testgoose = require('testgoose');

const TaskStub = testgoose.model.stub();
// Define stub behavior

const taskController = proxyquire('../controllers/task', { '../models/task': TaskStub } );
// Call the function under test and make assertions
```


## find.returns()
Define the data returned from Mongoose [Model.find](http://mongoosejs.com/docs/api.html#model_Model.find).

##### Parameters
- `err` **[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)** error to be returned by the find callback
- `docs` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)>** documents to be returned by the find callback

##### Example
```javascript
const testgoose = require('testgoose');
const ProductStub = testgoose.model.stub();
ProductStub.find.returns(new Error('something bad happened'), null);
```

```javascript
const testgoose = require('testgoose');
const ProductStub = testgoose.model.stub();
const productData = [
  { _id: '507f191e810c19729de860ea', name: 'banana' },
  { _id: '5a16602357c05c3a06a4dca8', name: 'orange' }
];
ProductStub.find.returns(null, productData);
```


## findById.returns()
Define the data returned from Mongoose [Model.findById](http://mongoosejs.com/docs/api.html#model_Model.findById).

##### Parameters
- `err` **[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)** error to be returned by the findById callback
- `doc` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** document to be returned by the findById callback

##### Example
```javascript
const testgoose = require('testgoose');
const UserStub = testgoose.model.stub();
UserStub.findById.returns(new Error('something bad happened'), null);
```

```javascript
const testgoose = require('testgoose');
const UserStub = testgoose.model.stub();
UserStub.findById.returns(null, { _id: '507f1f77bcf86cd799439011', firstName: 'Sally', lastName: 'Saltwater' });
```


## findByIdAndRemove.returns()
Define the data returned from Mongoose [Model.findByIdAndRemove](http://mongoosejs.com/docs/api.html#model_Model.findByIdAndRemove).

##### Parameters
- `err` **[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)** error to be returned by the findByIdAndRemove callback
- `doc` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** document to be returned by the findByIdAndRemove callback

##### Example
```javascript
const testgoose = require('testgoose');
const UserStub = testgoose.model.stub();
UserStub.findByIdAndRemove.returns(new Error('something bad happened'), null);
```

```javascript
const testgoose = require('testgoose');
const UserStub = testgoose.model.stub();
UserStub.findByIdAndRemove.returns(null, { _id: '507f1f77bcf86cd799439011', firstName: 'Sally', lastName: 'Saltwater' });
```


## findByIdAndUpdate.returns()
Define the data returned from Mongoose [Model.findByIdAndUpdate](http://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate).

##### Parameters
- `err` **[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)** error to be returned by the findByIdAndUpdate callback
- `doc` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** document to be returned by the findByIdAndUpdate callback

##### Example
```javascript
const testgoose = require('testgoose');
const UserStub = testgoose.model.stub();
UserStub.findByIdAndUpdate.returns(new Error('something bad happened'), null);
```

```javascript
const testgoose = require('testgoose');
const UserStub = testgoose.model.stub();
UserStub.findByIdAndUpdate.returns(null, { _id: '507f1f77bcf86cd799439011', firstName: 'Sally', lastName: 'Saltwater' });
```


## prototype.save.returns()
Define the data returned from Mongoose [Model#save](http://mongoosejs.com/docs/api.html#model_Model-save). If parameters are not specified, the stub Model instance will use the properties assigned to it instead to return a new object.

##### Parameters
- `err` **[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)** error to be returned by the save callback
- `doc` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** document to be returned by the save callback

##### Example
```javascript
const testgoose = require('testgoose');
const CarStub = testgoose.model.stub();
CarStub.prototype.save.returns(new Error('something bad happened'), null);
```

```javascript
const testgoose = require('testgoose');
const TaskStub = testgoose.model.stub();
CarStub.prototype.save.returns(null, { vin: '1B7HC16Z6SS365053', color: 'viper red' });
```

```javascript
const testgoose = require('testgoose');
const TaskStub = testgoose.model.stub();
CarStub.prototype.save.returns();
```

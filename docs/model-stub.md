# ModelStub
Stub of Mongoose [Model](http://mongoosejs.com/docs/api.html#Model). To get your module under test to require it instead of the real Mongoose Model, use [proxyquire](https://github.com/thlorenz/proxyquire):
```javaScript
const proxyquire = require('proxyquire').noCallThru();
const testgoose = require('testgoose');

const TaskStub = testgoose.model.stub();
// Define stub behavior

const taskController = proxyquire('../controllers/task', { '../models/task': TaskStub } );
// Call the function under test and make assertions
```


## `static.remove.returns()`
Define the data returned from Mongoose [Model.remove](http://mongoosejs.com/docs/api.html#remove_remove). Any additional query functions chained off of it in the system under test will return the specified data.

### Parameters
- `err` **[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)** error to be returned
- `data` **Any** data to be returned

### Returns
**[undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)**

### Example
```javascript
const testgoose = require('testgoose');
const ProductStub = testgoose.model.stub();
ProductStub.static.remove.returns(new Error('something bad happened'), null);
```


## `static.deleteOne.returns()`
Define the data returned from Mongoose [Model.deleteOne](http://mongoosejs.com/docs/api.html#deleteone_deleteOne). Any additional query functions chained off of it in the system under test will return the specified data.

### Parameters
- `err` **[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)** error to be returned
- `data` **Any** data to be returned

### Returns
**[undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)**

### Example
```javascript
const testgoose = require('testgoose');
const ProductStub = testgoose.model.stub();
ProductStub.static.deleteOne.returns(new Error('something bad happened'), null);
```


## `static.deleteMany.returns()`
Define the data returned from Mongoose [Model.deleteMany](http://mongoosejs.com/docs/api.html#deletemany_deleteMany). Any additional query functions chained off of it in the system under test will return the specified data.

### Parameters
- `err` **[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)** error to be returned
- `data` **Any** data to be returned

### Returns
**[undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)**

### Example
```javascript
const testgoose = require('testgoose');
const ProductStub = testgoose.model.stub();
ProductStub.static.deleteOne.returns(new Error('something bad happened'), null);
```


## `static.find.returns()`
Define the data returned from Mongoose [Model.find](http://mongoosejs.com/docs/api.html#find_find). Any additional query functions chained off of it in the system under test will return the specified data.

### Parameters
- `err` **[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)** error to be returned
- `data` **Any** data to be returned

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


## `static.findById.returns()`
Define the data returned from Mongoose [Model.findById](http://mongoosejs.com/docs/api.html#findbyid_findById). Any additional query functions chained off of it in the system under test will return the specified data.

### Parameters
- `err` **[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)** error to be returned
- `data` **Any** data to be returned

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
UserStub
  .static.findById
  .returns(null, { _id: '507f1f77bcf86cd799439011', firstName: 'Sally', lastName: 'Saltwater' });
```


## `static.findOne.returns()`
Define the data returned from Mongoose [Model.findOne](http://mongoosejs.com/docs/api.html#findone_findOne). Any additional query functions chained off of it in the system under test will return the specified data.

### Parameters
- `err` **[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)** error to be returned
- `data` **Any** data to be returned

### Returns
**[undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)**

### Example
```javascript
const testgoose = require('testgoose');
const UserStub = testgoose.model.stub();
UserStub
  .static.findOne
  .returns(null, { _id: '507f1f77bcf86cd799439011', firstName: 'Patrick', lastName: 'Pumpernickel' });
```


## `static.count.returns()`
Define the data returned from Mongoose [Model.count](http://mongoosejs.com/docs/api.html#count_count). Any additional query functions chained off of it in the system under test will return the specified data.

### Parameters
- `err` **[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)** error to be returned
- `data` **Any** data to be returned

### Returns
**[undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)**

### Example
```javascript
const testgoose = require('testgoose');
const VacationStub = testgoose.model.stub();
VacationStub.static.count.returns(null, 92);
```


## `static.distinct.returns()`
Define the data returned from Mongoose [Model.distinct](http://mongoosejs.com/docs/api.html#distinct_distinct). Any additional query functions chained off of it in the system under test will return the specified data.

### Parameters
- `err` **[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)** error to be returned
- `data` **Any** data to be returned

### Returns
**[undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)**

### Example
```javascript
const testgoose = require('testgoose');
const EmployeeStub = testgoose.model.stub();
EmployeeStub.static.distinct.returns(new Error('something bad happened'), null);
```


## `static.where.returns()`
Define the data returned from Mongoose [Model.where](http://mongoosejs.com/docs/api.html#where_where). Any additional query functions chained off of it in the system under test will return the specified data.

### Parameters
- `err` **[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)** error to be returned
- `data` **Any** data to be returned

### Returns
**[undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)**

### Example
```javascript
const testgoose = require('testgoose');
const CitizenStub = testgoose.model.stub();
CitizenStub.static.where.returns(new Error('something bad happened'), null);
```


## `static.findOneAndUpdate.returns()`
Define the data returned from Mongoose [Model.findOneAndUpdate](http://mongoosejs.com/docs/api.html#findoneandupdate_findOneAndUpdate). Any additional query functions chained off of it in the system under test will return the specified data.

### Parameters
- `err` **[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)** error to be returned
- `data` **Any** data to be returned

### Returns
**[undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)**

### Example
```javascript
const testgoose = require('testgoose');
const UserStub = testgoose.model.stub();
const
UserStub
  .static.findOneAndUpdate
  .returns(null, { _id: '507f1f77bcf86cd799439011', firstName: 'Gerald', lastName: 'Gumption' });
```


## `static.findByIdAndUpdate.returns()`
Define the data returned from Mongoose [Model.findByIdAndUpdate](http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate). Any additional query functions chained off of it in the system under test will return the specified data.

### Parameters
- `err` **[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)** error to be returned
- `data` **Any** data to be returned

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


## `static.findOneAndRemove.returns()`
Define the data returned from Mongoose [Model.findOneAndRemove](http://mongoosejs.com/docs/api.html#findoneandremove_findOneAndRemove). Any additional query functions chained off of it in the system under test will return the specified data.

### Parameters
- `err` **[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)** error to be returned
- `data` **Any** data to be returned

### Returns
**[undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)**

### Example
```javascript
const testgoose = require('testgoose');
const UserStub = testgoose.model.stub();
UserStub.static.findOneAndRemove.returns(new Error('something bad happened'), null);
```


## `static.findByIdAndRemove.returns()`
Define the data returned from Mongoose [Model.findByIdAndRemove](http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove). Any additional query functions chained off of it in the system under test will return the specified data.

### Parameters
- `err` **[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)** error to be returned
- `data` **Any** data to be returned

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


## `static.update.returns()`
Define the data returned from Mongoose [Model.update](http://mongoosejs.com/docs/api.html#update_update). Any additional query functions chained off of it in the system under test will return the specified data.

### Parameters
- `err` **[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)** error to be returned
- `data` **Any** data to be returned

### Returns
**[undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)**

### Example
```javascript
const testgoose = require('testgoose');
const UserStub = testgoose.model.stub();
UserStub.static.update.returns(new Error('something bad happened'), null);
```


## `static.updateMany.returns()`
Define the data returned from Mongoose [Model.updateMany](http://mongoosejs.com/docs/api.html#updatemany_updateMany). Any additional query functions chained off of it in the system under test will return the specified data.

### Parameters
- `err` **[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)** error to be returned
- `data` **Any** data to be returned

### Returns
**[undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)**

### Example
```javascript
const testgoose = require('testgoose');
const UserStub = testgoose.model.stub();
RestaurantStub.static.updateMany.returns(new Error('something bad happened'), null);
```


## `static.updateOne.returns()`
Define the data returned from Mongoose [Model.updateOne](http://mongoosejs.com/docs/api.html#updateone_updateOne). Any additional query functions chained off of it in the system under test will return the specified data.

### Parameters
- `err` **[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)** error to be returned
- `data` **Any** data to be returned

### Returns
**[undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)**

### Example
```javascript
const testgoose = require('testgoose');
const UserStub = testgoose.model.stub();
RestaurantStub.static.updateOne.returns(new Error('something bad happened'), null);
```


## `static.replaceOne.returns()`
Define the data returned from Mongoose [Model.replaceOne](http://mongoosejs.com/docs/api.html#replaceone_replaceOne). Any additional query functions chained off of it in the system under test will return the specified data.

### Parameters
- `err` **[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)** error to be returned
- `data` **Any** data to be returned

### Returns
**[undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)**

### Example
```javascript
const testgoose = require('testgoose');
const UserStub = testgoose.model.stub();
RestaurantStub.static.replaceOne.returns(new Error('something bad happened'), null);
```


## `proto.save.returns()`
Define the data returned from Mongoose [Model#save](http://mongoosejs.com/docs/api.html#model_Model-save). If parameters are not specified, the stub Model instance will use the properties assigned to it instead to return a new object.

### Parameters
- `err` **[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)** error to be returned
- `data` **Any** data to be returned

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

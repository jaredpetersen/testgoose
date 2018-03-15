# ModelMock
Mock of Mongoose [Model](http://mongoosejs.com/docs/api.html#Model). To get your module under test to require it instead of the real Mongoose Model, use [proxyquire](https://github.com/thlorenz/proxyquire):
```javaScript
const proxyquire = require('proxyquire').noCallThru();
const testgoose = require('testgoose');

const TaskMock = testgoose.model.mock();
// Define mock behavior

const taskController = proxyquire('../controllers/task', { '../models/task': TaskMock } );
// Call the function under test and make assertions
```

You must specify `withArgs()` on each function that you expect the mock to be called with. This extends to queries as well.

The mock will throw an error in the system under test if it is invoked differently than what was specified.


## `static.remove.withArgs()`
Define the argument matcher(s) for Mongoose [Model.remove](http://mongoosejs.com/docs/api.html#remove_remove). Complete or continue the mock definition via the returned **[QueryMock](/docs/query-mock.md)**.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const ProductMock = testgoose.model.mock();
ProductMock
  .static.remove.withArgs({ name: 'watermelon' })
  .returns(new Error('something bad happened'), null);
```


## `static.deleteOne.withArgs()`
Define the argument matcher(s) for Mongoose [Model.deleteOne](http://mongoosejs.com/docs/api.html#deleteone_deleteOne). Complete or continue the mock definition via the returned **[QueryMock](/docs/query-mock.md)**.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const ProductMock = testgoose.model.mock();
ProductMock
  .static.deleteOne.withArgs({ name: 'pomegranate' })
  .returns(new Error('something bad happened'), null);
```


## `static.deleteMany.withArgs()`
Define the argument matcher(s) for Mongoose [Model.deleteMany](http://mongoosejs.com/docs/api.html#deletemany_deleteMany). Complete or continue the mock definition via the returned **[QueryMock](/docs/query-mock.md)**.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const ProductMock = testgoose.model.mock();
ProductMock
  .static.deleteMany.withArgs({ name: 'pomegranate' })
  .returns(new Error('something bad happened'), null);
```


## `static.find.withArgs()`
Define the argument matcher(s) for Mongoose [Model.find](http://mongoosejs.com/docs/api.html#find_find). Complete or continue the mock definition via the returned **[QueryMock](/docs/query-mock.md)**.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const ProductMock = testgoose.model.mock();
ProductMock.static.find.withArgs({ name: 'banana' }).returns(new Error('something bad happened'), null);
```

```javascript
const testgoose = require('testgoose');
const ProductMock = testgoose.model.mock();
const productData = [
  { _id: '507f191e810c19729de860ea', name: 'banana' },
  { _id: '5a16602357c05c3a06a4dca8', name: 'orange' }
];
ProductMock.static.find.withArgs().returns(null, productData);
```

```javascript
const testgoose = require('testgoose');
const ProductMock = testgoose.model.mock();
ProductMock
  .static.find.withArgs({name: 'banana'})
  .proto.sort.withArgs('-name')
  .returns(new Error('something bad happened'), null);
```


## `static.findById.withArgs()`
Define the argument matcher(s) for Mongoose [Model.findById](http://mongoosejs.com/docs/api.html#findbyid_findById). Complete or continue the mock definition via the returned **[QueryMock](/docs/query-mock.md)**.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const UserMock = testgoose.model.mock();
UserMock.static.findById.withArgs(1234).returns(new Error('something bad happened'), null);
```

```javascript
const testgoose = require('testgoose');
const dataStub = { _id: '507f1f77bcf86cd799439011', firstName: 'Sally', lastName: 'Saltwater' };
const UserMock = testgoose.model.mock();
UserMock.static.findById.withArgs(dataStub._id).returns(null, dataStub);
```

```javascript
const testgoose = require('testgoose');
const UserMock = testgoose.model.mock();
UserMock
  .static.findById.withArgs('507f1f77bcf86cd799439011')
  .proto.select.withArgs('firstName')
  .returns(null, { firstName: 'Sally' });
```


## `static.findOne.withArgs()`
Define the argument matcher(s) for Mongoose [Model.findOne](http://mongoosejs.com/docs/api.html#findone_findOne). Complete or continue the mock definition via the returned **[QueryMock](/docs/query-mock.md)**.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const UserMock = testgoose.model.mock();
UserMock
  .static.findOne.withArgs({ age: 24 })
  .returns(null, { _id: '507f1f77bcf86cd799439011', firstName: 'Patrick', lastName: 'Pumpernickel' });
```


## `static.count.withArgs()`
Define the argument matcher(s) for Mongoose [Model.count](http://mongoosejs.com/docs/api.html#count_count). Complete or continue the mock definition via the returned **[QueryMock](/docs/query-mock.md)**.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const UserMock = testgoose.model.mock();
VacationMock.static.count.withArgs({ type: 'tropical' }).returns(null, 92);
```


## `static.distinct.withArgs()`
Define the argument matcher(s) for Mongoose [Model.distinct](http://mongoosejs.com/docs/api.html#distinct_distinct). Complete or continue the mock definition via the returned **[QueryMock](/docs/query-mock.md)**.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const UserMock = testgoose.model.mock();
EmployeeMock.static.distinct.withArgs('office').returns(new Error('something bad happened'), null);
```


## `static.where.withArgs()`
Define the argument matcher(s) for Mongoose [Model.where](http://mongoosejs.com/docs/api.html#where_where). Complete or continue the mock definition via the returned **[QueryMock](/docs/query-mock.md)**.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const UserMock = testgoose.model.mock();
CitizenMock
  .static.where.withArgs({ age: { $gte: 18 } })
  .returns(new Error('something bad happened'), null);
```


## `static.findOneAndUpdate.withArgs()`
Define the argument matcher(s) for Mongoose [Model.findOneAndUpdate](http://mongoosejs.com/docs/api.html#findoneandupdate_findOneAndUpdate). Complete or continue the mock definition via the returned **[QueryMock](/docs/query-mock.md)**.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const UserMock = testgoose.model.mock();
UserMock
  .static.findOneAndUpdate.withArgs('507f1f77bcf86cd799439011', { firstName: 'Gerald' })
  .returns(null, { _id: '507f1f77bcf86cd799439011', firstName: 'Gerald', lastName: 'Gumption' });
```


## `static.findByIdAndUpdate.withArgs()`
Define the argument matcher(s) for Mongoose [Model.findByIdAndUpdate](http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate). Complete or continue the mock definition via the returned **[QueryMock](/docs/query-mock.md)**.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const UserMock = testgoose.model.mock();
UserMock
  .static.findByIdAndUpdate.withArgs('507f1f77bcf86cd799439011', { firstName: 'Samuel' })
  .returns(new Error('something bad happened'), null);
```

```javascript
const testgoose = require('testgoose');
const UserMock = testgoose.model.mock();
UserMock
  .static.findByIdAndUpdate.withArgs('507f1f77bcf86cd799439011', { firstName: 'Samuel' })
  .returns(null, { _id: '507f1f77bcf86cd799439011', firstName: 'Samuel', lastName: 'Saltwater' });
```

```javascript
const testgoose = require('testgoose');
const UserMock = testgoose.model.mock();
UserMock
  .static.findByIdAndUpdate.withArgs('507f1f77bcf86cd799439011', { firstName: 'Samuel' })
  .proto.select.withArgs('firstName')
  .returns(null, { firstName: 'Samuel' });
```


## `static.findOneAndRemove.withArgs()`
Define the argument matcher(s) for Mongoose [Model.findOneAndRemove](http://mongoosejs.com/docs/api.html#findoneandremove_findOneAndRemove). Complete or continue the mock definition via the returned **[QueryMock](/docs/query-mock.md)**.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const UserMock = testgoose.model.mock();
UserMock
  .static.findOneAndRemove.withArgs({ _id: '507f1f77bcf86cd799439011' })
  .returns(new Error('something bad happened'), null);
```


## `static.findByIdAndRemove.withArgs()`
Define the argument matcher(s) for Mongoose [Model.findByIdAndRemove](http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove). Complete or continue the mock definition via the returned **[QueryMock](/docs/query-mock.md)**.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const UserMock = testgoose.model.mock();
UserMock
  .static.findByIdAndRemove.withArgs('507f1f77bcf86cd799439011')
  .returns(new Error('something bad happened'), null);
```


## `static.update.withArgs()`
Define the argument matcher(s) for Mongoose [Model.update](http://mongoosejs.com/docs/api.html#update_update). Complete or continue the mock definition via the returned **[QueryMock](/docs/query-mock.md)**.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const UserMock = testgoose.model.mock();
UserMock
  .static.update.withArgs({ age: { $gt: 18 } }, { oldEnough: true })
  .returns(new Error('something bad happened'), null);
```


## `static.updateMany.withArgs()`
Define the argument matcher(s) for Mongoose [Model.updateMany](http://mongoosejs.com/docs/api.html#updatemany_updateMany). Complete or continue the mock definition via the returned **[QueryMock](/docs/query-mock.md)**.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const UserMock = testgoose.model.mock();
RestaurantMock
  .static.updateMany.withArgs({ violations: { $gt: 4 } }, { $set: { 'Review' : true } })
  .returns(new Error('something bad happened'), null);
```


## `static.updateOne.withArgs()`
Define the argument matcher(s) for Mongoose [Model.updateOne](http://mongoosejs.com/docs/api.html#updateone_updateOne). Complete or continue the mock definition via the returned **[QueryMock](/docs/query-mock.md)**.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const UserMock = testgoose.model.mock();
RestaurantMock
  .static.updateOne.withArgs({ name : 'Otis Cafe' }, { $set: { violations : 0 } })
  .returns(new Error('something bad happened'), null);
```


## `static.replaceOne.withArgs()`
Define the argument matcher(s) for Mongoose [Model.replaceOne](http://mongoosejs.com/docs/api.html#replaceone_replaceOne). Complete or continue the mock definition via the returned **[QueryMock](/docs/query-mock.md)**.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const UserMock = testgoose.model.mock();
RestaurantMock
  .static.replaceOne.withArgs({ name : 'Otis Cafe' }, { name : 'Otis Cafe', employees: 4 })
  .returns(new Error('something bad happened'), null);
```


## `proto.save.withArgs()`
Define the argument matcher(s) for Mongoose [Model.prototype.save](http://mongoosejs.com/docs/api.html#model_Model-save). Returns itself so that the return data can be defined as well via [`.returns()`](/docs/model-mock.md#protosavewithargsreturns).

### Parameters
Any

### Returns
**[ModelMock.proto.prototype.save.withArgs()](/docs/model-mock.md#protosavewithargs)**


## `proto.save.withArgs().returns()`
Chain off of [`proto.prototype.save.withArgs()`](/docs/model-mock.md#protosavewithargs) to define the data returned from Mongoose [Model.prototype.save](http://mongoosejs.com/docs/api.html#model_Model-save).

### Parameters
- `err` **[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)** error to be returned by the save callback
- `data` **Any** data to be returned by the save callback

### Returns
**[undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)**

### Example
```javascript
const testgoose = require('testgoose');
const CarMock = testgoose.model.mock();
CarMock.proto.save.withArgs().returns(new Error('something bad happened'), null);
```

```javascript
const testgoose = require('testgoose');
const TaskMock = testgoose.model.mock();
CarMock.proto.save.withArgs().returns(null, { vin: '1B7HC16Z6SS365053', color: 'viper red' });
```

# QueryStub
Stub of Mongoose [Query](http://mongoosejs.com/docs/api.html#query-js). This is available indirectly through Model mock and Model stub (recommended) or directly ([advanced usage only](http://mongoosejs.com/docs/api.html#Query)).

```javaScript
const proxyquire = require('proxyquire').noCallThru();
const testgoose = require('testgoose');

const QueryStub = testgoose.query.stub();
// Define stub behavior

const taskController = proxyquire('../controllers/task', { 'mongoose': { Query: QueryStub } });
// Call the function under test and make assertions
```


## proto.returns()
Specify the data that the stub should return.

### Parameters
- `err` **[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)** error to be returned by the Query Stub
- `data` **???** data to be returned by the Query Stub that should vary by the query

### Returns
**[undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)**

### Example
```javascript
const testgoose = require('testgoose');
const ProductQueryMock = testgoose.query.stub();
ProductQueryMock.proto.returns(new Error('something bad happened'), null);
```

```javascript
const testgoose = require('testgoose');
const ProductQueryMock = testgoose.query.stub();
const productData = [
  { _id: '507f191e810c19729de860ea', name: 'banana' },
  { _id: '5a16602357c05c3a06a4dca8', name: 'orange' }
];
ProductQueryMock.proto.returns(null, productData);
```

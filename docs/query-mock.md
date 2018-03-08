# QueryMock
Mock of Mongoose [Query](http://mongoosejs.com/docs/api.html#Query). This is available indirectly through Model mock and Model stub (recommended) or directly ([advanced usage only](http://mongoosejs.com/docs/api.html#Query)).

```javaScript
const proxyquire = require('proxyquire').noCallThru();
const testgoose = require('testgoose');

const QueryMock = testgoose.query.mock();
// Define mock behavior

const taskController = proxyquire('../controllers/task', { 'mongoose': { Query: QueryMock } });
// Call the function under test and make assertions
```

You must specify `withArgs()` on each function that you expect the mock to be called with.

The mock will throw an error in the system under test if it is invoked differently than what was specified.


### `proto.$where.withArgs()`
Add [Query.prototype.$where](http://mongoosejs.com/docs/api.html#query_Query-$where) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const ProductQueryMock = testgoose.query.mock();
ProductQueryMock
  .proto.$where.withArgs('() => { return false; }')
  .returns(new Error('something bad happened'), null);
```

```javascript
const testgoose = require('testgoose');
const ProductQuery = testgoose.query.mock();
const productData = [
  { _id: '507f191e810c19729de860ea', name: 'banana' },
  { _id: '5a16602357c05c3a06a4dca8', name: 'orange' }
];
ProductQueryMock.proto.$where.withArgs().returns(null, productData);
```

```javascript
const testgoose = require('testgoose');
const ProductQueryMock = testgoose.query.mock();
ProductQueryMock
  .proto.$where.withArgs('() => { return this.manufactureDate < new Date(\'2018-03-05T03:12:14Z\') }')
  .proto.count.withArgs()
  .returns(null, 4);
```


## `proto.where.withArgs()`
Add [Query.prototype.where](http://mongoosejs.com/docs/api.html#query_Query-where) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const UserQueryMock = testgoose.query.mock();
UserQueryMock
  .proto.where.withArgs('age')
  .proto.gte.withArgs(21)
  .returns(new Error('something bad happened'), null);
```

```javascript
const testgoose = require('testgoose');
const UserQueryMock = testgoose.query.mock();
const userData = [
  { _id: '507f1f77bcf86cd799439011', firstName: 'Sally', lastName: 'Saltwater' },
  { _id: '5a16602357c05c3a06a4dca8', firstName: 'Sally', lastName: 'Somber' }
];
UserQueryMock.proto.where.withArgs({ firstName: 'Sally'}).returns(null, userData);
```


## `proto.equals.withArgs()`
Add [Query.prototype.equals](http://mongoosejs.com/docs/api.html#query_Query-equals) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const UserQueryMock = testgoose.query.mock();
UserQueryMock
  .proto.where.withArgs('age')
  .proto.equals.withArgs(21)
  .returns(null, { _id: '507f1f77bcf86cd799439011', firstName: 'Sally' });
```


## `proto.or.withArgs()`
Add [Query.prototype.or](http://mongoosejs.com/docs/api.html#query_Query-or) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const HealthQueryMock = testgoose.query.mock();
HealthQueryMock
  .proto.or.withArgs([{ color: 'red' }, { status: 'emergency' }])
  .returns(new Error('something bad happened'), null);
```


## `proto.nor.withArgs()`
Add [Query.prototype.nor](http://mongoosejs.com/docs/api.html#query_Query-nor) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const HealthQueryMock = testgoose.query.mock();
HealthQueryMock
  .proto.nor.withArgs([{ color: 'green' }, { status: 'ok' })
  .returns(new Error('something bad happened'), null);
```


## `proto.and.withArgs()`
Add [Query.prototype.and](http://mongoosejs.com/docs/api.html#query_Query-and) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const HealthQueryMock = testgoose.query.mock();
HealthQueryMock
  .proto.and.withArgs([{ color: 'green' }, { status: 'ok' })
  .returns(new Error('something bad happened'), null);
```


## `proto.gt.withArgs()`
Add [Query.prototype.gt](http://mongoosejs.com/docs/api.html#query_Query-gt) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const UserQueryMock = testgoose.query.mock();
UserQueryMock
  .proto.where.withArgs('age')
  .proto.gt.withArgs(18)
  .returns(new Error('something bad happened'), null);
```

```javascript
const testgoose = require('testgoose');
const UserQueryMock = testgoose.query.mock();
const userData = [
  { _id: '507f1f77bcf86cd799439011', firstName: 'Sally', lastName: 'Saltwater' },
  { _id: '5a16602357c05c3a06a4dca8', firstName: 'Sally', lastName: 'Somber' }
];
UserQueryMock.proto.gt.withArgs('age', 18).returns(null, userData);
```


## `proto.gte.withArgs()`
Add [Query.prototype.gte](http://mongoosejs.com/docs/api.html#query_Query-gte) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const UserQueryMock = testgoose.query.mock();
UserQueryMock
  .proto.where.withArgs('age')
  .proto.gte.withArgs(18)
  .returns(new Error('something bad happened'), null);
```

```javascript
const testgoose = require('testgoose');
const UserQueryMock = testgoose.query.mock();
const userData = [
  { _id: '507f1f77bcf86cd799439011', firstName: 'Sally', lastName: 'Saltwater' },
  { _id: '5a16602357c05c3a06a4dca8', firstName: 'Sally', lastName: 'Somber' }
];
UserQueryMock.proto.gte.withArgs('age', 18).returns(null, userData);
```


## `proto.lt.withArgs()`
Add [Query.prototype.lt](http://mongoosejs.com/docs/api.html#query_Query-lt) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**


## `proto.lte.withArgs()`
Add [Query.prototype.lte](http://mongoosejs.com/docs/api.html#query_Query-lte) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**


## `proto.ne.withArgs()`
Add [Query.prototype.ne](http://mongoosejs.com/docs/api.html#query_Query-ne) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**


## `proto.in.withArgs()`
Add [Query.prototype.in](http://mongoosejs.com/docs/api.html#query_Query-in) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**


## `proto.nin.withArgs()`
Add [Query.prototype.nin](http://mongoosejs.com/docs/api.html#query_Query-nin) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**


## `proto.all.withArgs()`
Add [Query.prototype.all](http://mongoosejs.com/docs/api.html#query_Query-all) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**


## `proto.size.withArgs()`
Add [Query.prototype.size](http://mongoosejs.com/docs/api.html#query_Query-size) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**


## `proto.regex.withArgs()`
Add [Query.prototype.regex](http://mongoosejs.com/docs/api.html#query_Query-regex) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**


## `proto.maxDistance.withArgs()`
Add [Query.prototype.maxDistance](http://mongoosejs.com/docs/api.html#query_Query-maxDistance) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**


## `proto.mod.withArgs()`
Add [Query.prototype.mod](http://mongoosejs.com/docs/api.html#query_Query-mod) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const ProductQueryMock = testgoose.query.mock();
ProductQueryMock
  .proto.find.withArgs()
  .proto.mod.withArgs('inventory', [2, 1])
  .returns(new Error('something bad happened'), null);
```


## `proto.exists.withArgs()`
Add [Query.prototype.exists](http://mongoosejs.com/docs/api.html#query_Query-exists) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const ThingQueryMock = testgoose.query.mock();
ThingQueryMock
  .proto.where.withArgs('name')
  .proto.exists.withArgs()
  .returns(new Error('something bad happened'), null);
```

```javascript
const testgoose = require('testgoose');
const ThingQueryMock = testgoose.query.mock();
ThingQueryMock
  .proto.find.withArgs()
  .proto.exists.withArgs('name', false)
  .returns(null, { color: 'blue' });
```


## `proto.elemMatch.withArgs()`
Add [Query.prototype.elemMatch](http://mongoosejs.com/docs/api.html#query_Query-mod) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const SocialQueryMock = testgoose.query.mock();
SocialQueryMock
  .proto.elemMatch.withArgs('comment', { author: 'autobot', votes: { $gte: 5 } })
  .returns(new Error('something bad happened'), null);
```


## `proto.within.withArgs()`
Add [Query.prototype.within](http://mongoosejs.com/docs/api.html#query_Query-within) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const GeoQueryMock = testgoose.query.mock();
GeoQueryMock
  .proto.where.withArgs('loc')
  .proto.within.withArgs({ box: [[40.73, -73.9], [40.7, -73.988]] })
  .returns(new Error('something bad happened'), null);
```


## `proto.slice.withArgs()`
Add [Query.prototype.slice](http://mongoosejs.com/docs/api.html#query_Query-slice) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const SocialQueryMock = testgoose.query.mock();
SocialQueryMock
  .proto.slice.withArgs('comments', 5)
  .returns(new Error('something bad happened'), null);
```


## `proto.limit.withArgs()`
Add [Query.prototype.limit](http://mongoosejs.com/docs/api.html#query_Query-limit) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const SocialQueryMock = testgoose.query.mock();
SocialQueryMock
  .proto.limit.withArgs(20)
  .returns(new Error('something bad happened'), null);
```


## `proto.skip.withArgs()`
Add [Query.prototype.skip](http://mongoosejs.com/docs/api.html#query_Query-skip) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const SocialQueryMock = testgoose.query.mock();
SocialQueryMock
  .proto.skip.withArgs(100)
  .proto.limit.withArgs(20)
  .returns(new Error('something bad happened'), null);
```


## `proto.maxScan.withArgs()`
Add [Query.prototype.maxScan](http://mongoosejs.com/docs/api.html#query_Query-maxScan) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const SocialQueryMock = testgoose.query.mock();
SocialQueryMock
  .proto.maxScan.withArgs(100)
  .returns(new Error('something bad happened'), null);
```


## `proto.batchSize.withArgs()`
Add [Query.prototype.batchSize](http://mongoosejs.com/docs/api.html#query_Query-batchSize) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const SocialQueryMock = testgoose.query.mock();
SocialQueryMock
  .proto.batchSize.withArgs(100)
  .returns(new Error('something bad happened'), null);
```


## `proto.comment.withArgs()`
Add [Query.prototype.comment](http://mongoosejs.com/docs/api.html#query_Query-comment) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const SocialQueryMock = testgoose.query.mock();
SocialQueryMock
  .proto.comment.withArgs('login query')
  .returns(new Error('something bad happened'), null);
```


## `proto.snapshot.withArgs()`
Add [Query.prototype.snapshot](http://mongoosejs.com/docs/api.html#query_Query-snapshot) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const ProductQueryMock = testgoose.query.mock();
ProductQueryMock
  .proto.snapshot.withArgs(true)
  .returns(new Error('something bad happened'), null);
```


## `proto.hint.withArgs()`
Add [Query.prototype.hint](http://mongoosejs.com/docs/api.html#query_Query-hint) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const ProductQueryMock = testgoose.query.mock();
ProductQueryMock
  .proto.hint.withArgs({ indexA: 1, indexB: -1})
  .returns(new Error('something bad happened'), null);
```


## `proto.select.withArgs()`
Add [Query.prototype.select](http://mongoosejs.com/docs/api.html#query_Query-select) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const ProductQueryMock = testgoose.query.mock();
ProductQueryMock
  .proto.select.withArgs('a b')
  .returns(null, [ { a: 1, b: 2}, { a: 3, b: 4 } ]);
```


## `proto.slaveOk.withArgs()`
*DEPRECATED* Add [Query.prototype.slaveOk](http://mongoosejs.com/docs/api.html#query_Query-select) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const ProductQueryMock = testgoose.query.mock();
ProductQueryMock
  .proto.slaveOk.withArgs(false)
  .returns(new Error('something bad happened'), null);
```


## `proto.read.withArgs()`
Add [Query.prototype.read](http://mongoosejs.com/docs/api.html#query_Query-read) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const ProductQueryMock = testgoose.query.mock();
ProductQueryMock
  .proto.read.withArgs('primary')
  .returns(new Error('something bad happened'), null);
```


## `proto.merge.withArgs()`
Add [Query.prototype.merge](http://mongoosejs.com/docs/api.html#query_Query-merge) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**


## `proto.lean.withArgs()`
Add [Query.prototype.lean](http://mongoosejs.com/docs/api.html#query_Query-lean) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const ProductQueryMock = testgoose.query.mock();
ProductQueryMock
  .proto.lean.withArgs()
  .returns(new Error('something bad happened'), null);
```


## `proto.find.withArgs()`
Add [Query.prototype.find](http://mongoosejs.com/docs/api.html#query_Query-find) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const ProductQueryMock = testgoose.query.mock();
const productData = [
  { _id: '507f191e810c19729de860ea', name: 'banana' }
];
ProductQueryMock
  .proto.find.withArgs({ name: 'banana' })
  .returns(null, productData);
```


## `proto.collation.withArgs()`
Add [Query.prototype.collation](http://mongoosejs.com/docs/api.html#query_Query-collation) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**


## `proto.findOne.withArgs()`
Add [Query.prototype.findOne](http://mongoosejs.com/docs/api.html#query_Query-findOne) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const ProductQueryMock = testgoose.query.mock();
ProductQueryMock
  .proto.findOne.withArgs()
  .returns(null, { _id: '507f191e810c19729de860ea', name: 'banana' });
```


## `proto.count.withArgs()`
Add [Query.prototype.count](http://mongoosejs.com/docs/api.html#query_Query-count) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const ProductQueryMock = testgoose.query.mock();
ProductQueryMock
  .proto.count.withArgs()
  .returns(null, 82);
```


## `proto.distinct.withArgs()`
Add [Query.prototype.distinct](http://mongoosejs.com/docs/api.html#query_Query-distinct) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const ProductQueryMock = testgoose.query.mock();
ProductQueryMock
  .proto.distinct.withArgs()
  .returns(new Error('something bad happened'), null);
```


## `proto.sort.withArgs()`
Add [Query.prototype.sort](http://mongoosejs.com/docs/api.html#query_Query-sort) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const UserQueryMock = testgoose.query.mock();
UserQueryMock
  .proto.sort.withArgs('name -age')
  .returns(new Error('something bad happened'), null);
```


## `proto.remove.withArgs()`
Add [Query.prototype.remove](http://mongoosejs.com/docs/api.html#query_Query-remove) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const MusicQueryMock = testgoose.query.mock();
MusicQueryMock
  .proto.remove.withArgs({ artist: 'Anne Murray' })
  .returns(new Error('something bad happened'), null);
```


## `proto.deleteOne.withArgs()`
Add [Query.prototype.deleteOne](http://mongoosejs.com/docs/api.html#query_Query-deleteOne) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const MusicQueryMock = testgoose.query.mock();
MusicQueryMock
  .proto.deleteOne.withArgs({ artist: 'Anne Murray' })
  .returns(new Error('something bad happened'), null);
```


## `proto.deleteMany.withArgs()`
Add [Query.prototype.deleteMany](http://mongoosejs.com/docs/api.html#query_Query-deleteMany) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const UserQueryMock = testgoose.query.mock();
UserQueryMock
  .proto.deleteMany.withArgs({ age: { $gte: 18 } })
  .returns(null, null);
```


## `proto.findOneAndUpdate.withArgs()`
Add [Query.prototype.findOneAndUpdate](http://mongoosejs.com/docs/api.html#query_Query-findOneAndUpdate) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**


## `proto.findOneAndRemove.withArgs()`
Add [Query.prototype.findOneAndRemove](http://mongoosejs.com/docs/api.html#query_Query-findOneAndRemove) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**


## `proto.update.withArgs()`
Add [Query.prototype.update](http://mongoosejs.com/docs/api.html#query_Query-update) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const BookQueryMock = testgoose.query.mock();
BookQueryMock
  .proto.update.withArgs({ title: 'words' })
  .returns(new Error('something bad happened'), null);
```


## `proto.updateMany.withArgs()`
Add [Query.prototype.updateMany](http://mongoosejs.com/docs/api.html#query_Query-updateMany) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**


## `proto.updateOne.withArgs()`
Add [Query.prototype.updateOne](http://mongoosejs.com/docs/api.html#query_Query-updateOne) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**


## `proto.replaceOne.withArgs()`
Add [Query.prototype.replaceOne](http://mongoosejs.com/docs/api.html#query_Query-replaceOne) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**


## `proto.populate.withArgs()`
Add [Query.prototype.populate](http://mongoosejs.com/docs/api.html#query_Query-populate) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const BookQueryMock = testgoose.query.mock();
CarQueryMock
  .proto.populate.withArgs('owner')
  .returns(null, [ { year: 1997, model: 'pickup', owner: { firstName: 'Samuel' } } ]);
```


## `proto.maxscan.withArgs()`
*DEPRECATED* Add [Query.prototype.maxscan](http://mongoosejs.com/docs/api.html#query_Query-maxscan) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**


## `proto.intersects.withArgs()`
Add [Query.prototype.intersects](http://mongoosejs.com/docs/api.html#query_Query-intersects) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const GeoQueryMock = testgoose.query.mock();
GeoQueryMock
  .proto.where.withArgs('location')
  .proto.intersects.withArgs({ type: 'LineString', coordinates: [[180.0, 11.0], [180, 9.0]] })
  .returns(new Error('something bad happened'), null);
```


## `proto.geometry.withArgs()`
Add [Query.prototype.geometry](http://mongoosejs.com/docs/api.html#query_Query-geometry) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const GeoQueryMock = testgoose.query.mock();
GeoQueryMock
  .proto.where.withArgs('location')
  .proto.intersects.withArgs()
  .proto.geometry.withArgs({ type: 'Point', coordinates: [ 0, 0 ] })
  .returns(new Error('something bad happened'), null);
```


## `proto.near.withArgs()`
Add [Query.prototype.near](http://mongoosejs.com/docs/api.html#query_Query-near) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const GeoQueryMock = testgoose.query.mock();
GeoQueryMock
  .proto.where.withArgs('location')
  .proto.near.withArgs({ center: [10, 10], maxDistance: 5, spherical: true })
  .returns(new Error('something bad happened'), null);
```


## `proto.nearSphere.withArgs()`
*DEPRECATED* Add [Query.prototype.nearSphere](http://mongoosejs.com/docs/api.html#query_Query-nearSphere) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**


## `proto.polygon.withArgs()`
Add [Query.prototype.polygon](http://mongoosejs.com/docs/api.html#query_Query-polygon) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const GeoQueryMock = testgoose.query.mock();
GeoQueryMock
  .proto.where.withArgs('location')
  .proto.within.withArgs()
  .proto.polygon.withArgs([10, 20], [13, 25], [7, 15])
  .returns(new Error('something bad happened'), null);
```


## `proto.box.withArgs()`
Add [Query.prototype.box](http://mongoosejs.com/docs/api.html#query_Query-box) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const GeoQueryMock = testgoose.query.mock();
GeoQueryMock
  .proto.where.withArgs('location')
  .proto.within.withArgs()
  .proto.box.withArgs({ ll: [40.73083, -73.99756], ur: [40.741404,  -73.988135] })
  .returns(new Error('something bad happened'), null);
```


## `proto.circle.withArgs()`
Add [Query.prototype.circle](http://mongoosejs.com/docs/api.html#query_Query-circle) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**

### Example
```javascript
const testgoose = require('testgoose');
const GeoQueryMock = testgoose.query.mock();
GeoQueryMock
  .proto.where.withArgs('location')
  .proto.within.withArgs()
  .proto.circle.withArgs({ center: [50, 50], radius: 10, unique: true })
  .returns(new Error('something bad happened'), null);
```


## `proto.center.withArgs()`
*DEPRECATED* Add [Query.prototype.center](http://mongoosejs.com/docs/api.html#query_Query-center) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**


## `proto.centerSphere.withArgs()`
*DEPRECATED* Add [Query.prototype.centerSphere](http://mongoosejs.com/docs/api.html#query_Query-centerSphere) to the mock assertion chain with the specified argument matchers.

### Parameters
Any

### Returns
**[QueryMock](/docs/query-mock.md)**


## `proto.returns()`
Specify the data that the mock assertion chain should return. Should only be called after setting up the assertion chain, e.g. `proto.$where.withArgs().returns()`, `proto.find.withArgs().proto.where.withArgs().returns()`, etc.

### Parameters
- `err` **[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)** error to be returned by the Query Mock
- `data` **???** data to be returned by the Query Mock that should vary by the query

### Returns
**[undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)**

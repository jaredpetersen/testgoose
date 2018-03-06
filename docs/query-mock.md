# Query Mock
Mock of Mongoose [Query](http://mongoosejs.com/docs/api.html#query-js). This is available indirectly through Model mock and Model stub (recommended) or directly ([advanced usage only](http://mongoosejs.com/docs/api.html#Query)).

```javaScript
const proxyquire = require('proxyquire').noCallThru();
const testgoose = require('testgoose');

const TaskMock = testgoose.query.mock();
// Define mock behavior

const taskController = proxyquire('mongoose', { '../models/task': TaskMock } );
// Call the function under test and make assertions
```

You must specify `withArgs()` on each function that you expect the mock to be called with.

The mock will throw an error in the system under test if it is invoked differently than what was specified.


## proto.$where.withArgs()
Add [Query.$where](http://mongoosejs.com/docs/api.html#query_Query-$where) to the mock assertion chain with argument matchers.

### Parameters
Any

### Example
```javascript
const testgoose = require('testgoose');
const ProductQueryMock = testgoose.query.mock();
ProductQueryMock
  .proto.$where.withArgs('() => { return this.comments.length === 10 || this.name.length === 5; }')
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


## proto.where.withArgs()
Add [Query.where](http://mongoosejs.com/docs/api.html#query_Query-where) to the mock assertion chain with argument matchers.

### Parameters
Any

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


## proto.equals.withArgs()
Add [Query.equals](http://mongoosejs.com/docs/api.html#query_Query-equals) to the mock assertion chain with argument matchers.

### Parameters
Any

### Example
```javascript
const testgoose = require('testgoose');
const UserQueryMock = testgoose.query.mock();
UserQueryMock
  .proto.where.withArgs('age')
  .proto.equals.withArgs(21)
  .returns(null, { _id: '507f1f77bcf86cd799439011', firstName: 'Sally' });
```


## proto.or.withArgs()
Add [Query.or](http://mongoosejs.com/docs/api.html#query_Query-or) to the mock assertion chain with argument matchers.

### Parameters
Any

### Example
```javascript
const testgoose = require('testgoose');
const HealthQueryMock = testgoose.query.mock();
HealthQueryMock
  .proto.or.withArgs([{ color: 'red' }, { status: 'emergency' }])
  .returns(new Error('something bad happened'), null);
```


## proto.nor.withArgs()
Add [Query.nor](http://mongoosejs.com/docs/api.html#query_Query-nor) to the mock assertion chain with argument matchers.

### Parameters
Any

### Example
```javascript
const testgoose = require('testgoose');
const HealthQueryMock = testgoose.query.mock();
HealthQueryMock
  .proto.nor.withArgs([{ color: 'green' }, { status: 'ok' })
  .returns(new Error('something bad happened'), null);
```


## proto.and.withArgs()
Add [Query.and](http://mongoosejs.com/docs/api.html#query_Query-and) to the mock assertion chain with argument matchers.

### Parameters
Any

### Example
```javascript
const testgoose = require('testgoose');
const HealthQueryMock = testgoose.query.mock();
HealthQueryMock
  .proto.and.withArgs([{ color: 'green' }, { status: 'ok' })
  .returns(new Error('something bad happened'), null);
```


## proto.gt.withArgs()
Add [Query.gt](http://mongoosejs.com/docs/api.html#query_Query-gt) to the mock assertion chain with argument matchers.

### Parameters
Any

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


## proto.gte.withArgs()
Add [Query.gte](http://mongoosejs.com/docs/api.html#query_Query-gte) to the mock assertion chain with argument matchers.

### Parameters
Any

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


## proto.lt.withArgs()
Add [Query.lt](http://mongoosejs.com/docs/api.html#query_Query-lt) to the mock assertion chain with argument matchers.

### Parameters
Any


## proto.lte.withArgs()
Add [Query.lte](http://mongoosejs.com/docs/api.html#query_Query-lte) to the mock assertion chain with argument matchers.

### Parameters
Any


## proto.ne.withArgs()
Add [Query.ne](http://mongoosejs.com/docs/api.html#query_Query-ne) to the mock assertion chain with argument matchers.

### Parameters
Any


## proto.in.withArgs()
Add [Query.in](http://mongoosejs.com/docs/api.html#query_Query-in) to the mock assertion chain with argument matchers.

### Parameters
Any


## proto.nin.withArgs()
Add [Query.nin](http://mongoosejs.com/docs/api.html#query_Query-nin) to the mock assertion chain with argument matchers.

### Parameters
Any


## proto.all.withArgs()
Add [Query.all](http://mongoosejs.com/docs/api.html#query_Query-all) to the mock assertion chain with argument matchers.

### Parameters
Any


## proto.size.withArgs()
Add [Query.size](http://mongoosejs.com/docs/api.html#query_Query-size) to the mock assertion chain with argument matchers.

### Parameters
Any


## proto.regex.withArgs()
Add [Query.regex](http://mongoosejs.com/docs/api.html#query_Query-regex) to the mock assertion chain with argument matchers.

### Parameters
Any


## proto.maxDistance.withArgs()
Add [Query.maxDistance](http://mongoosejs.com/docs/api.html#query_Query-maxDistance) to the mock assertion chain with argument matchers.

### Parameters
Any


## proto.mod.withArgs()
Add [Query.mod](http://mongoosejs.com/docs/api.html#query_Query-mod) to the mock assertion chain with argument matchers.

### Parameters
Any

### Example
```javascript
const testgoose = require('testgoose');
const ProductQueryMock = testgoose.query.mock();
ProductQueryMock
  .proto.find.withArgs()
  .proto.mod.withArgs('inventory', [2, 1])
  .returns(new Error('something bad happened'), null);
```


## proto.exists.withArgs()
Add [Query.exists](http://mongoosejs.com/docs/api.html#query_Query-exists) to the mock assertion chain with argument matchers.

### Parameters
Any

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


## proto.elemMatch.withArgs()
Add [Query.elemMatch](http://mongoosejs.com/docs/api.html#query_Query-mod) to the mock assertion chain with argument matchers.

### Parameters
Any

### Example
```javascript
const testgoose = require('testgoose');
const SocialQueryMock = testgoose.query.mock();
SocialQueryMock
  .proto.elemMatch.withArgs('comment', { author: 'autobot', votes: { $gte: 5 } })
  .returns(new Error('something bad happened'), null);
```


## proto.within.withArgs()
Add [Query.within](http://mongoosejs.com/docs/api.html#query_Query-within) to the mock assertion chain with argument matchers.

### Parameters
Any

### Example
```javascript
const testgoose = require('testgoose');
const GeoQueryMock = testgoose.query.mock();
GeoQueryMock
  .proto.where.withArgs('loc')
  .proto.within.withArgs({ box: [[40.73, -73.9], [40.7, -73.988]] })
  .returns(new Error('something bad happened'), null);
```


## proto.slice.withArgs()
Add [Query.slice](http://mongoosejs.com/docs/api.html#query_Query-slice) to the mock assertion chain with argument matchers.

### Parameters
Any

### Example
```javascript
const testgoose = require('testgoose');
const SocialQueryMock = testgoose.query.mock();
SocialQueryMock
  .proto.slice.withArgs('comments', 5)
  .returns(new Error('something bad happened'), null);
```


## proto.limit.withArgs()
Add [Query.limit](http://mongoosejs.com/docs/api.html#query_Query-limit) to the mock assertion chain with argument matchers.

### Parameters
Any

### Example
```javascript
const testgoose = require('testgoose');
const SocialQueryMock = testgoose.query.mock();
SocialQueryMock
  .proto.limit.withArgs(20)
  .returns(new Error('something bad happened'), null);
```


## proto.skip.withArgs()
Add [Query.skip](http://mongoosejs.com/docs/api.html#query_Query-skip) to the mock assertion chain with argument matchers.

### Parameters
Any

### Example
```javascript
const testgoose = require('testgoose');
const SocialQueryMock = testgoose.query.mock();
SocialQueryMock
  .proto.skip.withArgs(100)
  .proto.limit.withArgs(20)
  .returns(new Error('something bad happened'), null);
```


## proto.maxScan.withArgs()
Add [Query.maxScan](http://mongoosejs.com/docs/api.html#query_Query-maxScan) to the mock assertion chain with argument matchers.

### Parameters
Any

### Example
```javascript
const testgoose = require('testgoose');
const SocialQueryMock = testgoose.query.mock();
SocialQueryMock
  .proto.maxScan.withArgs(100)
  .returns(new Error('something bad happened'), null);
```


## proto.batchSize.withArgs()
Add [Query.batchSize](http://mongoosejs.com/docs/api.html#query_Query-batchSize) to the mock assertion chain with argument matchers.

### Parameters
Any

### Example
```javascript
const testgoose = require('testgoose');
const SocialQueryMock = testgoose.query.mock();
SocialQueryMock
  .proto.batchSize.withArgs(100)
  .returns(new Error('something bad happened'), null);
```


## proto.comment.withArgs()
Add [Query.comment](http://mongoosejs.com/docs/api.html#query_Query-comment) to the mock assertion chain with argument matchers.

### Parameters
Any

### Example
```javascript
const testgoose = require('testgoose');
const SocialQueryMock = testgoose.query.mock();
SocialQueryMock
  .proto.comment.withArgs('login query')
  .returns(new Error('something bad happened'), null);
```


## proto.snapshot.withArgs()
Add [Query.snapshot](http://mongoosejs.com/docs/api.html#query_Query-snapshot) to the mock assertion chain with argument matchers.

### Parameters
Any

### Example
```javascript
const testgoose = require('testgoose');
const ProductQueryMock = testgoose.query.mock();
ProductQueryMock
  .proto.snapshot.withArgs(true)
  .returns(new Error('something bad happened'), null);
```


## proto.hint.withArgs()
Add [Query.hint](http://mongoosejs.com/docs/api.html#query_Query-hint) to the mock assertion chain with argument matchers.

### Parameters
Any

### Example
```javascript
const testgoose = require('testgoose');
const ProductQueryMock = testgoose.query.mock();
ProductQueryMock
  .proto.hint.withArgs({ indexA: 1, indexB: -1})
  .returns(new Error('something bad happened'), null);
```


## proto.select.withArgs()
Add [Query.select](http://mongoosejs.com/docs/api.html#query_Query-select) to the mock assertion chain with argument matchers.

### Parameters
Any

### Example
```javascript
const testgoose = require('testgoose');
const ProductQueryMock = testgoose.query.mock();
ProductQueryMock
  .proto.select.withArgs('a b')
  .returns(null, [ { a: 1, b: 2}, { a: 3, b: 4 } ]);
```


## proto.slaveOk.withArgs()
*DEPRECATED* Add [Query.slaveOk](http://mongoosejs.com/docs/api.html#query_Query-select) to the mock assertion chain with argument matchers.

### Parameters
Any

### Example
```javascript
const testgoose = require('testgoose');
const ProductQueryMock = testgoose.query.mock();
ProductQueryMock
  .proto.slaveOk.withArgs(false)
  .returns(new Error('something bad happened'), null);
```


## proto.read.withArgs()
Add [Query.read](http://mongoosejs.com/docs/api.html#query_Query-read) to the mock assertion chain with argument matchers.

### Parameters
Any

### Example
```javascript
const testgoose = require('testgoose');
const ProductQueryMock = testgoose.query.mock();
ProductQueryMock
  .proto.read.withArgs('primary')
  .returns(new Error('something bad happened'), null);
```


## proto.merge.withArgs()
Add [Query.merge](http://mongoosejs.com/docs/api.html#query_Query-merge) to the mock assertion chain with argument matchers.

### Parameters
Any


## proto.lean.withArgs()
Add [Query.lean](http://mongoosejs.com/docs/api.html#query_Query-lean) to the mock assertion chain with argument matchers.

### Parameters
Any

### Example
```javascript
const testgoose = require('testgoose');
const ProductQueryMock = testgoose.query.mock();
ProductQueryMock
  .proto.lean.withArgs()
  .returns(new Error('something bad happened'), null);
```


## proto.find.withArgs()
Add [Query.find](http://mongoosejs.com/docs/api.html#query_Query-find) to the mock assertion chain with argument matchers.

### Parameters
Any

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


## proto.collation.withArgs()
Add [Query.collation](http://mongoosejs.com/docs/api.html#query_Query-collation) to the mock assertion chain with argument matchers.

### Parameters
Any


## proto.findOne.withArgs()
Add [Query.findOne](http://mongoosejs.com/docs/api.html#query_Query-findOne) to the mock assertion chain with argument matchers.

### Parameters
Any

### Example
```javascript
const testgoose = require('testgoose');
const ProductQueryMock = testgoose.query.mock();
ProductQueryMock
  .proto.findOne.withArgs()
  .returns(null, { _id: '507f191e810c19729de860ea', name: 'banana' });
```


## proto.count.withArgs()
Add [Query.count](http://mongoosejs.com/docs/api.html#query_Query-count) to the mock assertion chain with argument matchers.

### Parameters
Any

### Example
```javascript
const testgoose = require('testgoose');
const ProductQueryMock = testgoose.query.mock();
ProductQueryMock
  .proto.count.withArgs()
  .returns(null, 82);
```


## proto.distinct.withArgs()
Add [Query.distinct](http://mongoosejs.com/docs/api.html#query_Query-distinct) to the mock assertion chain with argument matchers.

### Parameters
Any

### Example
```javascript
const testgoose = require('testgoose');
const ProductQueryMock = testgoose.query.mock();
ProductQueryMock
  .proto.distinct.withArgs()
  .returns(new Error('something bad happened'), null);
```


## proto.sort.withArgs()
Add [Query.sort](http://mongoosejs.com/docs/api.html#query_Query-sort) to the mock assertion chain with argument matchers.

### Parameters
Any

### Example
```javascript
const testgoose = require('testgoose');
const UserQueryMock = testgoose.query.mock();
UserQueryMock
  .proto.sort.withArgs('name -age')
  .returns(new Error('something bad happened'), null);
```


## proto.remove.withArgs()
Add [Query.remove](http://mongoosejs.com/docs/api.html#query_Query-remove) to the mock assertion chain with argument matchers.

### Parameters
Any

### Example
```javascript
const testgoose = require('testgoose');
const MusicQueryMock = testgoose.query.mock();
MusicQueryMock
  .proto.remove.withArgs({ artist: 'Anne Murray' })
  .returns(new Error('something bad happened'), null);
```


## proto.deleteOne.withArgs()
Add [Query.deleteOne](http://mongoosejs.com/docs/api.html#query_Query-deleteOne) to the mock assertion chain with argument matchers.

### Parameters
Any

### Example
```javascript
const testgoose = require('testgoose');
const MusicQueryMock = testgoose.query.mock();
MusicQueryMock
  .proto.deleteOne.withArgs({ artist: 'Anne Murray' })
  .returns(new Error('something bad happened'), null);
```


## proto.deleteMany.withArgs()
Add [Query.deleteMany](http://mongoosejs.com/docs/api.html#query_Query-deleteMany) to the mock assertion chain with argument matchers.

### Parameters
Any

### Example
```javascript
const testgoose = require('testgoose');
const UserQueryMock = testgoose.query.mock();
UserQueryMock
  .proto.deleteMany.withArgs({ age: { $gte: 18 } })
  .returns(null, null);
```


## proto.findOneAndUpdate.withArgs()
Add [Query.findOneAndUpdate](http://mongoosejs.com/docs/api.html#query_Query-findOneAndUpdate) to the mock assertion chain with argument matchers.

### Parameters
Any


## proto.findOneAndRemove.withArgs()
Add [Query.findOneAndRemove](http://mongoosejs.com/docs/api.html#query_Query-findOneAndRemove) to the mock assertion chain with argument matchers.

### Parameters
Any


## proto.update.withArgs()
Add [Query.update](http://mongoosejs.com/docs/api.html#query_Query-update) to the mock assertion chain with argument matchers.

### Parameters
Any

### Example
```javascript
const testgoose = require('testgoose');
const BookQueryMock = testgoose.query.mock();
BookQueryMock
  .proto.update.withArgs({ title: 'words' })
  .returns(new Error('something bad happened'), null);
```


## proto.updateMany.withArgs()
Add [Query.updateMany](http://mongoosejs.com/docs/api.html#query_Query-updateMany) to the mock assertion chain with argument matchers.

### Parameters
Any


## proto.updateOne.withArgs()
Add [Query.updateOne](http://mongoosejs.com/docs/api.html#query_Query-updateOne) to the mock assertion chain with argument matchers.

### Parameters
Any


## proto.replaceOne.withArgs()
Add [Query.replaceOne](http://mongoosejs.com/docs/api.html#query_Query-replaceOne) to the mock assertion chain with argument matchers.

### Parameters
Any


## proto.populate.withArgs()
Add [Query.populate](http://mongoosejs.com/docs/api.html#query_Query-populate) to the mock assertion chain with argument matchers.

### Parameters
Any

### Example
```javascript
const testgoose = require('testgoose');
const BookQueryMock = testgoose.query.mock();
CarQueryMock
  .proto.populate.withArgs('owner')
  .returns(null, [ { year: 1997, model: 'pickup', owner: { firstName: 'Samuel' } } ]);
```


## proto.maxscan.withArgs()
*DEPRECATED* Add [Query.maxscan](http://mongoosejs.com/docs/api.html#query_Query-maxscan) to the mock assertion chain with argument matchers.

### Parameters
Any


## proto.intersects.withArgs()
Add [Query.intersects](http://mongoosejs.com/docs/api.html#query_Query-intersects) to the mock assertion chain with argument matchers.

### Parameters
Any

### Example
```javascript
const testgoose = require('testgoose');
const GeoQueryMock = testgoose.query.mock();
GeoQueryMock
  .proto.where.withArgs('location')
  .proto.intersects.withArgs({ type: 'LineString', coordinates: [[180.0, 11.0], [180, 9.0]] })
  .returns(new Error('something bad happened'), null);
```


## proto.geometry.withArgs()
Add [Query.geometry](http://mongoosejs.com/docs/api.html#query_Query-geometry) to the mock assertion chain with argument matchers.

### Parameters
Any

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


## proto.near.withArgs()
Add [Query.near](http://mongoosejs.com/docs/api.html#query_Query-near) to the mock assertion chain with argument matchers.

### Parameters
Any

### Example
```javascript
const testgoose = require('testgoose');
const GeoQueryMock = testgoose.query.mock();
GeoQueryMock
  .proto.where.withArgs('location')
  .proto.near.withArgs({ center: [10, 10], maxDistance: 5, spherical: true })
  .returns(new Error('something bad happened'), null);
```


## proto.nearSphere.withArgs()
*DEPRECATED* Add [Query.nearSphere](http://mongoosejs.com/docs/api.html#query_Query-nearSphere) to the mock assertion chain with argument matchers.

### Parameters
Any


## proto.polygon.withArgs()
Add [Query.polygon](http://mongoosejs.com/docs/api.html#query_Query-polygon) to the mock assertion chain with argument matchers.

### Parameters
Any

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


## proto.box.withArgs()
Add [Query.box](http://mongoosejs.com/docs/api.html#query_Query-box) to the mock assertion chain with argument matchers.

### Parameters
Any

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


## proto.circle.withArgs()
Add [Query.circle](http://mongoosejs.com/docs/api.html#query_Query-circle) to the mock assertion chain with argument matchers.

### Parameters
Any

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


## proto.center.withArgs()
*DEPRECATED* Add [Query.center](http://mongoosejs.com/docs/api.html#query_Query-center) to the mock assertion chain with argument matchers.

### Parameters
Any


## proto.centerSphere.withArgs()
*DEPRECATED* Add [Query.centerSphere](http://mongoosejs.com/docs/api.html#query_Query-centerSphere) to the mock assertion chain with argument matchers.

### Parameters
Any


## ....withArgs().returns()
Specify the data that the mock assertion chain should return. Can only be called on one of the supported assertion functions, e.g. `proto.$where.withArgs()`, `proto.find.withArgs()`, etc.

### Parameters
- `err` **[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)** error to be returned by the Query Mock
- `data` **???** data to be returned by the Query Mock that should vary by the query

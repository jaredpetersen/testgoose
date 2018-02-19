# Query Mock
Mock of Mongoose [Query](http://mongoosejs.com/docs/api.html#query-js). This is only something that you should be accessing through Model mock methods that return a Query. Creating a Query mock directly will be supported at a future date.


All functions that return a query like `find()`, `gt()`, `where()`, etc. are currently supported. Other functions like `toConstructor()` may be supported at a future date. If you use a query function that is not  yet supported, let us know by opening an issue. Your experiences using testgoose will drive the priority for adding support for particular functions.

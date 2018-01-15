# Query
Mock of Mongoose [Query](http://mongoosejs.com/docs/api.html#query-js). This is only something that you should be accessing through Model methods that return a Query.

The majority of Query functions doing some internal filtering logic and then return itself; since this is a mock it only performs the latter.

The goal is to support the majority of Query functions but right now only a subset are supported. If you use a Query function that isn't supported, please let us know with a new issue that provides an example query so that we can understand what's going on. The Mongoose documentation isn't as up-to-date as it could be, so we'll rely on your experience to help us drive the change in the mocking library.

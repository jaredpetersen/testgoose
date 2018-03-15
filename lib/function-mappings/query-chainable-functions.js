module.exports = [
  { name: '$where', callback: false },
  { name: 'where', callback: false },
  { name: 'equals', callback: false },
  { name: 'or', callback: false },
  { name: 'nor', callback: false },
  { name: 'and', callback: false },
  { name: 'gt', callback: false },
  { name: 'gte', callback: false },
  { name: 'lt', callback: false },
  { name: 'lte', callback: false },
  { name: 'ne', callback: false },
  { name: 'in', callback: false },
  { name: 'nin', callback: false },
  { name: 'all', callback: false },
  { name: 'size', callback: false },
  { name: 'regex', callback: false },
  { name: 'maxDistance', callback: false },
  { name: 'mod', callback: false },
  { name: 'exists', callback: false },
  { name: 'elemMatch', callback: false },
  { name: 'within', callback: false },
  { name: 'slice', callback: false },
  { name: 'limit', callback: false },
  { name: 'skip', callback: false },
  { name: 'maxScan', callback: false },
  { name: 'batchSize', callback: false },
  { name: 'comment', callback: false },
  { name: 'snapshot', callback: false },
  { name: 'hint', callback: false },
  { name: 'select', callback: false },
  { name: 'slaveOk', callback: false }, // Deprecated
  { name: 'read', callback: false },
  { name: 'merge', callback: false },
  { name: 'lean', callback: false },
  { name: 'find', callback: true },
  { name: 'collation', callback: false },
  { name: 'findOne', callback: true },
  { name: 'count', callback: true },
  { name: 'distinct', callback: true },
  { name: 'sort', callback: false },
  { name: 'remove', callback: true },
  { name: 'deleteOne', callback: true },
  { name: 'deleteMany', callback: true },
  { name: 'findOneAndUpdate', callback: true },
  { name: 'findOneAndRemove', callback: true },
  { name: 'update', callback: true },
  { name: 'updateMany', callback: true },
  { name: 'updateOne', callback: true },
  { name: 'replaceOne', callback: true },
  { name: 'populate', callback: false },
  { name: 'maxscan', callback: false }, // Deprecated, alias of maxScan
  { name: 'intersects', callback: false },
  { name: 'geometry', callback: false },
  { name: 'near', callback: false },
  { name: 'nearSphere', callback: false }, // Deprecated
  { name: 'polygon', callback: false },
  { name: 'box', callback: false },
  { name: 'circle', callback: false },
  { name: 'center', callback: false }, // Deprecated
  { name: 'centerSphere', callback: false }
];

// Non-query-chaining functions that are not yet supported
// Query.prototype.use$geoWithin
// Query.prototype.toConstructor()
// Query.prototype.setOptions()
// Query.prototype.getQuery()
// Query.prototype.getUpdate()
// Query.prototype.error()
// Query.prototype.mongooseOptions()
// Query.prototype.cast()
// Query.prototype.cursor()
// Query.prototype.tailable()
// Query.prototype.selected()
// Query.prototype.selectedInclusively()
// Query.prototype.selectedExclusively()

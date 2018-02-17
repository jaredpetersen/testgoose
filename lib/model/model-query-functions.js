const modelQueryFunctions = [
  {
    name: 'find',
    queryName: 'find'
  },
  {
    name: 'findById',
    queryName: 'findOne'
  },
  {
    name: 'findByIdAndRemove',
    queryName: 'findOneAndRemove'
  },
  {
    name: 'findByIdAndUpdate',
    queryName: 'findOneAndUpdate'
  },
  {
    name: 'findOneAndUpdate',
    queryName: 'findOneAndUpdate'
  }
];

module.exports = modelQueryFunctions;

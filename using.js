'use strict';

const Query = require('./querymock4');

Query.proto.find.withArgs('banana').returns(null, 'peanut');
Query.proto.find.withArgs('orange').returns('bad', null);
Query.proto.find.withArgs('orange').proto.find.withArgs('orange').returns('hiya', null);

const query = new Query();
query.find('orange').exec((err, data) => {
  console.log('orange:');
  console.log('err', err);
  console.log('data', data);
});
console.log('banana ----------------------');
query.find('banana').exec((err, data) => {
  console.log('banana:');
  console.log('err', err);
  console.log('data', data);
});
console.log('orange orange ----------------------');
query.find('orange').find('orange').exec((err, data) => {
  console.log('orange orange:');
  console.log('err', err);
  console.log('data', data);
});

console.log('\n$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$\n');

const AnotherQuery = require('./querymock4');

AnotherQuery.proto.find.withArgs('pistachio').returns(null, 'hamahama');
const another = new Query();
another.find('pistachio').exec((err, data) => {
  console.log('pistachio:');
  console.log('err', err);
  console.log('data', data);
});

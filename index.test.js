'use strict';

const chai = require('chai');
const expect = chai.expect;
const modelgoose = require('./index');

describe('modelgoose.model.mock()', () => {
  describe('mock find', () => {
    describe('callback', () => {
      it('it works with a callback', (done) => {
        // Setup our stubs
        const databaseData = { name: 'A', age: 49 };

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.mock();
        MyMock.find.withArgs({name: 'A'}).returns(null, databaseData);

        // Use the stub like a real model
        const myMock = new MyMock();

        MyMock.find({name: 'A'}, (err, docs) => {
          expect(err).to.be.null;
          expect(docs).to.equal(databaseData);
          done();
        });
      });
    });

    describe('promise', () => {
      it('it works with two mock definitions', () => {
        // Setup our stubs
        const databaseData = { name: 'A', age: 35 };
        const databaseData2 = { name: 'A', age: 49 };

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.mock();
        MyMock.find.withArgs({name: 'A'}).where.withArgs({ age: 49 }, '--x').returns(null, databaseData2);
        MyMock.find.withArgs({name: 'A'}).where.withArgs({ age: 35 }, '--v').returns(null, databaseData);

        // Use the stub like a real model
        const myMock = new MyMock();

        return MyMock.find({name: 'A'}).where({age: 49}, '--x')
          .then(doc => {
            expect(doc).to.deep.equal(databaseData2);
          });
      });

      it('it works with two mock definitions multilevel', () => {
        // Setup our stubs
        const databaseData = { name: 'A', age: 35 };
        const databaseData2 = { name: 'A', age: 49 };

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.mock();
        MyMock.find.withArgs({name: 'A'}).where.withArgs({age: 49 }, '--x').returns(null, databaseData2);
        MyMock.find.withArgs({name: 'A'}).where.withArgs({age: 35 }, '--v').where.withArgs({age: 35 }).returns(null, databaseData);

        // Use the stub like a real model
        const myMock = new MyMock();

        return MyMock.find({name: 'A'}).where({age: 49}, '--x')
          .then(doc => {
            expect(doc).to.deep.equal(databaseData2);
          });
      });
    });
  })
});

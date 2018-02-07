'use strict';

const chai = require('chai');
const expect = chai.expect;
const modelmock = require('../../index');

describe('Model - Integration Tests', () => {
  describe('callback', () => {
    it('performs a query chain', (done) => {
      // Setup our stubs
      const databaseError = new Error('something went wrong');

      // Create a Mongoose Model mock
      const MyMock = modelmock.mock();
      MyMock.find.returns(databaseError, null);

      // Use the mock like a real model
      MyMock.find({ name: /john/i }, 'name friends').where('age').gt(10).exec((err, data) => {
        expect(err).to.equal(databaseError);
        expect(data).to.be.null;
        done();
      });
    });

    it('performs a query chain using withParams');
  });

  describe('promise', () => {
    it('performs a query chain', () => {
      // Setup our stubs
      const databaseError = new Error('something went wrong');

      // Create a Mongoose Model mock
      const MyMock = modelmock.mock();
      MyMock.find.returns(databaseError, null);

      // Use the mock like a real model
      return MyMock.find({ name: /john/i }, 'name friends').where('age').gt(10)
        .then(data => {
          expect.fail();
        })
        .catch(err => {
          expect(err).to.equal(databaseError);
        });
    });

    it('performs a query chain using withParams');
  });
});

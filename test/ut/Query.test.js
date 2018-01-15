'use strict';

const chai = require('chai');
const expect = chai.expect;
const Query = require('../../lib/Query');
const queryReturnFunctions = require('../../lib/queryReturnFunctions');

describe('Query - Unit Tests', () => {

  // Automatically test that functions that are supposed to return queries all do the same thing
  describe('query return functions', () => {
    for (const functionName of queryReturnFunctions) {
      describe(functionName, () => {
        it('returns itself when not given a callback', (done) => {
          const query = new Query();
          const queryChain = query[functionName]();

          expect(queryChain).to.equal(query);
          done();
        });

        it('calls the provided callback', (done) => {
          const query = new Query();
          query[functionName](() => {
            done();
          });
        });
      });
    }
  });

  describe('then', () => {
    it('rejects a promise with error when called with error', () => {
      const queryError = new Error('something went wrong');
      const query = new Query(queryError, null);

      return query.find()
        .then(() => {
          expect.fail();
        })
        .catch(err => {
          expect(err).to.equal(queryError);
        });
    });

    it('resolves a promise with data when called with data', () => {
      const queryData = { name: 'A' };
      const query = new Query(null, queryData);

      return query.find()
        .then(data => {
          expect(data).to.equal(queryData);
        })
        .catch(() => {
          expect.fail();
        });
    });
  });

  describe('exec', () => {
    it('calls a callback with error when called with error', (done) => {
      const queryError = new Error('something went wrong');
      const query = new Query(queryError, null);

      query.exec((err, data) => {
        expect(err).to.equal(queryError);
        expect(data).to.be.null;
        done();
      });
    });

    it('calls a callback with data when called with data', (done) => {
      const queryData = { name: 'A' };
      const query = new Query(null, queryData);

      query.exec((err, data) => {
        expect(err).to.be.null;
        expect(data).to.equal(queryData);
        done();
      });
    });

    it('rejects a promise with error when called with error', () => {
      const queryError = new Error('something went wrong');
      const query = new Query(queryError, null);

      return query.exec()
        .then(() => {
          expect.fail();
        })
        .catch(err => {
          expect(err).to.equal(queryError);
        });
    });

    it('resolves a promise with data when called with data', () => {
      const queryData = { name: 'A' };
      const query = new Query(null, queryData);

      return query.exec()
        .then(data => {
          expect(data).to.equal(queryData);
        })
        .catch(() => {
          expect.fail();
        });
    });
  });
});

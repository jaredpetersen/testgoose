'use strict';

const chai = require('chai');
const expect = chai.expect;
const Query = require('./query-mock');
const chainableQueryFunctions = require('./chainable-query-functions');

describe('query-mock', () => {

  // Generate tests for query functions
  for (const functionName of chainableQueryFunctions) {
    describe(`${functionName}.withArgs()`, () => {
      it('returns itself', (done) => {
        const query = new Query();
        const queryChain = query[functionName].withArgs('cucumber lime');

        expect(queryChain).to.equal(query);
        done();
      });
    });

    describe(`${functionName}.withArgs().returns()`, () => {
      it('mocks the query err with a single definition and returns via a callback', (done) => {
        const errStub = 'something went wrong';
        const dataStub = null;

        const query = new Query();
        query[functionName].withArgs('cucumber', 'lime').returns(errStub, dataStub);

        query[functionName]('cucumber', 'lime', (err, data) => {
          expect(err).to.equal(errStub);
          expect(data).to.equal(dataStub);
          done();
        });
      });

      it('mocks the query data with a single definition and returns via a callback', (done) => {
        const errStub = null;
        const dataStub = 'some pie';

        const query = new Query();
        query[functionName].withArgs('cucumber', 'lime').returns(errStub, dataStub);

        query[functionName]('cucumber', 'lime', (err, data) => {
          expect(err).to.equal(errStub);
          expect(data).to.equal(dataStub);
          done();
        });
      });

      it('mocks the query err with a single definition and returns via a promise', () => {
        const errStub = 'something went wrong';

        const query = new Query();
        query[functionName].withArgs('cucumber', 'lime').returns(errStub, null);

        return query[functionName]('cucumber', 'lime')
          .then(() => {
            expect.fail();
          })
          .catch(err => {
            expect(err).to.equal(errStub);
          });
      });

      it('mocks the query data with a single definition and returns via a promise', () => {
        const dataStub = 'some pie';

        const query = new Query();
        query[functionName].withArgs('cucumber', 'lime').returns(null, dataStub);

        return query[functionName]('cucumber', 'lime')
          .then(data => {
            expect(data).to.equal(dataStub);
          })
          .catch(() => {
            expect.fail();
          });
      });

      it('mocks the query err with a single definition and returns via a callback on exec', (done) => {
        const errStub = 'something went wrong';
        const dataStub = null;

        const query = new Query();
        query[functionName].withArgs('cucumber', 'lime').returns(errStub, dataStub);

        query[functionName]('cucumber', 'lime').exec((err, data) => {
          expect(err).to.equal(errStub);
          expect(data).to.equal(dataStub);
          done();
        });
      });

      it('mocks the query data with a single definition and returns via a callback on exec', (done) => {
        const errStub = null;
        const dataStub = 'some pie';

        const query = new Query();
        query[functionName].withArgs('cucumber', 'lime').returns(errStub, dataStub);

        query[functionName]('cucumber', 'lime').exec((err, data) => {
          expect(err).to.equal(errStub);
          expect(data).to.equal(dataStub);
          done();
        });
      });

      it('mocks the query err with a single definition and returns via a promise on exec', () => {
        const errStub = 'something went wrong';

        const query = new Query();
        query[functionName].withArgs('cucumber', 'lime').returns(errStub, null);

        return query[functionName]('cucumber', 'lime').exec()
          .then(() => {
            expect.fail();
          })
          .catch(err => {
            expect(err).to.equal(errStub);
          });
      });

      it('mocks the query err with a single definition and returns via a promise on exec', () => {
        const dataStub = 'some pie';

        const query = new Query();
        query[functionName].withArgs('cucumber', 'lime').returns(null, dataStub);

        return query[functionName]('cucumber', 'lime').exec()
          .then(data => {
            expect(data).to.equal(dataStub);
          })
          .catch(() => {
            expect.fail();
          });
      });
    });
  }
});

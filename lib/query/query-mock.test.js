'use strict';

const chai = require('chai');
const expect = chai.expect;
const Query = require('./query-mock');
const chainableQueryFunctions = require('./chainable-query-functions');

describe('query-mock', () => {

  // Generate tests for query functions
  for (const chainableFunction of chainableQueryFunctions) {
    describe(`${chainableFunction.name}.withArgs()`, () => {
      it('returns itself', (done) => {
        const query = new Query();
        const queryChain = query[chainableFunction.name].withArgs('cucumber lime');

        expect(queryChain).to.equal(query);
        done();
      });
    });

    describe(`${chainableFunction.name}.withArgs().returns()`, () => {

      // Don't test callback capability for functions that do not allow a callback to be passed
      if (chainableFunction.callback === true) {

        it('mocks the query err with a single definition and returns via a callback', (done) => {
          const errStub = 'something went wrong';
          const dataStub = null;

          const query = new Query();
          query[chainableFunction.name].withArgs('cucumber', 'lime').returns(errStub, dataStub);

          query[chainableFunction.name]('cucumber', 'lime', (err, data) => {
            expect(err).to.equal(errStub);
            expect(data).to.equal(dataStub);
            done();
          });
        });

        it('mocks the query data with a single definition and returns via a callback', (done) => {
          const errStub = null;
          const dataStub = 'some pie';

          const query = new Query();
          query[chainableFunction.name].withArgs('cucumber', 'lime').returns(errStub, dataStub);

          query[chainableFunction.name]('cucumber', 'lime', (err, data) => {
            expect(err).to.equal(errStub);
            expect(data).to.equal(dataStub);
            done();
          });
        });

      }

      it('mocks the query err with a single definition and returns via a promise on then', () => {
        const errStub = 'something went wrong';

        const query = new Query();
        query[chainableFunction.name].withArgs('cucumber', 'lime').returns(errStub, null);

        return query[chainableFunction.name]('cucumber', 'lime')
          .then(() => {
            expect.fail();
          })
          .catch(err => {
            expect(err).to.equal(errStub);
          });
      });

      it('mocks the query data with a single definition and returns via a promise on then', () => {
        const dataStub = 'some pie';

        const query = new Query();
        query[chainableFunction.name].withArgs('cucumber', 'lime').returns(null, dataStub);

        return query[chainableFunction.name]('cucumber', 'lime')
          .then(data => {
            expect(data).to.equal(dataStub);
          })
          .catch(() => {
            expect.fail();
          });
      });

      it('mocks the query err with a single definition and returns via a promise on catch', () => {
        const errStub = 'something went wrong';

        const query = new Query();
        query[chainableFunction.name].withArgs('cucumber', 'lime').returns(errStub, null);

        return query[chainableFunction.name]('cucumber', 'lime')
          .catch(err => {
            expect(err).to.equal(errStub);
          });
      });

      it('mocks the query err with a single definition and returns via a callback on exec', (done) => {
        const errStub = 'something went wrong';
        const dataStub = null;

        const query = new Query();
        query[chainableFunction.name].withArgs('cucumber', 'lime').returns(errStub, dataStub);

        query[chainableFunction.name]('cucumber', 'lime').exec((err, data) => {
          expect(err).to.equal(errStub);
          expect(data).to.equal(dataStub);
          done();
        });
      });

      it('mocks the query data with a single definition and returns via a callback on exec', (done) => {
        const errStub = null;
        const dataStub = 'some pie';

        const query = new Query();
        query[chainableFunction.name].withArgs('cucumber', 'lime').returns(errStub, dataStub);

        query[chainableFunction.name]('cucumber', 'lime').exec((err, data) => {
          expect(err).to.equal(errStub);
          expect(data).to.equal(dataStub);
          done();
        });
      });

      it('mocks the query err with a single definition and returns via a promise on exec', () => {
        const errStub = 'something went wrong';

        const query = new Query();
        query[chainableFunction.name].withArgs('cucumber', 'lime').returns(errStub, null);

        return query[chainableFunction.name]('cucumber', 'lime').exec()
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
        query[chainableFunction.name].withArgs('cucumber', 'lime').returns(null, dataStub);

        return query[chainableFunction.name]('cucumber', 'lime').exec()
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

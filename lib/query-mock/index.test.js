'use strict';

const expect = require('chai').expect;
const queryMock = require('./index');
const queryChainableFunctions = require('../function-mappings/query-chainable-functions');

describe('query-mock', () => {

  // Generate tests for query functions
  for (const chainableFunction of queryChainableFunctions) {
    describe(`proto.${chainableFunction.name}.withArgs()`, () => {
      it('allows assertion chaining', (done) => {
        const Query = queryMock();
        const queryChain = Query.proto[chainableFunction.name].withArgs('happy sad');

        expect(queryChain).to.equal(Query.proto);
        done();
      });
    });

    describe(`proto.${chainableFunction.name}.withArgs().returns()`, () => {
      it('throws an error when called with arguments that the tester did not specify', (done) => {
        const Query = queryMock();
        Query.proto[chainableFunction.name].withArgs('cucumber', 'lime').returns('something went wrong', null);
        const query = new Query();

        try {
          query[chainableFunction.name]('cucumber', 'lime', 'pizza');
          done(new Error('should have thrown an error'));
        }
        catch(err) {
          expect(err.message).to.equal(`invoked query with incorrect chain: [{"name":"${chainableFunction.name}","args":["cucumber","lime","pizza"]}]`);
          done();
        }
      });

      // Don't test callback capability for functions that do not allow a callback to be passed
      if (chainableFunction.callback === true) {

        it('mocks the callback err with a single definition', (done) => {
          const errStub = 'something went wrong';

          const Query = queryMock();
          Query.proto[chainableFunction.name].withArgs('cucumber', 'lime').returns(errStub, null);
          const query = new Query();

          query[chainableFunction.name]('cucumber', 'lime', (err, data) => {
            expect(err).to.equal(errStub);
            expect(data).to.be.null;
            done();
          });
        });

        it('mocks the callback err with multiple definitions', (done) => {
          const errStub = 'something went wrong';

          const Query = queryMock();
          Query.proto[chainableFunction.name].withArgs('why', 'milk').returns('bad', 'salad');
          Query.proto[chainableFunction.name].withArgs('cucumber', 'lime').returns(errStub, null);
          Query.proto[chainableFunction.name].withArgs('pizza', 'matters', 'greatly').returns('nothing', 'matters');
          const query = new Query();

          query[chainableFunction.name]('cucumber', 'lime', (err, data) => {
            expect(err).to.equal(errStub);
            expect(data).to.be.null;
            done();
          });
        });

        it('mocks the callback data with a single definition', (done) => {
          const dataStub = 'some pie';

          const Query = queryMock();
          Query.proto[chainableFunction.name].withArgs('cucumber', 'lime').returns(null, dataStub);
          const query = new Query();

          query[chainableFunction.name]('cucumber', 'lime', (err, data) => {
            expect(err).to.be.null;
            expect(data).to.equal(dataStub);
            done();
          });
        });

        it('mocks the callback data with multiple definitions', (done) => {
          const dataStub = 'some pie';

          const Query = queryMock();
          Query.proto[chainableFunction.name].withArgs('why', 'milk').returns('bad', 'salad');
          Query.proto[chainableFunction.name].withArgs('cucumber', 'lime').returns(null, dataStub);
          Query.proto[chainableFunction.name].withArgs('pizza', 'matters', 'greatly').returns('nothing', 'matters');
          const query = new Query();

          query[chainableFunction.name]('cucumber', 'lime', (err, data) => {
            expect(err).to.be.null;
            expect(data).to.equal(dataStub);
            done();
          });
        });

      }

      it('mocks the promise err on then with a single definition', () => {
        const errStub = 'something went wrong';

        const Query = queryMock();
        Query.proto[chainableFunction.name].withArgs('cucumber', 'lime').returns(errStub, null);
        const query = new Query();

        return query[chainableFunction.name]('cucumber', 'lime')
          .then(() => {
            expect.fail();
          })
          .catch(err => {
            expect(err).to.equal(errStub);
          });
      });

      it('mocks the promise err on then with multiple definitions', () => {
        const errStub = 'something went wrong';

        const Query = queryMock();
        Query.proto[chainableFunction.name].withArgs('why', 'milk').returns('bad', 'salad');
        Query.proto[chainableFunction.name].withArgs('cucumber', 'lime').returns(errStub, null);
        Query.proto[chainableFunction.name].withArgs('pizza', 'matters', 'greatly').returns('nothing', 'matters');
        const query = new Query();

        return query[chainableFunction.name]('cucumber', 'lime')
          .then(() => {
            expect.fail();
          })
          .catch(err => {
            expect(err).to.equal(errStub);
          });
      });

      it('mocks the promise data on then with a single definition', () => {
        const dataStub = 'some pie';

        const Query = queryMock();
        Query.proto[chainableFunction.name].withArgs('cucumber', 'lime').returns(null, dataStub);
        const query = new Query();

        return query[chainableFunction.name]('cucumber', 'lime')
          .then(data => {
            expect(data).to.equal(dataStub);
          })
          .catch(() => {
            expect.fail();
          });
      });

      it('mocks the promise data on then with multiple definitions', () => {
        const dataStub = 'some pie';

        const Query = queryMock();
        Query.proto[chainableFunction.name].withArgs('why', 'milk').returns('bad', 'salad');
        Query.proto[chainableFunction.name].withArgs('cucumber', 'lime').returns(null, dataStub);
        Query.proto[chainableFunction.name].withArgs('pizza', 'matters', 'greatly').returns('nothing', 'matters');
        const query = new Query();

        return query[chainableFunction.name]('cucumber', 'lime')
          .then(data => {
            expect(data).to.equal(dataStub);
          })
          .catch(() => {
            expect.fail();
          });
      });

      it('mocks the promise err on catch with a single definition', () => {
        const errStub = 'something went wrong';

        const Query = queryMock();
        Query.proto[chainableFunction.name].withArgs('cucumber', 'lime').returns(errStub, null);
        const query = new Query();

        return query[chainableFunction.name]('cucumber', 'lime')
          .catch(err => {
            expect(err).to.equal(errStub);
          });
      });

      it('mocks the promise err on catch with multiple definitions', () => {
        const errStub = 'something went wrong';

        const Query = queryMock();
        Query.proto[chainableFunction.name].withArgs('why', 'milk').returns('bad', 'salad');
        Query.proto[chainableFunction.name].withArgs('cucumber', 'lime').returns(errStub, null);
        Query.proto[chainableFunction.name].withArgs('pizza', 'matters', 'greatly').returns('nothing', 'matters');
        const query = new Query();

        return query[chainableFunction.name]('cucumber', 'lime')
          .catch(err => {
            expect(err).to.equal(errStub);
          });
      });

      it('mocks the callback err on exec with a single definition', (done) => {
        const errStub = 'something went wrong';

        const Query = queryMock();
        Query.proto[chainableFunction.name].withArgs('cucumber', 'lime').returns(errStub, null);
        const query = new Query();

        query[chainableFunction.name]('cucumber', 'lime').exec((err, data) => {
          expect(err).to.equal(errStub);
          expect(data).to.be.null;
          done();
        });
      });

      it('mocks the callback err on exec with multiple definitions', (done) => {
        const errStub = 'something went wrong';

        const Query = queryMock();
        Query.proto[chainableFunction.name].withArgs('why', 'milk').returns('bad', 'salad');
        Query.proto[chainableFunction.name].withArgs('cucumber', 'lime').returns(errStub, null);
        Query.proto[chainableFunction.name].withArgs('pizza', 'matters', 'greatly').returns('nothing', 'matters');
        const query = new Query();

        query[chainableFunction.name]('cucumber', 'lime').exec((err, data) => {
          expect(err).to.equal(errStub);
          expect(data).to.be.null;
          done();
        });
      });

      it('mocks the callback data on exec with a single definition', (done) => {
        const dataStub = 'some pie';

        const Query = queryMock();
        Query.proto[chainableFunction.name].withArgs('cucumber', 'lime').returns(null, dataStub);
        const query = new Query();

        query[chainableFunction.name]('cucumber', 'lime').exec((err, data) => {
          expect(err).to.be.null;
          expect(data).to.equal(dataStub);
          done();
        });
      });

      it('mocks the callback data on exec with multiple definitions', (done) => {
        const dataStub = 'some pie';

        const Query = queryMock();
        Query.proto[chainableFunction.name].withArgs('why', 'milk').returns('bad', 'salad');
        Query.proto[chainableFunction.name].withArgs('cucumber', 'lime').returns(null, dataStub);
        Query.proto[chainableFunction.name].withArgs('pizza', 'matters', 'greatly').returns('nothing', 'matters');
        const query = new Query();

        query[chainableFunction.name]('cucumber', 'lime').exec((err, data) => {
          expect(err).to.be.null;
          expect(data).to.equal(dataStub);
          done();
        });
      });

      it('mocks the promise err on exec with a single definition', () => {
        const errStub = 'something went wrong';

        const Query = queryMock();
        Query.proto[chainableFunction.name].withArgs('cucumber', 'lime').returns(errStub, null);
        const query = new Query();

        return query[chainableFunction.name]('cucumber', 'lime').exec()
          .then(() => {
            expect.fail();
          })
          .catch(err => {
            expect(err).to.equal(errStub);
          });
      });

      it('mocks the promise err on exec with multiple definitions', () => {
        const errStub = 'something went wrong';

        const Query = queryMock();
        Query.proto[chainableFunction.name].withArgs('why', 'milk').returns('bad', 'salad');
        Query.proto[chainableFunction.name].withArgs('cucumber', 'lime').returns(errStub, null);
        Query.proto[chainableFunction.name].withArgs('pizza', 'matters', 'greatly').returns('nothing', 'matters');
        const query = new Query();

        return query[chainableFunction.name]('cucumber', 'lime').exec()
          .then(() => {
            expect.fail();
          })
          .catch(err => {
            expect(err).to.equal(errStub);
          });
      });

      it('mocks the promise data on exec with a single definition', () => {
        const dataStub = 'some pie';

        const Query = queryMock();
        Query.proto[chainableFunction.name].withArgs('cucumber', 'lime').returns(null, dataStub);
        const query = new Query();

        return query[chainableFunction.name]('cucumber', 'lime').exec()
          .then(data => {
            expect(data).to.equal(dataStub);
          })
          .catch(() => {
            expect.fail();
          });
      });

      it('mocks the promise data on exec multiple definitions', () => {
        const dataStub = 'some pie';

        const Query = queryMock();
        Query.proto[chainableFunction.name].withArgs('why', 'milk').returns('bad', 'salad');
        Query.proto[chainableFunction.name].withArgs('cucumber', 'lime').returns(null, dataStub);
        Query.proto[chainableFunction.name].withArgs('pizza', 'matters', 'greatly').returns('nothing', 'matters');
        const query = new Query();

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

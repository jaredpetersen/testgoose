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
      it('throws an error when called with arguments that the tester did not specify', (done) => {
        const query = new Query();
        query[chainableFunction.name].withArgs('cucumber', 'lime').returns('something went wrong', null);

        try {
          query[chainableFunction.name]('cucumber', 'lime', 'pizza');
          done(new Error('should have thrown an error'));
        }
        catch(err) {
          expect(err.message).to.equal(`invoked query with incorrect chain: [{"func":"${chainableFunction.name}","matchers":["cucumber","lime","pizza"]}]`);
          done();
        }
      });

      // Don't test callback capability for functions that do not allow a callback to be passed
      if (chainableFunction.callback === true) {

        it('mocks the callback err with a single definition', (done) => {
          const errStub = 'something went wrong';

          const query = new Query();
          query[chainableFunction.name].withArgs('cucumber', 'lime').returns(errStub, null);

          query[chainableFunction.name]('cucumber', 'lime', (err, data) => {
            expect(err).to.equal(errStub);
            expect(data).to.be.null;
            done();
          });
        });

        it('mocks the callback err with multiple definitions', (done) => {
          const errStub = 'something went wrong';

          const query = new Query();
          query[chainableFunction.name].withArgs('why', 'milk').returns('bad', 'salad');
          query[chainableFunction.name].withArgs('cucumber', 'lime').returns(errStub, null);
          query[chainableFunction.name].withArgs('pizza', 'matters', 'greatly').returns('nothing', 'matters');

          query[chainableFunction.name]('cucumber', 'lime', (err, data) => {
            expect(err).to.equal(errStub);
            expect(data).to.be.null;
            done();
          });
        });

        it('mocks the callback data with a single definition', (done) => {
          const dataStub = 'some pie';

          const query = new Query();
          query[chainableFunction.name].withArgs('cucumber', 'lime').returns(null, dataStub);

          query[chainableFunction.name]('cucumber', 'lime', (err, data) => {
            expect(err).to.be.null;
            expect(data).to.equal(dataStub);
            done();
          });
        });

        it('mocks the callback data with multiple definitions', (done) => {
          const dataStub = 'some pie';

          const query = new Query();
          query[chainableFunction.name].withArgs('why', 'milk').returns('bad', 'salad');
          query[chainableFunction.name].withArgs('cucumber', 'lime').returns(null, dataStub);
          query[chainableFunction.name].withArgs('pizza', 'matters', 'greatly').returns('nothing', 'matters');

          query[chainableFunction.name]('cucumber', 'lime', (err, data) => {
            expect(err).to.be.null;
            expect(data).to.equal(dataStub);
            done();
          });
        });

      }

      it('mocks the promise err on then with a single definition', () => {
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

      it('mocks the promise err on then with multiple definitions', () => {
        const errStub = 'something went wrong';

        const query = new Query();
        query[chainableFunction.name].withArgs('why', 'milk').returns('bad', 'salad');
        query[chainableFunction.name].withArgs('cucumber', 'lime').returns(errStub, null);
        query[chainableFunction.name].withArgs('pizza', 'matters', 'greatly').returns('nothing', 'matters');

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

      it('mocks the promise data on then with multiple definitions', () => {
        const dataStub = 'some pie';

        const query = new Query();
        query[chainableFunction.name].withArgs('why', 'milk').returns('bad', 'salad');
        query[chainableFunction.name].withArgs('cucumber', 'lime').returns(null, dataStub);
        query[chainableFunction.name].withArgs('pizza', 'matters', 'greatly').returns('nothing', 'matters');

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

        const query = new Query();
        query[chainableFunction.name].withArgs('cucumber', 'lime').returns(errStub, null);

        return query[chainableFunction.name]('cucumber', 'lime')
          .catch(err => {
            expect(err).to.equal(errStub);
          });
      });

      it('mocks the promise err on catch with multiple definitions', () => {
        const errStub = 'something went wrong';

        const query = new Query();
        query[chainableFunction.name].withArgs('why', 'milk').returns('bad', 'salad');
        query[chainableFunction.name].withArgs('cucumber', 'lime').returns(errStub, null);
        query[chainableFunction.name].withArgs('pizza', 'matters', 'greatly').returns('nothing', 'matters');

        return query[chainableFunction.name]('cucumber', 'lime')
          .catch(err => {
            expect(err).to.equal(errStub);
          });
      });

      it('mocks the callback err on exec with a single definition', (done) => {
        const errStub = 'something went wrong';

        const query = new Query();
        query[chainableFunction.name].withArgs('cucumber', 'lime').returns(errStub, null);

        query[chainableFunction.name]('cucumber', 'lime').exec((err, data) => {
          expect(err).to.equal(errStub);
          expect(data).to.be.null;
          done();
        });
      });

      it('mocks the callback err on exec with multiple definitions', (done) => {
        const errStub = 'something went wrong';

        const query = new Query();
        query[chainableFunction.name].withArgs('why', 'milk').returns('bad', 'salad');
        query[chainableFunction.name].withArgs('cucumber', 'lime').returns(errStub, null);
        query[chainableFunction.name].withArgs('pizza', 'matters', 'greatly').returns('nothing', 'matters');

        query[chainableFunction.name]('cucumber', 'lime').exec((err, data) => {
          expect(err).to.equal(errStub);
          expect(data).to.be.null;
          done();
        });
      });

      it('mocks the callback data on exec with a single definition', (done) => {
        const dataStub = 'some pie';

        const query = new Query();
        query[chainableFunction.name].withArgs('cucumber', 'lime').returns(null, dataStub);

        query[chainableFunction.name]('cucumber', 'lime').exec((err, data) => {
          expect(err).to.be.null;
          expect(data).to.equal(dataStub);
          done();
        });
      });

      it('mocks the callback data on exec with multiple definitions', (done) => {
        const dataStub = 'some pie';

        const query = new Query();
        query[chainableFunction.name].withArgs('why', 'milk').returns('bad', 'salad');
        query[chainableFunction.name].withArgs('cucumber', 'lime').returns(null, dataStub);
        query[chainableFunction.name].withArgs('pizza', 'matters', 'greatly').returns('nothing', 'matters');

        query[chainableFunction.name]('cucumber', 'lime').exec((err, data) => {
          expect(err).to.be.null;
          expect(data).to.equal(dataStub);
          done();
        });
      });

      it('mocks the promise err on exec with a single definition', () => {
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

      it('mocks the promise err on exec with multiple definitions', () => {
        const errStub = 'something went wrong';

        const query = new Query();
        query[chainableFunction.name].withArgs('why', 'milk').returns('bad', 'salad');
        query[chainableFunction.name].withArgs('cucumber', 'lime').returns(errStub, null);
        query[chainableFunction.name].withArgs('pizza', 'matters', 'greatly').returns('nothing', 'matters');

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

      it('mocks the promise data on exec multiple definitions', () => {
        const dataStub = 'some pie';

        const query = new Query();
        query[chainableFunction.name].withArgs('why', 'milk').returns('bad', 'salad');
        query[chainableFunction.name].withArgs('cucumber', 'lime').returns(null, dataStub);
        query[chainableFunction.name].withArgs('pizza', 'matters', 'greatly').returns('nothing', 'matters');

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

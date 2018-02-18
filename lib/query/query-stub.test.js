'use strict';

const chai = require('chai');
const expect = chai.expect;
const Query = require('./query-stub');
const chainableQueryFunctions = require('./chainable-query-functions');

describe('query-stub', () => {

  // Generate tests for query functions
  for (const chainableFunction of chainableQueryFunctions) {
    describe(`${chainableFunction.name}.returns`, () => {

      // Don't test callback capability for functions that do not allow a callback to be passed
      if (chainableFunction.callback === true) {

        it('mocks the query err and returns via a callback', (done) => {
          const errStub = 'something went wrong';
          const dataStub = null;

          const query = new Query();
          query.returns(errStub, dataStub);

          query[chainableFunction.name]('cucumber', 'lime', (err, data) => {
            expect(err).to.equal(errStub);
            expect(data).to.equal(dataStub);
            done();
          });
        });

        it('mocks the query data and returns via a callback', (done) => {
          const errStub = null;
          const dataStub = 'some pie';

          const query = new Query();
          query.returns(errStub, dataStub);

          query[chainableFunction.name]('cucumber', 'lime', (err, data) => {
            expect(err).to.equal(errStub);
            expect(data).to.equal(dataStub);
            done();
          });
        });

      }

      it('mocks the query err and returns via a promise on then', () => {
        const errStub = 'something went wrong';

        const query = new Query();
        query.returns(errStub, null);

        return query[chainableFunction.name]('cucumber', 'lime')
          .then(() => {
            expect.fail();
          })
          .catch(err => {
            expect(err).to.equal(errStub);
          });
      });

      it('mocks the query data and returns via a promise on then', () => {
        const dataStub = 'some pie';

        const query = new Query();
        query.returns(null, dataStub);

        return query[chainableFunction.name]('cucumber', 'lime')
          .then(data => {
            expect(data).to.equal(dataStub);
          })
          .catch(() => {
            expect.fail();
          });
      });

      it('mocks the query err and returns via a promise on catch', () => {
        const errStub = 'something went wrong';

        const query = new Query();
        query.returns(errStub, null);

        return query[chainableFunction.name]('cucumber', 'lime')
          .catch(err => {
            expect(err).to.equal(errStub);
          });
      });

      it('mocks the query err and returns via a callback on exec', (done) => {
        const errStub = 'something went wrong';
        const dataStub = null;

        const query = new Query();
        query.returns(errStub, dataStub);

        query[chainableFunction.name]('cucumber', 'lime').exec((err, data) => {
          expect(err).to.equal(errStub);
          expect(data).to.equal(dataStub);
          done();
        });
      });

      it('mocks the query data and returns via a callback on exec', (done) => {
        const errStub = null;
        const dataStub = 'some pie';

        const query = new Query();
        query.returns(errStub, dataStub);

        query[chainableFunction.name]('cucumber', 'lime').exec((err, data) => {
          expect(err).to.equal(errStub);
          expect(data).to.equal(dataStub);
          done();
        });
      });

      it('mocks the query err and returns via a promise on exec', () => {
        const errStub = 'something went wrong';

        const query = new Query();
        query.returns(errStub, null);

        return query[chainableFunction.name]('cucumber', 'lime').exec()
          .then(() => {
            expect.fail();
          })
          .catch(err => {
            expect(err).to.equal(errStub);
          });
      });

      it('mocks the query data and returns via a promise on exec', () => {
        const dataStub = 'some pie';

        const query = new Query();
        query.returns(null, dataStub);

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

  describe('multi chain', () => {
    it('mocks the query err and returns via a callback', (done) => {
      const errStub = 'something went wrong';
      const dataStub = null;

      const query = new Query();
      query.returns(errStub, dataStub);

      query.find({vegetable: 'cucumber', fruit: 'lime'}).where('age').gt(2).count((err, data) => {
        expect(err).to.equal(errStub);
        expect(data).to.equal(dataStub);
        done();
      });
    });

    it('mocks the query data and returns via a callback', (done) => {
      const errStub = null;
      const dataStub = 40;

      const query = new Query();
      query.returns(errStub, dataStub);

      query.find({vegetable: 'cucumber', fruit: 'lime'}).where('age').gt(2).count((err, data) => {
        expect(err).to.equal(errStub);
        expect(data).to.equal(dataStub);
        done();
      });
    });

    it('mocks the query err and returns via a promise on then', () => {
      const errStub = 'something went wrong';

      const query = new Query();
      query.returns(errStub, null);

      return query.find({vegetable: 'cucumber', fruit: 'lime'}).where('age').gt(2).count()
        .then(() => {
          expect.fail();
        })
        .catch(err => {
          expect(err).to.equal(errStub);
        });
    });

    it('mocks the query data and returns via a promise on then', () => {
      const dataStub = 40;

      const query = new Query();
      query.returns(null, dataStub);

      return query.find({vegetable: 'cucumber', fruit: 'lime'}).where('age').gt(2).count()
        .then(data => {
          expect(data).to.equal(dataStub);
        })
        .catch(() => {
          expect.fail();
        });
    });

    it('mocks the query err and returns via a promise on catch', () => {
      const errStub = 'something went wrong';

      const query = new Query();
      query.returns(errStub, null);

      return query.find({vegetable: 'cucumber', fruit: 'lime'}).where('age').gt(2).count()
        .catch(err => {
          expect(err).to.equal(errStub);
        });
    });

    it('mocks the query err and returns via a callback on exec', (done) => {
      const errStub = 'something went wrong';
      const dataStub = null;

      const query = new Query();
      query.returns(errStub, dataStub);

      query.find({vegetable: 'cucumber', fruit: 'lime'}).where('age').gt(2).count().exec((err, data) => {
        expect(err).to.equal(errStub);
        expect(data).to.equal(dataStub);
        done();
      });
    });

    it('mocks the query data and returns via a callback on exec', (done) => {
      const errStub = null;
      const dataStub = 40;

      const query = new Query();
      query.returns(errStub, dataStub);

      query.find({vegetable: 'cucumber', fruit: 'lime'}).where('age').gt(2).count().exec((err, data) => {
        expect(err).to.equal(errStub);
        expect(data).to.equal(dataStub);
        done();
      });
    });

    it('mocks the query err and returns via a promise on exec', () => {
      const errStub = 'something went wrong';

      const query = new Query();
      query.returns(errStub, null);

      return query.find({vegetable: 'cucumber', fruit: 'lime'}).where('age').gt(2).count().exec()
        .then(() => {
          expect.fail();
        })
        .catch(err => {
          expect(err).to.equal(errStub);
        });
    });

    it('mocks the query data and returns via a promise on exec', () => {
      const dataStub = 40;

      const query = new Query();
      query.returns(null, dataStub);

      return query.find({vegetable: 'cucumber', fruit: 'lime'}).where('age').gt(2).count().exec()
        .then(data => {
          expect(data).to.equal(dataStub);
        })
        .catch(() => {
          expect.fail();
        });
    });
  });
});

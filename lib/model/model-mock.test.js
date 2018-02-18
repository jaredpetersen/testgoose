'use strict';

const chai = require('chai');
const expect = chai.expect;
const modelMock = require('./model-mock');
const modelQueryFunctions = require('./model-query-functions');
const Query = require('../query/query-mock');

describe('model-mock', () => {
  describe('mock()', () => {
    it('creates a mock', (done) => {
      // Create a Mongoose Model mock
      const MyStub = modelMock();

      // Make sure that a mock was created
      expect(MyStub).to.exist;
      done();
    });
  });

  describe('modelName', () => {
    it('returns undefined when called without defined behavior', (done) => {
      // Create a Mongoose Model mock
      const MyStub = modelMock();

      // Use the mock like a real model
      expect(MyStub.modelName).to.be.undefined;
      done();
    });

    it('mocks the schema', (done) => {
      // Setup our mocks
      const modelName = 'Task';

      // Create a Mongoose Model mock
      const MyStub = modelMock(modelName);

      // Use the mock like a real model
      expect(MyStub.modelName).to.equal(modelName);
      done();
    });
  });

  describe('schema', () => {
    it('returns undefined when called without defined behavior', (done) => {
      // Create a Mongoose Model mock
      const MyStub = modelMock();

      // Use the mock like a real model
      expect(MyStub.schema).to.be.undefined;
      done();
    });

    it('mocks the schema', (done) => {
      // Setup our mocks
      const schemaData = { name: 'jared' };

      // Create a Mongoose Model mock
      const MyStub = modelMock(null, schemaData);

      // Use the mock like a real model
      expect(MyStub.schema).to.equal(schemaData);
      done();
    });
  });

  for (const modelQueryFunction of modelQueryFunctions) {
    describe(`${modelQueryFunction.name}()`, () => {
      it('throws an error when called with arguments that the tester did not specify', (done) => {
        // Setup our mocks
        const errStub = 'some error';

        // Create a Mongoose Model mock
        const MyStub = modelMock();
        MyStub[modelQueryFunction.name].withArgs('cucumber', 'lime').returns(errStub, null);

        try {
          // Use the mock like a real model
          MyStub[modelQueryFunction.name]('cucumber', 'lime', 'pizza');
          done(new Error('should have thrown an error'));
        }
        catch(err) {
          expect(err.message).to.equal(`invoked model.${modelQueryFunction.name}() with incorrect arguments: ["cucumber","lime","pizza"]`);
          done();
        }
      });

      it('returns a query mock', (done) => {
        // Setup our mocks
        const errStub = 'some error';

        // Create a Mongoose Model mock
        const MyStub = modelMock();
        MyStub[modelQueryFunction.name].withArgs('cucumber', 'lime').returns(errStub, null);

        // Get the query returned by the function under test
        const query = MyStub[modelQueryFunction.name]('cucumber', 'lime');

        expect(query).to.be.an.instanceof(Query);
        done()
      });

      it('mocks the callback err without parameters', (done) => {
        // Setup our mocks
        const errStub = 'some error';

        // Create a Mongoose Model mock
        const MyStub = modelMock();
        MyStub[modelQueryFunction.name].withArgs().returns(errStub, null);

        // Use the mock like a real model
        MyStub[modelQueryFunction.name]((err, data) => {
          expect(err).to.equal(errStub);
          expect(data).to.be.null;
          done();
        });
      });

      it('mocks the callback err with parameters', (done) => {
        // Setup our mocks
        const errStub = 'some error';

        // Create a Mongoose Model mock
        const MyStub = modelMock();
        MyStub[modelQueryFunction.name].withArgs('cucumber', 'lime').returns(errStub, null);

        // Use the mock like a real model
        MyStub[modelQueryFunction.name]('cucumber', 'lime', (err, data) => {
          expect(err).to.equal(errStub);
          expect(data).to.be.null;
          done();
        });
      });

      it('mocks the callback data without parameters', (done) => {
        // Setup our mocks
        const dataStub = 'some pie';

        // Create a Mongoose Model mock
        const MyStub = modelMock();
        MyStub[modelQueryFunction.name].withArgs().returns(null, dataStub);

        // Use the mock like a real model
        MyStub[modelQueryFunction.name]((err, data) => {
          expect(err).to.be.null;
          expect(data).to.equal(dataStub);
          done();
        });
      });

      it('mocks the callback data with parameters', (done) => {
        // Setup our mocks
        const dataStub = 'some pie';

        // Create a Mongoose Model mock
        const MyStub = modelMock();
        MyStub[modelQueryFunction.name].withArgs('cucumber', 'lime').returns(null, dataStub);

        // Use the mock like a real model
        MyStub[modelQueryFunction.name]('cucumber', 'lime', (err, data) => {
          expect(err).to.be.null;
          expect(data).to.equal(dataStub);
          done();
        });
      });

      it('mocks the promise err without parameters', () => {
        // Setup our mocks
        const errStub = 'some error';

        // Create a Mongoose Model mock
        const MyStub = modelMock();
        MyStub[modelQueryFunction.name].withArgs().returns(errStub, null);

        // Use the mock like a real model
        return MyStub[modelQueryFunction.name]()
          .then(() => {
            expect.fail();
          })
          .catch(err => {
            expect(err).to.equal(errStub);
          });
      });

      it('mocks the promise err with parameters', () => {
        // Setup our mocks
        const errStub = 'some error';

        // Create a Mongoose Model mock
        const MyStub = modelMock();
        MyStub[modelQueryFunction.name].withArgs('cucumber', 'lime').returns(errStub, null);

        // Use the mock like a real model
        return MyStub[modelQueryFunction.name]('cucumber', 'lime')
          .then(() => {
            expect.fail();
          })
          .catch(err => {
            expect(err).to.equal(errStub);
          });
      });

      it('mocks the promise data without parameters', () => {
        // Setup our mocks
        const dataStub = 'some pie';

        // Create a Mongoose Model mock
        const MyStub = modelMock();
        MyStub[modelQueryFunction.name].withArgs().returns(null, dataStub);

        // Use the mock like a real model
        return MyStub[modelQueryFunction.name]()
          .then(data => {
            expect(data).to.equal(dataStub);
          })
          .catch(() => {
            expect.fail();
          });
      });

      it('mocks the promise data with parameters', () => {
        // Setup our mocks
        const dataStub = 'some pie';

        // Create a Mongoose Model mock
        const MyStub = modelMock();
        MyStub[modelQueryFunction.name].withArgs('cucumber', 'lime').returns(null, dataStub);

        // Use the mock like a real model
        return MyStub[modelQueryFunction.name]('cucumber', 'lime')
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

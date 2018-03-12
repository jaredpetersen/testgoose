'use strict';

const chai = require('chai');
const expect = chai.expect;
const modelMock = require('./model-mock');
const modelQueryFunctions = require('./model-query-functions');
const chainableQueryFunctions = require('../query/chainable-query-functions');

describe('model-mock', () => {
  describe('mock()', () => {
    it('creates a mock', (done) => {
      // Create a Mongoose Model mock
      const MyMock = modelMock();

      // Make sure that a mock was created
      expect(MyMock).to.exist;
      done();
    });
  });

  describe('modelName', () => {
    it('returns undefined when called without defined behavior', (done) => {
      // Create a Mongoose Model mock
      const MyMock = modelMock();

      // Use the mock like a real model
      expect(MyMock.modelName).to.be.undefined;
      done();
    });

    it('mocks the schema', (done) => {
      // Setup our mocks
      const modelName = 'Task';

      // Create a Mongoose Model mock
      const MyMock = modelMock(modelName);

      // Use the mock like a real model
      expect(MyMock.modelName).to.equal(modelName);
      done();
    });
  });

  describe('schema', () => {
    it('returns undefined when called without defined behavior', (done) => {
      // Create a Mongoose Model mock
      const MyMock = modelMock();

      // Use the mock like a real model
      expect(MyMock.schema).to.be.undefined;
      done();
    });

    it('mocks the schema', (done) => {
      // Setup our mocks
      const schemaData = { name: 'jared' };

      // Create a Mongoose Model mock
      const MyMock = modelMock(null, schemaData);

      // Use the mock like a real model
      expect(MyMock.schema).to.equal(schemaData);
      done();
    });
  });

  for (const modelQueryFunction of modelQueryFunctions) {
    describe(`${modelQueryFunction.name}()`, () => {
      // Determine if the function supports callback
      const supportsCallback = chainableQueryFunctions.find(e => e.name === modelQueryFunction.queryName).callback;

      it('throws an error when called with arguments that the tester did not specify', (done) => {
        // Setup our mocks
        const errStub = 'some error';

        // Create a Mongoose Model mock
        const MyMock = modelMock();
        MyMock.static[modelQueryFunction.name].withArgs('cucumber', 'lime').returns(errStub, null);

        try {
          // Use the mock like a real model
          MyMock[modelQueryFunction.name]('cucumber', 'lime', 'pizza');
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
        const MyMock = modelMock();
        MyMock.static[modelQueryFunction.name].withArgs('cucumber', 'lime').returns(errStub, null);

        // Get the query returned by the function under test
        const query = MyMock[modelQueryFunction.name]('cucumber', 'lime');

        // Can't use instanceof or compare prototypes at all since it's a different class being returned each time
        expect(query.constructor.name).to.equal('Query');
        done();
      });

      // Don't test callback capability for functions that do not allow a callback to be passed
      if (supportsCallback === true) {

        it('mocks the callback err without parameters', (done) => {
          // Setup our mocks
          const errStub = 'some error';

          // Create a Mongoose Model mock
          const MyMock = modelMock();
          MyMock.static[modelQueryFunction.name].withArgs().returns(errStub, null);

          // Use the mock like a real model
          MyMock[modelQueryFunction.name]((err, data) => {
            expect(err).to.equal(errStub);
            expect(data).to.be.null;
            done();
          });
        });

        it('mocks the callback err with parameters', (done) => {
          // Setup our mocks
          const errStub = 'some error';

          // Create a Mongoose Model mock
          const MyMock = modelMock();
          MyMock.static[modelQueryFunction.name].withArgs('cucumber', 'lime').returns(errStub, null);

          // Use the mock like a real model
          MyMock[modelQueryFunction.name]('cucumber', 'lime', (err, data) => {
            expect(err).to.equal(errStub);
            expect(data).to.be.null;
            done();
          });
        });

        it('mocks the callback data without parameters', (done) => {
          // Setup our mocks
          const dataStub = 'some pie';

          // Create a Mongoose Model mock
          const MyMock = modelMock();
          MyMock.static[modelQueryFunction.name].withArgs().returns(null, dataStub);

          // Use the mock like a real model
          MyMock[modelQueryFunction.name]((err, data) => {
            expect(err).to.be.null;
            expect(data).to.equal(dataStub);
            done();
          });
        });

        it('mocks the callback data with parameters', (done) => {
          // Setup our mocks
          const dataStub = 'some pie';

          // Create a Mongoose Model mock
          const MyMock = modelMock();
          MyMock.static[modelQueryFunction.name].withArgs('cucumber', 'lime').returns(null, dataStub);

          // Use the mock like a real model
          MyMock[modelQueryFunction.name]('cucumber', 'lime', (err, data) => {
            expect(err).to.be.null;
            expect(data).to.equal(dataStub);
            done();
          });
        });
      }

      it('mocks the promise err without parameters', () => {
        // Setup our mocks
        const errStub = 'some error';

        // Create a Mongoose Model mock
        const MyMock = modelMock();
        MyMock.static[modelQueryFunction.name].withArgs().returns(errStub, null);

        // Use the mock like a real model
        return MyMock[modelQueryFunction.name]()
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
        const MyMock = modelMock();
        MyMock.static[modelQueryFunction.name].withArgs('cucumber', 'lime').returns(errStub, null);

        // Use the mock like a real model
        return MyMock[modelQueryFunction.name]('cucumber', 'lime')
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
        const MyMock = modelMock();
        MyMock.static[modelQueryFunction.name].withArgs().returns(null, dataStub);

        // Use the mock like a real model
        return MyMock[modelQueryFunction.name]()
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
        const MyMock = modelMock();
        MyMock.static[modelQueryFunction.name].withArgs('cucumber', 'lime').returns(null, dataStub);

        // Use the mock like a real model
        return MyMock[modelQueryFunction.name]('cucumber', 'lime')
          .then(data => {
            expect(data).to.equal(dataStub);
          })
          .catch(() => {
            expect.fail();
          });
      });
    });
  }

  describe('prototype.save()', () => {
    it('throws an error when called with arguments that the tester did not specify', (done) => {
      // Setup our stubs
      const errStub = 'something went wrong';

      // Create a Mongoose Model mock
      const MyMock = modelMock();
      MyMock.proto.save.withArgs('alphabet soup').returns(errStub, null);

      try {
        // Use the mock like a real model
        const myMock = new MyMock();
        myMock.save();
        done(new Error('should have thrown an error'));
      }
      catch(err) {
        expect(err.message).to.equal('invoked model.prototype.save() with incorrect arguments: []');
        done();
      }
    });

    it('mocks the callback err without parameters', (done) => {
      // Setup our stubs
      const errStub = 'something went wrong';

      // Create a Mongoose Model mock
      const MyMock = modelMock();
      MyMock.proto.save.withArgs().returns(errStub, null);

      // Use the mock like a real model
      const myMock = new MyMock();
      myMock.save((err, doc) => {
        expect(err).to.equal(errStub);
        expect(doc).to.be.null;
        done();
      });
    });

    it('mocks the callback err with parameters', (done) => {
      // Setup our stubs
      const errStub = 'something went wrong';

      // Create a Mongoose Model stub
      const MyMock = modelMock();
      MyMock.proto.save.withArgs({validateBeforeSave: true}, 'mint').returns(errStub, null);

      // Use the stub like a real model
      const myMock = new MyMock();
      myMock.save({validateBeforeSave: true}, 'mint', (err, doc) => {
        expect(err).to.equal(errStub);
        expect(doc).to.be.null;
        done();
      });
    });

    it('mocks the callback doc without parameters', (done) => {
      // Setup our stubs
      const docStub = 'some pie';

      // Create a Mongoose Model mock
      const MyMock = modelMock();
      MyMock.proto.save.withArgs().returns(null, docStub);

      // Use the mock like a real model
      const myMock = new MyMock();
      myMock.save((err, doc) => {
        expect(err).to.be.null;
        expect(doc).to.equal(docStub);
        done();
      });
    });

    it('mocks the callback doc with parameters', (done) => {
      // Setup our stubs
      const docStub = 'some pie';

      // Create a Mongoose Model mock
      const MyMock = modelMock();
      MyMock.proto.save.withArgs({validateBeforeSave: true}, 'mint').returns(null, docStub);

      // Use the mock like a real model
      const myMock = new MyMock();
      myMock.save({validateBeforeSave: true}, 'mint', (err, doc) => {
        expect(err).to.be.null;
        expect(doc).to.equal(docStub);
        done();
      });
    });

    it('mocks the promise err without parameters', () => {
      // Setup our stubs
      const errStub = 'something went wrong';

      // Create a Mongoose Model mock
      const MyMock = modelMock();
      MyMock.proto.save.withArgs().returns(errStub, null);

      // Use the mock like a real model
      const myMock = new MyMock();
      return myMock.save()
        .then(() => {
          expect.fail();
        })
        .catch(err => {
          expect(err).to.equal(errStub);
        });
    });

    it('mocks the promise err with parameters', () => {
      // Setup our stubs
      const errStub = 'something went wrong';

      // Create a Mongoose Model stub
      const MyMock = modelMock();
      MyMock.proto.save.withArgs({validateBeforeSave: true}, 'mint').returns(errStub, null);

      // Use the stub like a real model
      const myMock = new MyMock();
      return myMock.save({validateBeforeSave: true}, 'mint')
        .then(() => {
          expect.fail();
        })
        .catch(err => {
          expect(err).to.equal(errStub);
        });
    });

    it('mocks the callback doc without parameters', () => {
      // Setup our stubs
      const docStub = 'some pie';

      // Create a Mongoose Model mock
      const MyMock = modelMock();
      MyMock.proto.save.withArgs().returns(null, docStub);

      // Use the mock like a real model
      const myMock = new MyMock();
      return myMock.save()
        .then(doc => {
          expect(doc).to.equal(docStub);
        })
        .catch(() => {
          expect.fail();
        });
    });

    it('mocks the callback doc with parameters', () => {
      // Setup our stubs
      const docStub = 'some pie';

      // Create a Mongoose Model mock
      const MyMock = modelMock();
      MyMock.proto.save.withArgs({validateBeforeSave: true}, 'mint').returns(null, docStub);

      // Use the mock like a real model
      const myMock = new MyMock();
      return myMock.save({validateBeforeSave: true}, 'mint')
        .then(doc => {
          expect(doc).to.equal(docStub);
        })
        .catch(() => {
          expect.fail();
        });
    });
  });
});

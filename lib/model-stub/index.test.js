'use strict';

const expect = require('chai').expect;
const modelStub = require('./index');
const modelQueryFunctions = require('../function-mappings/model-query-functions');
const queryChainableFunctions = require('../function-mappings/query-chainable-functions');

describe('model-stub', () => {
  describe('stub()', () => {
    it('creates a stub', (done) => {
      // Create a Mongoose Model stub
      const MyStub = modelStub();

      // Make sure that a stub was created
      expect(MyStub).to.exist;
      done();
    });
  });

  describe('modelName', () => {
    it('returns undefined when called without defined behavior', (done) => {
      // Create a Mongoose Model stub
      const MyStub = modelStub();

      // Use the stub like a real model
      expect(MyStub.modelName).to.be.undefined;
      done();
    });

    it('stubs the modelName', (done) => {
      // Setup our stubs
      const modelNameStub = 'Task';

      // Create a Mongoose Model stub
      const MyStub = modelStub(modelNameStub);

      // Use the stub like a real model
      expect(MyStub.modelName).to.equal(modelNameStub);
      done();
    });
  });

  describe('schema', () => {
    it('returns undefined when called without defined behavior', (done) => {
      // Create a Mongoose Model stub
      const MyStub = modelStub();

      // Use the stub like a real model
      expect(MyStub.schema).to.be.undefined;
      done();
    });

    it('stubs the schema', (done) => {
      // Setup our stubs
      const schemaDataStub = { name: 'jared' };

      // Create a Mongoose Model stub
      const MyStub = modelStub(null, schemaDataStub);

      // Use the stub like a real model
      expect(MyStub.schema).to.equal(schemaDataStub);
      done();
    });
  });

  for (const modelQueryFunction of modelQueryFunctions) {
    describe(`static.${modelQueryFunction.name}.returns()`, () => {
      // Determine if the function supports callback
      const supportsCallback = queryChainableFunctions.find(e => e.name === modelQueryFunction.queryName).callback;

      it('does not exist when called without defined behavior', (done) => {
        // Create a Mongoose Model stub
        const MyStub = modelStub();

        expect(MyStub[modelQueryFunction.name]).to.be.undefined;
        done();
      });

      it('returns a query stub', (done) => {
        // Setup our stubs
        const errStub = 'some error';

        // Create a Mongoose Model stub
        const MyStub = modelStub();
        MyStub.static[modelQueryFunction.name].returns(errStub, null);

        // Get the query returned by the function under test
        const query = MyStub[modelQueryFunction.name]();

        // Can't use instanceof or compare prototypes at all since it's a different class being returned each time
        expect(query.constructor.name).to.equal('Query');
        done();
      });

      // Don't test callback capability for functions that do not allow a callback to be passed
      if (supportsCallback === true) {

        it('stubs the callback err without parameters', (done) => {
          // Setup our stubs
          const errStub = 'some error';

          // Create a Mongoose Model stub
          const MyStub = modelStub();
          MyStub.static[modelQueryFunction.name].returns(errStub, null);

          // Use the stub like a real model
          MyStub[modelQueryFunction.name]((err, data) => {
            expect(err).to.equal(errStub);
            expect(data).to.be.null;
            done();
          });
        });

        it('stubs the callback err with parameters', (done) => {
          // Setup our stubs
          const errStub = 'some error';

          // Create a Mongoose Model stub
          const MyStub = modelStub();
          MyStub.static[modelQueryFunction.name].returns(errStub, null);

          // Use the stub like a real model
          MyStub[modelQueryFunction.name]('cucumber', 'lime', (err, data) => {
            expect(err).to.equal(errStub);
            expect(data).to.be.null;
            done();
          });
        });

        it('stubs the callback data without parameters', (done) => {
          // Setup our stubs
          const dataStub = 'some pie';

          // Create a Mongoose Model stub
          const MyStub = modelStub();
          MyStub.static[modelQueryFunction.name].returns(null, dataStub);

          // Use the stub like a real model
          MyStub[modelQueryFunction.name]((err, data) => {
            expect(err).to.be.null;
            expect(data).to.equal(dataStub);
            done();
          });
        });

        it('stubs the callback data with parameters', (done) => {
          // Setup our stubs
          const dataStub = 'some pie';

          // Create a Mongoose Model stub
          const MyStub = modelStub();
          MyStub.static[modelQueryFunction.name].returns(null, dataStub);

          // Use the stub like a real model
          MyStub[modelQueryFunction.name]('cucumber', 'lime', (err, data) => {
            expect(err).to.be.null;
            expect(data).to.equal(dataStub);
            done();
          });
        });
      }

      it('stubs the promise err without parameters', () => {
        // Setup our stubs
        const errStub = 'some error';

        // Create a Mongoose Model stub
        const MyStub = modelStub();
        MyStub.static[modelQueryFunction.name].returns(errStub, null);

        // Use the stub like a real model
        return MyStub[modelQueryFunction.name]()
          .then(() => {
            expect.fail();
          })
          .catch(err => {
            expect(err).to.equal(errStub);
          });
      });

      it('stubs the promise err with parameters', () => {
        // Setup our stubs
        const errStub = 'some error';

        // Create a Mongoose Model stub
        const MyStub = modelStub();
        MyStub.static[modelQueryFunction.name].returns(errStub, null);

        // Use the stub like a real model
        return MyStub[modelQueryFunction.name]('cucumber', 'lime')
          .then(() => {
            expect.fail();
          })
          .catch(err => {
            expect(err).to.equal(errStub);
          });
      });

      it('stubs the promise data without parameters', () => {
        // Setup our stubs
        const dataStub = 'some pie';

        // Create a Mongoose Model stub
        const MyStub = modelStub();
        MyStub.static[modelQueryFunction.name].returns(null, dataStub);

        // Use the stub like a real model
        return MyStub[modelQueryFunction.name]()
          .then(data => {
            expect(data).to.equal(dataStub);
          })
          .catch(() => {
            expect.fail();
          });
      });

      it('stubs the promise data with parameters', () => {
        // Setup our stubs
        const dataStub = 'some pie';

        // Create a Mongoose Model stub
        const MyStub = modelStub();
        MyStub.static[modelQueryFunction.name].returns(null, dataStub);

        // Use the stub like a real model
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

  describe('proto.save.returns()', () => {
    it('does not exist when called without defined behavior', (done) => {
      // Create a Mongoose Model stub
      const MyStub = modelStub();
      const myStub = new MyStub();

      expect(myStub.save).to.be.undefined;
      done();
    });

    it('stubs the callback err without optional parameters', (done) => {
      // Setup our stubs
      const errStub = 'something went wrong';

      // Create a Mongoose Model stub
      const MyMock = modelStub();
      MyMock.proto.save.returns(errStub, null);

      // Use the stub like a real model
      const myMock = new MyMock();
      myMock.save((err, doc) => {
        expect(err).to.equal(errStub);
        expect(doc).to.be.null;
        done();
      });
    });

    it('stubs the callback err with optional parameters', (done) => {
      // Setup our stubs
      const errStub = 'something went wrong';

      // Create a Mongoose Model stub
      const MyMock = modelStub();
      MyMock.proto.save.returns(errStub, null);

      // Use the stub like a real model
      const myMock = new MyMock();
      myMock.save({validateBeforeSave: true}, (err, doc) => {
        expect(err).to.equal(errStub);
        expect(doc).to.be.null;
        done();
      });
    });

    it('stubs the callback doc without optional parameters', (done) => {
      // Setup our stubs
      const docStub = { name: 'A' };

      // Create a Mongoose Model stub
      const MyMock = modelStub();
      MyMock.proto.save.returns(null, docStub);

      // Use the stub like a real model
      const myMock = new MyMock();
      myMock.save((err, doc) => {
        expect(err).to.be.null;
        expect(doc).to.equal(docStub);
        done();
      });
    });

    it('stubs the callback doc with optional parameters', (done) => {
      // Setup our stubs
      const docStub = { name: 'A' };

      // Create a Mongoose Model stub
      const MyMock = modelStub();
      MyMock.proto.save.returns(null, docStub);

      // Use the stub like a real model
      const myMock = new MyMock();
      myMock.save({validateBeforeSave: true}, (err, doc) => {
        expect(err).to.be.null;
        expect(doc).to.equal(docStub);
        done();
      });
    });

    it('stubs the callback doc using assigned document properties', (done) => {
      // Setup our stubs
      const docStub = { name: 'A', age: 49 };

      // Create a Mongoose Model stub
      const MyMock = modelStub();
      MyMock.proto.save.returns();

      // Use the stub like a real model
      const myMock = new MyMock();
      myMock.name = docStub.name;
      myMock.age = docStub.age;

      myMock.save((err, doc) => {
        expect(err).to.be.null;
        expect(doc).to.eql(docStub);
        done();
      });
    });

    it('stubs the callback doc using constructor document properties', (done) => {
      // Setup our stubs
      const docStub = { name: 'A', age: 49 };

      // Create a Mongoose Model stub
      const MyMock = modelStub();
      MyMock.proto.save.returns();

      // Use the stub like a real model
      const myMock = new MyMock(docStub);

      myMock.save((err, doc) => {
        expect(err).to.be.null;
        expect(doc).to.eql(docStub);
        done();
      });
    });

    it('stubs the promise err without optional parameters', () => {
      // Setup our stubs
      const errStub = 'something went wrong';

      // Create a Mongoose Model stub
      const MyMock = modelStub();
      MyMock.proto.save.returns(errStub, null);

      // Use the stub like a real model
      const myMock = new MyMock();
      return myMock.save()
        .then(() => {
          expect.fail();
        })
        .catch(err => {
          expect(err).to.equal(errStub);
        });
    });

    it('stubs the promise err with optional parameters', () => {
      // Setup our stubs
      const errStub = 'something went wrong';

      // Create a Mongoose Model stub
      const MyMock = modelStub();
      MyMock.proto.save.returns(errStub, null);

      // Use the stub like a real model
      const myMock = new MyMock();
      return myMock.save({validateBeforeSave: true})
        .then(() => {
          expect.fail();
        })
        .catch(err => {
          expect(err).to.equal(errStub);
        });
    });

    it('stubs the promise doc without optional parameters', () => {
      // Setup our stubs
      const docStub = { name: 'A' };

      // Create a Mongoose Model stub
      const MyMock = modelStub();
      MyMock.proto.save.returns(null, docStub);

      // Use the stub like a real model
      const myMock = new MyMock();
      return myMock.save()
        .then(doc => {
          expect(doc).to.equal(docStub);
        })
        .catch(() => {
          expect.fail();
        });
    });

    it('stubs the promise doc with optional parameters', () => {
      // Setup our stubs
      const docStub = { name: 'A' };

      // Create a Mongoose Model stub
      const MyMock = modelStub();
      MyMock.proto.save.returns(null, docStub);

      // Use the stub like a real model
      const myMock = new MyMock();
      return myMock.save({validateBeforeSave: true})
        .then(doc => {
          expect(doc).to.equal(docStub);
        })
        .catch(() => {
          expect.fail();
        });
    });

    it('stubs the promise doc using document properties', () => {
      // Setup our stubs
      const docStub = { name: 'A', age: 49 };

      // Create a Mongoose Model stub
      const MyMock = modelStub();
      MyMock.proto.save.returns();

      // Use the stub like a real model
      const myMock = new MyMock();
      myMock.name = docStub.name;
      myMock.age = docStub.age;

      myMock.save()
        .then(doc => {
          expect(doc).to.eql(docStub);
        })
        .catch(() => {
          expect.fail();
        });
    });
  });
});

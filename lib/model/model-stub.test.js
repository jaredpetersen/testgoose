'use strict';

const chai = require('chai');
const expect = chai.expect;
const modelStub = require('./model-stub');
const modelQueryFunctions = require('./model-query-functions');
const Query = require('../query/query-stub');

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

    it('stubs the schema', (done) => {
      // Setup our stubs
      const modelName = 'Task';

      // Create a Mongoose Model stub
      const MyStub = modelStub(modelName);

      // Use the stub like a real model
      expect(MyStub.modelName).to.equal(modelName);
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
      const schemaData = { name: 'jared' };

      // Create a Mongoose Model stub
      const MyStub = modelStub(null, schemaData);

      // Use the stub like a real model
      expect(MyStub.schema).to.equal(schemaData);
      done();
    });
  });

  for (const modelQueryFunction of modelQueryFunctions) {
    describe(`${modelQueryFunction.name}()`, () => {
      it('does nothing when called without defined behavior', (done) => {
        // Create a Mongoose Model stub
        const MyStub = modelStub();

        expect(MyStub[modelQueryFunction.name]()).to.be.undefined;
        done();
      });

      it('returns a query stub', (done) => {
        // Setup our stubs
        const errStub = 'some error';

        // Create a Mongoose Model stub
        const MyStub = modelStub();
        MyStub[modelQueryFunction.name].returns(errStub, null);

        // Get the query returned by the function under test
        const query = MyStub[modelQueryFunction.name]();

        expect(query).to.be.an.instanceof(Query);
        done()
      });

      it('stubs the callback err without parameters', (done) => {
        // Setup our stubs
        const errStub = 'some error';

        // Create a Mongoose Model stub
        const MyStub = modelStub();
        MyStub[modelQueryFunction.name].returns(errStub, null);

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
        MyStub[modelQueryFunction.name].returns(errStub, null);

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
        MyStub[modelQueryFunction.name].returns(null, dataStub);

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
        MyStub[modelQueryFunction.name].returns(null, dataStub);

        // Use the stub like a real model
        MyStub[modelQueryFunction.name]('cucumber', 'lime', (err, data) => {
          expect(err).to.be.null;
          expect(data).to.equal(dataStub);
          done();
        });
      });

      it('stubs the promise err without parameters', () => {
        // Setup our stubs
        const errStub = 'some error';

        // Create a Mongoose Model stub
        const MyStub = modelStub();
        MyStub[modelQueryFunction.name].returns(errStub, null);

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
        MyStub[modelQueryFunction.name].returns(errStub, null);

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
        MyStub[modelQueryFunction.name].returns(null, dataStub);

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
        MyStub[modelQueryFunction.name].returns(null, dataStub);

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

  describe('prototype.save', () => {
    it('stubs the callback error without optional parameters', (done) => {
      // Setup our stubs
      const databaseError = new Error('something went wrong');

      // Create a Mongoose Model stub
      const MyMock = modelStub();
      MyMock.prototype.save.returns(databaseError, null, null);

      // Use the stub like a real model
      const myMock = new MyMock();
      myMock.save((err, doc, numAffected) => {
        expect(err).to.equal(databaseError);
        expect(doc).to.be.null;
        expect(numAffected).to.be.null;
        done();
      });
    });

    it('stubs the callback error with optional parameters', (done) => {
      // Setup our stubs
      const databaseError = new Error('something went wrong');

      // Create a Mongoose Model stub
      const MyMock = modelStub();
      MyMock.prototype.save.returns(databaseError, null, null);

      // Use the stub like a real model
      const myMock = new MyMock();
      myMock.save({validateBeforeSave: true}, (err, doc, numAffected) => {
        expect(err).to.equal(databaseError);
        expect(doc).to.be.null;
        expect(numAffected).to.be.null;
        done();
      });
    });

    it('stubs the callback doc without optional parameters', (done) => {
      // Setup our stubs
      const databaseData = { name: 'A' };

      // Create a Mongoose Model stub
      const MyMock = modelStub();
      MyMock.prototype.save.returns(null, databaseData, null);

      // Use the stub like a real model
      const myMock = new MyMock();
      myMock.save((err, doc, numAffected) => {
        expect(err).to.be.null;
        expect(doc).to.equal(databaseData);
        expect(numAffected).to.be.null;
        done();
      });
    });

    it('stubs the callback doc with optional parameters', (done) => {
      // Setup our stubs
      const databaseData = { name: 'A' };

      // Create a Mongoose Model stub
      const MyMock = modelStub();
      MyMock.prototype.save.returns(null, databaseData, null);

      // Use the stub like a real model
      const myMock = new MyMock();
      myMock.save({validateBeforeSave: true}, (err, doc, numAffected) => {
        expect(err).to.be.null;
        expect(doc).to.equal(databaseData);
        expect(numAffected).to.be.null;
        done();
      });
    });

    it('stubs the callback numAffected without optional parameters', (done) => {
      // Setup our stubs
      const databaseAffected = 20;

      // Create a Mongoose Model stub
      const MyMock = modelStub();
      MyMock.prototype.save.returns(null, null, databaseAffected);

      // Use the stub like a real model
      const myMock = new MyMock();
      myMock.save((err, doc, numAffected) => {
        expect(err).to.be.null;
        expect(doc).to.be.null;
        expect(numAffected).to.equal(databaseAffected);
        done();
      });
    });

    it('stubs the callback numAffected with optional parameters', (done) => {
      // Setup our stubs
      const databaseAffected = 20;

      // Create a Mongoose Model stub
      const MyMock = modelStub();
      MyMock.prototype.save.returns(null, null, databaseAffected);

      // Use the stub like a real model
      const myMock = new MyMock();
      myMock.save({validateBeforeSave: true}, (err, doc, numAffected) => {
        expect(err).to.be.null;
        expect(doc).to.be.null;
        expect(numAffected).to.equal(databaseAffected);
        done();
      });
    });

    it('stubs the callback using document properties', (done) => {
      // Setup our stubs
      const databaseData = { name: 'A', age: 49 };

      // Create a Mongoose Model stub
      const MyMock = modelStub();
      MyMock.prototype.save.returns();

      // Use the stub like a real model
      const myMock = new MyMock();
      myMock.name = databaseData.name;
      myMock.age = databaseData.age;

      myMock.save((err, doc, numAffected) => {
        expect(err).to.be.null;
        expect(doc).to.eql(databaseData);
        expect(numAffected).to.equal(1);
        done();
      });
    });
  });
});

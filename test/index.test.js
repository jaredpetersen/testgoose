'use strict';

const chai = require('chai');
const expect = chai.expect;
const modelmock = require('../index');

describe('Mongoose Model Mock', () => {
  describe('mock', () => {
    it('creates a mock', (done) => {
      // Create a Mongoose Model mock
      const MyMock = modelmock.mock();

      // Make sure that a mock was created
      expect(MyMock).to.exist;
      done();
    });
  });

  describe('mock find.returns', (done) => {
    describe('callback', (done) => {
      it('does nothing when called without defined behavior', () => {
        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();

        // Use the mock like a real model
        return MyMock.find((err, docs) => {
          expect.fail();
        });
      });

      it('mocks the callback error with optional parameters', (done) => {
        // Setup our stubs
        const databaseError = new Error('something went wrong');

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.find.returns(databaseError, null);

        // Use the mock like a real model
        MyMock.find({ name: /john/i }, 'name friends', (err, docs) => {
          expect(err).to.equal(databaseError);
          expect(docs).to.be.null;
          done();
        });
      });

      it('mocks the callback data with optional parameters', (done) => {
        // Setup our stubs
        const databaseData = [ { name: 'A' }, { name: 'B' } ];

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.find.returns(null, databaseData);

        // Use the mock like a real model
        MyMock.find({ name: /john/i }, 'name friends', (err, docs) => {
          expect(err).to.be.null;
          expect(docs).to.equal(databaseData);
          done();
        });
      });

      it('mocks the callback error without optional parameters ', (done) => {
        // Setup our stubs
        const databaseError = new Error('something went wrong');

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.find.returns(databaseError, null);

        // Use the mock like a real model
        MyMock.find((err, docs) => {
          expect(err).to.equal(databaseError);
          expect(docs).to.be.null;
          done();
        });
      });

      it('mocks the callback data without optional parameters ', (done) => {
        // Setup our stubs
        const databaseData = [ { name: 'A' }, { name: 'B' } ];

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.find.returns(null, databaseData);

        // Use the mock like a real model
        MyMock.find((err, docs) => {
          expect(err).to.be.null;
          expect(docs).to.equal(databaseData);
          done();
        });
      });

      it('mocks the callback data with null', (done) => {
        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.find.returns(null, null);

        // Use the mock like a real model
        MyMock.find((err, doc) => {
          expect(err).to.be.null;
          expect(doc).to.be.null;
          done();
        });
      });
    });

    describe('promises', (done) => {
      it('does nothing when called without defined behavior promise', () => {
        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();

        // Use the mock like a real model
        expect(MyMock.find()).to.be.undefined;
      });

      it('mocks the promise error with optional parameters', () => {
        // Setup our stubs
        const databaseError = new Error('something went wrong');

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.find.returns(databaseError, null);

        // Use the mock like a real model
        return MyMock.find({ name: /john/i }, 'name friends')
          .then(docs => {
            expect.fail();
          })
          .catch(err => {
            expect(err).to.equal(databaseError);
          });
      });

      it('mocks the promise data with optional parameters', () => {
        // Setup our stubs
        const databaseData = [ { name: 'A' }, { name: 'B' } ];

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.find.returns(null, databaseData);

        // Use the mock like a real model
        return MyMock.find({ name: /john/i }, 'name friends')
          .then(docs => {
            expect(docs).to.equal(databaseData);
          })
          .catch(err => {
            expect.fail();
          });
      });

      it('mocks the promise error without optional parameters', () => {
        // Setup our stubs
        const databaseError = new Error('something went wrong');

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.find.returns(databaseError, null);

        // Use the mock like a real model
        return MyMock.find()
          .then(docs => {
            expect.fail();
          })
          .catch(err => {
            expect(err).to.equal(databaseError);
          });
      });

      it('mocks the promise data without optional parameters', () => {
        // Setup our stubs
        const databaseData = [ { name: 'A' }, { name: 'B' } ];

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.find.returns(null, databaseData);

        // Use the mock like a real model
        return MyMock.find()
          .then(docs => {
            expect(docs).to.equal(databaseData);
          })
          .catch(err => {
            expect.fail();
          });
      });

      it('mocks the promise data with null', () => {
        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.find.returns(null, null);

        // Use the mock like a real model
        return MyMock.find()
          .then(docs => {
            expect(docs).to.be.null;
          })
          .catch(err => {
            expect.fail();
          });
      });
    });
  });

  describe('mock findById.returns', (done) => {
    describe('callback', (done) => {
      it('does nothing when called without defined behavior', () => {
        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();

        // Use the mock like a real model
        return MyMock.findById('5a190f2cff422a139c0fbf36', (err, doc) => {
          expect.fail();
        });
      });

      it('mocks the callback error with optional parameterse', (done) => {
        // Setup our stubs
        const databaseError = new Error('something went wrong');

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.findById.returns(databaseError, null);

        // Use the mock like a real model
        MyMock.findById('5a190f2cff422a139c0fbf36', '-__v', (err, doc) => {
          expect(err).to.equal(databaseError);
          expect(doc).to.be.null;
          done();
        });
      });

      it('mocks the callback data with optional parameterse', (done) => {
        // Setup our stubs
        const databaseData = { name: 'A' };

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.findById.returns(null, databaseData);

        // Use the mock like a real model
        MyMock.findById('5a190f2cff422a139c0fbf36', '-__v', (err, doc) => {
          expect(err).to.be.null;
          expect(doc).to.equal(databaseData);
          done();
        });
      });

      it('mocks the callback error without optional parameters', (done) => {
        // Setup our stubs
        const databaseError = new Error('something went wrong');

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.findById.returns(databaseError, null);

        // Use the mock like a real model
        MyMock.findById('5a190f2cff422a139c0fbf36', (err, doc) => {
          expect(err).to.equal(databaseError);
          expect(doc).to.be.null;
          done();
        });
      });

      it('mocks the callback data without optional parameters', (done) => {
        // Setup our stubs
        const databaseData = { name: 'A' };

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.findById.returns(null, databaseData);

        // Use the mock like a real model
        MyMock.findById('5a190f2cff422a139c0fbf36', (err, doc) => {
          expect(err).to.be.null;
          expect(doc).to.equal(databaseData);
          done();
        });
      });

      it('mocks the callback data with null', (done) => {
        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.findById.returns(null, null);

        // Use the mock like a real model
        MyMock.findById('5a190f2cff422a139c0fbf36', (err, doc) => {
          expect(err).to.be.null;
          expect(doc).to.be.null;
          done();
        });
      });
    });

    describe('promises', (done) => {
      it('does nothing when called without defined behavior', () => {
        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();

        // Use the mock like a real model
        expect(MyMock.find()).to.be.undefined;
      });

      it('mocks the promise error with optional parameters', () => {
        // Setup our stubs
        const databaseError = new Error('something went wrong');

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.findById.returns(databaseError, null);

        // Use the mock like a real model
        return MyMock.findById('5a190f2cff422a139c0fbf36', '-__v')
          .then(doc => {
            expect.fail();
          })
          .catch(err => {
            expect(err).to.equal(databaseError);
          });
      });

      it('mocks the promise data with optional parameters', () => {
        // Setup our stubs
        const databaseData = { name: 'A' };

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.findById.returns(null, databaseData);

        // Use the mock like a real model
        return MyMock.findById('5a190f2cff422a139c0fbf36', '-__v')
          .then(doc => {
            expect(doc).to.equal(databaseData);
          })
          .catch(err => {
            expect.fail();
          });
      });

      it('mocks the promise error without optional parameters', () => {
        // Setup our stubs
        const databaseError = new Error('something went wrong');

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.findById.returns(databaseError, null);

        // Use the mock like a real model
        return MyMock.findById('5a190f2cff422a139c0fbf36')
          .then(doc => {
            expect.fail();
          })
          .catch(err => {
            expect(err).to.equal(databaseError);
          });
      });

      it('mocks the promise data without optional parameters', () => {
        // Setup our stubs
        const databaseData = { name: 'A' };

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.findById.returns(null, databaseData);

        // Use the mock like a real model
        return MyMock.findById('5a190f2cff422a139c0fbf36')
          .then(doc => {
            expect(doc).to.equal(databaseData);
          })
          .catch(err => {
            expect.fail();
          });
      });

      it('mocks the promise data with null', () => {
        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.findById.returns(null, null);

        // Use the mock like a real model
        return MyMock.findById()
          .then(docs => {
            expect(docs).to.be.null;
          })
          .catch(err => {
            expect.fail();
          });
      });
    });
  });

  describe('mock save.returns', (done) => {
    it('does nothing when called without defined behavior', () => {
      // Create a Mongoose Model mock
      const MyMock = modelmock.mock();

      // Use the mock like a real model
      const myMock = new MyMock();
      return myMock.save((err, doc) => {
        expect.fail();
      });
    });

    it('defines the callback data - with optional parameters', (done) => {
      // Setup our stubs
      const databaseError = new Error('something went wrong');
      const databaseData = { name: 'A' };
      const databaseAffected = 20;

      // Create a Mongoose Model mock
      const MyMock = modelmock.mock();
      MyMock.prototype.save.returns(databaseError, databaseData, databaseAffected);

      // Use the mock like a real model
      const myMock = new MyMock();
      myMock.save({validateBeforeSave: true}, (err, doc, numAffected) => {
        expect(err).to.equal(databaseError);
        expect(doc).to.equal(databaseData);
        expect(numAffected).to.equal(databaseAffected);
        done();
      });
    });

    it('defines the callback data - without optional parameters', (done) => {
      // Setup our stubs
      const databaseError = new Error('something went wrong');
      const databaseData = { name: 'A' };
      const databaseAffected = 20;

      // Create a Mongoose Model mock
      const MyMock = modelmock.mock();
      MyMock.prototype.save.returns(databaseError, databaseData, databaseAffected);

      // Use the mock like a real model
      const myMock = new MyMock();
      myMock.save((err, doc, numAffected) => {
        expect(err).to.equal(databaseError);
        expect(doc).to.equal(databaseData);
        expect(numAffected).to.equal(databaseAffected);
        done();
      });
    });

    it('defines the callback data - null data', (done) => {
      // Create a Mongoose Model mock
      const MyMock = modelmock.mock();
      MyMock.prototype.save.returns(null, null, null);

      // Use the mock like a real model
      const myMock = new MyMock();
      myMock.save((err, doc, numAffected) => {
        expect(err).to.be.null;
        expect(doc).to.be.null;
        expect(numAffected).to.be.null;
        done();
      });
    });

    it('defines the callback data - optional callback numAffected', (done) => {
      // Setup our stubs
      const databaseError = null;
      const databaseData = { name: 'A' };

      // Create a Mongoose Model mock
      const MyMock = modelmock.mock();
      MyMock.prototype.save.returns(databaseError, databaseData);

      // Use the mock like a real model
      const myMock = new MyMock();
      myMock.save((err, doc) => {
        expect(err).to.equal(databaseError);
        expect(doc).to.equal(databaseData);
        done();
      });
    });

    it('defines the callback data - use document properties', (done) => {
      // Setup our stubs
      const databaseData = { name: 'A', age: 49 };

      // Create a Mongoose Model mock
      const MyMock = modelmock.mock();
      MyMock.prototype.save.returns();

      // Use the mock like a real model
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

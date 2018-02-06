'use strict';

const chai = require('chai');
const expect = chai.expect;
const modelmock = require('../../index');

describe('Model - Unit Tests', () => {
  describe('mock', () => {
    it('creates a mock', (done) => {
      // Create a Mongoose Model mock
      const MyMock = modelmock.mock();

      // Make sure that a mock was created
      expect(MyMock).to.exist;
      done();
    });
  });

  describe('mock find.returns', () => {
    describe('callback', () => {
      it('does nothing when called without defined behavior', () => {
        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();

        // Use the mock like a real model
        return MyMock.find(() => {
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

      it('mocks the callback docs with optional parameters', (done) => {
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

      it('mocks the callback docs without optional parameters ', (done) => {
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

      it('mocks the callback docs with null', (done) => {
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

      it('mocks the callback using matching withParams', (done) => {
        // Setup our stubs
        const databaseData = [ { name: 'A' }, { name: 'B' } ];

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.find.withParams({ name: /john/i }, 'name friends').returns(null, databaseData);

        // Use the mock like a real model
        MyMock.find({ name: /john/i }, 'name friends', (err, docs) => {
          expect(err).to.be.null;
          expect(docs).to.equal(databaseData);
          done();
        });
      });

      it('does nothing when called with non-matching withParams', () => {
        // Setup our stubs
        const databaseData = [ { name: 'A' }, { name: 'B' } ];

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.find.withParams('sody-pop').returns(null, databaseData);

        // Use the mock like a real model
        return MyMock.find({ name: /john/i }, 'name friends', () => {
          expect.fail();
        });
      });
    });

    describe('promise', () => {
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
          .then(() => {
            expect.fail();
          })
          .catch(err => {
            expect(err).to.equal(databaseError);
          });
      });

      it('mocks the promise docs with optional parameters', () => {
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
          .catch(() => {
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
          .then(() => {
            expect.fail();
          })
          .catch(err => {
            expect(err).to.equal(databaseError);
          });
      });

      it('mocks the promise docs without optional parameters', () => {
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
          .catch(() => {
            expect.fail();
          });
      });

      it('mocks the promise docs with null', () => {
        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.find.returns(null, null);

        // Use the mock like a real model
        return MyMock.find()
          .then(docs => {
            expect(docs).to.be.null;
          })
          .catch(() => {
            expect.fail();
          });
      });

      it('mocks the promise using matching withParams', () => {
        // Setup our stubs
        const databaseData = [ { name: 'A' }, { name: 'B' } ];

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.find.withParams({ name: /john/i }, 'name friends').returns(null, databaseData);

        // Use the mock like a real model
        return MyMock.find({ name: /john/i }, 'name friends')
          .then(docs => {
            expect(docs).to.equal(databaseData);
          })
          .catch(() => {
            expect.fail();
          });
      });

      it('does nothing when called with non-matching withParams', () => {
        // Setup our stubs
        const databaseData = [ { name: 'A' }, { name: 'B' } ];

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.find.withParams('sody-pop').returns(null, databaseData);

        // Use the mock like a real model
        expect(MyMock.find({ name: /john/i }, 'name friends')).to.be.undefined;
      });
    });
  });

  describe('mock findById.returns', () => {
    describe('callback', () => {
      it('does nothing when called without defined behavior', () => {
        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();

        // Use the mock like a real model
        return MyMock.findById('5a190f2cff422a139c0fbf36', () => {
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

      it('mocks the callback doc with optional parameterse', (done) => {
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

      it('mocks the callback doc without optional parameters', (done) => {
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

      it('mocks the callback doc with null', (done) => {
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

      it('mocks the callback using matching withParams', (done) => {
        // Setup our stubs
        const databaseData = { name: 'A' };
        const findByIdParams = '5a190f2cff422a139c0fbf36';

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.findById.withParams(findByIdParams).returns(null, databaseData);

        // Use the mock like a real model
        MyMock.findById(findByIdParams, (err, doc) => {
          expect(err).to.be.null;
          expect(doc).to.equal(databaseData);
          done();
        });
      });

      it('does nothing when called with non-matching withParams', () => {
        // Setup our stubs
        const databaseData = { name: 'A' };

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.findById.withParams('sody-pop').returns(null, databaseData);

        // Use the mock like a real model
        return MyMock.findById('5a190f2cff422a139c0fbf36', () => {
          expect.fail();
        });
      });
    });

    describe('promise', () => {
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
          .then(() => {
            expect.fail();
          })
          .catch(err => {
            expect(err).to.equal(databaseError);
          });
      });

      it('mocks the promise doc with optional parameters', () => {
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
          .catch(() => {
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
          .then(() => {
            expect.fail();
          })
          .catch(err => {
            expect(err).to.equal(databaseError);
          });
      });

      it('mocks the promise doc without optional parameters', () => {
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
          .catch(() => {
            expect.fail();
          });
      });

      it('mocks the promise docs with null', () => {
        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.findById.returns(null, null);

        // Use the mock like a real model
        return MyMock.findById()
          .then(doc => {
            expect(doc).to.be.null;
          })
          .catch(() => {
            expect.fail();
          });
      });

      it('mocks the promise using matching withParams', () => {
        // Setup our stubs
        const databaseData = { name: 'A' };
        const findByIdParams = '5a190f2cff422a139c0fbf36';

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.findById.withParams(findByIdParams).returns(null, databaseData);

        // Use the mock like a real model
        return MyMock.findById(findByIdParams)
          .then(docs => {
            expect(docs).to.equal(databaseData);
          })
          .catch(() => {
            expect.fail();
          });
      });

      it('does nothing when called with non-matching withParams', () => {
        // Setup our stubs
        const databaseData = { name: 'A' };

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.findById.withParams('sody-pop').returns(null, databaseData);

        // Use the mock like a real model
        expect(MyMock.findById('5a190f2cff422a139c0fbf36')).to.be.undefined;
      });
    });
  });

  describe('mock findByIdAndUpdate.returns', () => {
    describe('callback', () => {
      it('does nothing when called without defined behavior', () => {
        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();

        // Use the mock like a real model
        return MyMock.findByIdAndUpdate('5a190f2cff422a139c0fbf36', { name: 'C' }, () => {
          expect.fail();
        });
      });

      it('mocks the callback error with optional parameters', (done) => {
        // Setup our stubs
        const databaseError = new Error('something went wrong');

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.findByIdAndUpdate.returns(databaseError, null);

        // Use the mock like a real model
        MyMock.findByIdAndUpdate('5a190f2cff422a139c0fbf36', { name: 'C' }, '-__v', (err, doc) => {
          expect(err).to.equal(databaseError);
          expect(doc).to.be.null;
          done();
        });
      });

      it('mocks the callback doc with optional parameters', (done) => {
        // Setup our stubs
        const databaseData = { name: 'A' };

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.findByIdAndUpdate.returns(null, databaseData);

        // Use the mock like a real model
        MyMock.findByIdAndUpdate('5a190f2cff422a139c0fbf36', { name: 'C' }, '-__v', (err, doc) => {
          expect(err).to.be.null;
          expect(doc).to.equal(databaseData);
          done();
        });
      });

      it('mocks the callback error without optional parameters ', (done) => {
        // Setup our stubs
        const databaseError = new Error('something went wrong');

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.findByIdAndUpdate.returns(databaseError, null);

        // Use the mock like a real model
        MyMock.findByIdAndUpdate('5a190f2cff422a139c0fbf36', { name: 'C' }, (err, doc) => {
          expect(err).to.equal(databaseError);
          expect(doc).to.be.null;
          done();
        });
      });

      it('mocks the callback doc without optional parameters ', (done) => {
        // Setup our stubs
        const databaseData = { name: 'A' };

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.findByIdAndUpdate.returns(null, databaseData);

        // Use the mock like a real model
        MyMock.findByIdAndUpdate('5a190f2cff422a139c0fbf36', { name: 'C' }, (err, doc) => {
          expect(err).to.be.null;
          expect(doc).to.equal(databaseData);
          done();
        });
      });

      it('mocks the callback doc with null', (done) => {
        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.findByIdAndUpdate.returns(null, null);

        // Use the mock like a real model
        MyMock.findByIdAndUpdate('5a190f2cff422a139c0fbf36', { name: 'C' }, (err, doc) => {
          expect(err).to.be.null;
          expect(doc).to.be.null;
          done();
        });
      });

      it('mocks the callback using matching withParams', (done) => {
        // Setup our stubs
        const databaseData = { name: 'A' };

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.findByIdAndUpdate.withParams('5a190f2cff422a139c0fbf36', { name: 'C' }).returns(null, databaseData);

        // Use the mock like a real model
        MyMock.findByIdAndUpdate('5a190f2cff422a139c0fbf36', { name: 'C' }, (err, doc) => {
          expect(err).to.be.null;
          expect(doc).to.equal(databaseData);
          done();
        });
      });

      it('does nothing when called with non-matching withParams', () => {
        // Setup our stubs
        const databaseData = { name: 'A' };

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.findById.withParams('sody-pop', { name: 'B' }).returns(null, databaseData);

        // Use the mock like a real model
        return MyMock.findById('5a190f2cff422a139c0fbf36', { name: 'C' }, () => {
          expect.fail();
        });
      });
    });

    describe('promise', () => {
      it('does nothing when called without defined behavior', () => {
        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();

        // Use the mock like a real model
        expect(MyMock.findByIdAndUpdate()).to.be.undefined;
      });

      it('mocks the promise error with optional parameters', () => {
        // Setup our stubs
        const databaseError = new Error('something went wrong');

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.findByIdAndUpdate.returns(databaseError, null);

        // Use the mock like a real model
        return MyMock.findByIdAndUpdate('5a190f2cff422a139c0fbf36', { name: 'C' }, '-__v')
          .then(() => {
            expect.fail();
          })
          .catch(err => {
            expect(err).to.equal(databaseError);
          });
      });

      it('mocks the promise data with optional parameters', () => {
        // Setup our stubs
        const databaseData = { name: 'C' };

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.findByIdAndUpdate.returns(null, databaseData);

        // Use the mock like a real model
        return MyMock.findByIdAndUpdate('5a190f2cff422a139c0fbf36', { name: 'C' }, '-__v')
          .then(doc => {
            expect(doc).to.equal(databaseData);
          });
      });

      it('mocks the promise error without optional parameter', () => {
        // Setup our stubs
        const databaseError = new Error('something went wrong');

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.findByIdAndUpdate.returns(databaseError, null);

        // Use the mock like a real model
        return MyMock.findByIdAndUpdate('5a190f2cff422a139c0fbf36', { name: 'C' })
          .then(() => {
            expect.fail();
          })
          .catch(err => {
            expect(err).to.equal(databaseError);
          });
      });

      it('mocks the promise data without optional parameters', () => {
        // Setup our stubs
        const databaseData = { name: 'C' };

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.findByIdAndUpdate.returns(null, databaseData);

        // Use the mock like a real model
        return MyMock.findByIdAndUpdate('5a190f2cff422a139c0fbf36', { name: 'C' })
          .then(doc => {
            expect(doc).to.equal(databaseData);
          });
      });

      it('mocks the promise data with null', () => {
        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.findByIdAndUpdate.returns(null, null);

        // Use the mock like a real model
        return MyMock.findByIdAndUpdate('5a190f2cff422a139c0fbf36', { name: 'C' })
          .then(doc => {
            expect(doc).to.be.null;
          });
      });

      it('mocks the promise using matching withParams', () => {
        // Setup our stubs
        const databaseData = { name: 'A' };

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.findByIdAndUpdate.withParams('5a190f2cff422a139c0fbf36', { name: 'C' }).returns(null, databaseData);

        // Use the mock like a real model
        return MyMock.findByIdAndUpdate('5a190f2cff422a139c0fbf36', { name: 'C' })
          .then(docs => {
            expect(docs).to.equal(databaseData);
          })
          .catch(() => {
            expect.fail();
          });
      });

      it('does nothing when called with non-matching withParams', () => {
        // Setup our stubs
        const databaseData = { name: 'A' };

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.findByIdAndUpdate.withParams('sody-pop', { name: 'B' }).returns(null, databaseData);

        // Use the mock like a real model
        expect(MyMock.findByIdAndUpdate('5a190f2cff422a139c0fbf36', { name: 'C' },)).to.be.undefined;
      });
    });
  });

  describe('mock findByIdAndRemove.returns', () => {
    describe('callback', () => {
      it('does nothing when called without defined behavior', () => {
        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();

        // Use the mock like a real model
        return MyMock.findByIdAndRemove('5a190f2cff422a139c0fbf36', () => {
          expect.fail();
        });
      });

      it('mocks the callback error with optional parameters', (done) => {
        // Setup our stubs
        const databaseError = new Error('something went wrong');

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.findByIdAndRemove.returns(databaseError, null);

        // Use the mock like a real model
        MyMock.findByIdAndRemove('5a190f2cff422a139c0fbf36', '-__v', (err, doc) => {
          expect(err).to.equal(databaseError);
          expect(doc).to.be.null;
          done();
        });
      });

      it('mocks the callback doc with optional parameters', (done) => {
        // Setup our stubs
        const databaseData = [ { name: 'A' }, { name: 'B' } ];

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.findByIdAndRemove.returns(null, databaseData);

        // Use the mock like a real model
        MyMock.findByIdAndRemove('5a190f2cff422a139c0fbf36', '-__v', (err, doc) => {
          expect(err).to.be.null;
          expect(doc).to.equal(databaseData);
          done();
        });
      });

      it('mocks the callback error without optional parameters ', (done) => {
        // Setup our stubs
        const databaseError = new Error('something went wrong');

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.findByIdAndRemove.returns(databaseError, null);

        // Use the mock like a real model
        MyMock.findByIdAndRemove('5a190f2cff422a139c0fbf36', (err, doc) => {
          expect(err).to.equal(databaseError);
          expect(doc).to.be.null;
          done();
        });
      });

      it('mocks the callback doc without optional parameters ', (done) => {
        // Setup our stubs
        const databaseData = [ { name: 'A' }, { name: 'B' } ];

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.findByIdAndRemove.returns(null, databaseData);

        // Use the mock like a real model
        MyMock.findByIdAndRemove('5a190f2cff422a139c0fbf36', (err, doc) => {
          expect(err).to.be.null;
          expect(doc).to.equal(databaseData);
          done();
        });
      });

      it('mocks the callback doc with null', (done) => {
        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.findByIdAndRemove.returns(null, null);

        // Use the mock like a real model
        MyMock.findByIdAndRemove('5a190f2cff422a139c0fbf36', (err, doc) => {
          expect(err).to.be.null;
          expect(doc).to.be.null;
          done();
        });
      });

      it('mocks the callback using matching withParams', (done) => {
        // Setup our stubs
        const databaseData = { name: 'A' };
        const findByIdParams = '5a190f2cff422a139c0fbf36';

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.findByIdAndRemove.withParams(findByIdParams).returns(null, databaseData);

        // Use the mock like a real model
        MyMock.findByIdAndRemove(findByIdParams, (err, doc) => {
          expect(err).to.be.null;
          expect(doc).to.equal(databaseData);
          done();
        });
      });

      it('does nothing when called with non-matching withParams', () => {
        // Setup our stubs
        const databaseData = { name: 'A' };

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.findByIdAndRemove.withParams('sody-pop').returns(null, databaseData);

        // Use the mock like a real model
        return MyMock.findByIdAndRemove('5a190f2cff422a139c0fbf36', () => {
          expect.fail();
        });
      });
    });

    describe('promise', () => {
      it('does nothing when called without defined behavior', () => {
        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();

        // Use the mock like a real model
        expect(MyMock.findByIdAndRemove()).to.be.undefined;
      });

      it('mocks the promise error with optional parameters', () => {
        // Setup our stubs
        const databaseError = new Error('something went wrong');

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.findByIdAndRemove.returns(databaseError, null);

        // Use the mock like a real model
        return MyMock.findByIdAndRemove('5a190f2cff422a139c0fbf36', '-__v')
          .then(() => {
            expect.fail();
          })
          .catch(err => {
            expect(err).to.equal(databaseError);
          });
      });

      it('mocks the promise data with optional parameters', () => {
        // Setup our stubs
        const databaseData = { name: 'C' };

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.findByIdAndRemove.returns(null, databaseData);

        // Use the mock like a real model
        return MyMock.findByIdAndRemove('5a190f2cff422a139c0fbf36', '-__v')
          .then(doc => {
            expect(doc).to.equal(databaseData);
          });
      });

      it('mocks the promise error without optional parameter', () => {
        // Setup our stubs
        const databaseError = new Error('something went wrong');

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.findByIdAndRemove.returns(databaseError, null);

        // Use the mock like a real model
        return MyMock.findByIdAndRemove('5a190f2cff422a139c0fbf36')
          .then(() => {
            expect.fail();
          })
          .catch(err => {
            expect(err).to.equal(databaseError);
          });
      });

      it('mocks the promise data without optional parameters', () => {
        // Setup our stubs
        const databaseData = { name: 'C' };

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.findByIdAndRemove.returns(null, databaseData);

        // Use the mock like a real model
        return MyMock.findByIdAndRemove('5a190f2cff422a139c0fbf36')
          .then(doc => {
            expect(doc).to.equal(databaseData);
          });
      });

      it('mocks the promise data with null', () => {
        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.findByIdAndRemove.returns(null, null);

        // Use the mock like a real model
        return MyMock.findByIdAndRemove('5a190f2cff422a139c0fbf36')
          .then(doc => {
            expect(doc).to.be.null;
          });
      });

      it('mocks the promise using matching withParams', () => {
        // Setup our stubs
        const databaseData = { name: 'A' };
        const findByIdParams = '5a190f2cff422a139c0fbf36';

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.findByIdAndRemove.withParams(findByIdParams).returns(null, databaseData);

        // Use the mock like a real model
        return MyMock.findByIdAndRemove(findByIdParams)
          .then(docs => {
            expect(docs).to.equal(databaseData);
          })
          .catch(() => {
            expect.fail();
          });
      });

      it('does nothing when called with non-matching withParams', () => {
        // Setup our stubs
        const databaseData = { name: 'A' };

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.findByIdAndRemove.withParams('sody-pop').returns(null, databaseData);

        // Use the mock like a real model
        expect(MyMock.findByIdAndRemove('5a190f2cff422a139c0fbf36')).to.be.undefined;
      });
    });
  });

  describe('mock modelName', () => {
    it('returns undefined when called without defined behavior', (done) => {
      // Create a Mongoose Model mock
      const MyMock = modelmock.mock();

      // Use the mock like a real model
      expect(MyMock.modelName).to.be.undefined;
      done();
    });

    it('mocks the schema', (done) => {
      // Setup our stubs
      const modelName = 'Task';

      // Create a Mongoose Model mock
      const MyMock = modelmock.mock(modelName);

      // Use the mock like a real model
      expect(MyMock.modelName).to.equal(modelName);
      done();
    });
  });

  describe('mock schema', () => {
    it('returns undefined when called without defined behavior', (done) => {
      // Create a Mongoose Model mock
      const MyMock = modelmock.mock();

      // Use the mock like a real model
      expect(MyMock.schema).to.be.undefined;
      done();
    });

    it('mocks the schema', (done) => {
      // Setup our stubs
      const schemaData = { name: 'jared' };

      // Create a Mongoose Model mock
      const MyMock = modelmock.mock(null, schemaData);

      // Use the mock like a real model
      expect(MyMock.schema).to.equal(schemaData);
      done();
    });
  });

  describe('mock prototype.save.returns', () => {
    describe('callback', () => {
      it('does nothing when called without defined behavior', () => {
        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();

        // Use the mock like a real model
        const myMock = new MyMock();
        return myMock.save(() => {
          expect.fail();
        });
      });

      it('mocks the callback error with optional parameters', (done) => {
        // Setup our stubs
        const databaseError = new Error('something went wrong');

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.prototype.save.returns(databaseError, null, null);

        // Use the mock like a real model
        const myMock = new MyMock();
        myMock.save({validateBeforeSave: true}, (err, doc, numAffected) => {
          expect(err).to.equal(databaseError);
          expect(doc).to.be.null;
          expect(numAffected).to.be.null;
          done();
        });
      });

      it('mocks the callback doc with optional parameters', (done) => {
        // Setup our stubs
        const databaseData = { name: 'A' };

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.prototype.save.returns(null, databaseData, null);

        // Use the mock like a real model
        const myMock = new MyMock();
        myMock.save({validateBeforeSave: true}, (err, doc, numAffected) => {
          expect(err).to.be.null;
          expect(doc).to.equal(databaseData);
          expect(numAffected).to.be.null;
          done();
        });
      });

      it('mocks the callback numAffected with optional parameters', (done) => {
        // Setup our stubs
        const databaseAffected = 20;

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.prototype.save.returns(null, null, databaseAffected);

        // Use the mock like a real model
        const myMock = new MyMock();
        myMock.save({validateBeforeSave: true}, (err, doc, numAffected) => {
          expect(err).to.be.null;
          expect(doc).to.be.null;
          expect(numAffected).to.equal(databaseAffected);
          done();
        });
      });

      it('mocks the callback error without optional parameters', (done) => {
        // Setup our stubs
        const databaseError = new Error('something went wrong');

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.prototype.save.returns(databaseError, null, null);

        // Use the mock like a real model
        const myMock = new MyMock();
        myMock.save((err, doc, numAffected) => {
          expect(err).to.equal(databaseError);
          expect(doc).to.be.null;
          expect(numAffected).to.be.null;
          done();
        });
      });

      it('mocks the callback doc without optional parameters', (done) => {
        // Setup our stubs
        const databaseData = { name: 'A' };

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.prototype.save.returns(null, databaseData, null);

        // Use the mock like a real model
        const myMock = new MyMock();
        myMock.save((err, doc, numAffected) => {
          expect(err).to.be.null;
          expect(doc).to.equal(databaseData);
          expect(numAffected).to.be.null;
          done();
        });
      });

      it('mocks the callback numAffected without optional parameters', (done) => {
        // Setup our stubs
        const databaseAffected = 20;

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.prototype.save.returns(null, null, databaseAffected);

        // Use the mock like a real model
        const myMock = new MyMock();
        myMock.save((err, doc, numAffected) => {
          expect(err).to.be.null;
          expect(doc).to.be.null;
          expect(numAffected).to.equal(databaseAffected);
          done();
        });
      });

      it('mocks the callback doc with null', (done) => {
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

      it('mocks the callback using document properties', (done) => {
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

    describe('promise', () => {
      it('does nothing when called without defined behavior', () => {
        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();

        // Use the mock like a real model
        const myMock = new MyMock();
        expect(myMock.save()).to.be.undefined;
      });

      it('mocks the promise error with optional parameters', () => {
        // Setup our stubs
        const databaseError = new Error('something went wrong');

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.prototype.save.returns(databaseError, null);

        // Use the mock like a real model
        const myMock = new MyMock();
        return myMock.save({validateBeforeSave: true})
          .then(() => {
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
        MyMock.prototype.save.returns(null, databaseData, null);

        // Use the mock like a real model
        const myMock = new MyMock();
        return myMock.save({validateBeforeSave: true})
          .then(doc => {
            expect(doc).to.equal(databaseData);
          });
      });

      it('mocks the promise error without optional parameters', () => {
        // Setup our stubs
        const databaseError = new Error('something went wrong');

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.prototype.save.returns(databaseError, null, null);

        // Use the mock like a real model
        const myMock = new MyMock();
        return myMock.save()
          .then(() => {
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
        MyMock.prototype.save.returns(null, databaseData, null);

        // Use the mock like a real model
        const myMock = new MyMock();
        return myMock.save()
          .then(doc => {
            expect(doc).to.equal(databaseData);
          });
      });

      it('mocks the promise data with null', () => {
        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.prototype.save.returns(null, null, null);

        // Use the mock like a real model
        const myMock = new MyMock();
        return myMock.save()
          .then(doc => {
            expect(doc).to.be.null;
          });
      });

      it('mocks the promise using document properties', () => {
        // Setup our stubs
        const databaseData = { name: 'A', age: 49 };

        // Create a Mongoose Model mock
        const MyMock = modelmock.mock();
        MyMock.prototype.save.returns();

        // Use the mock like a real model
        const myMock = new MyMock();
        myMock.name = databaseData.name;
        myMock.age = databaseData.age;

        return myMock.save()
          .then(doc => {
            expect(doc).to.deep.equal(databaseData);
          });
      });
    });
  });
});

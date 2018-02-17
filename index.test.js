'use strict';

const chai = require('chai');
const expect = chai.expect;
const modelgoose = require('./index');

describe('modelgoose.model.stub()', () => {
  describe('stub', () => {
    it('creates a stub', (done) => {
      // Create a Mongoose Model stub
      const MyMock = modelgoose.model.stub();

      // Make sure that a stub was created
      expect(MyMock).to.exist;
      done();
    });
  });

  describe('stub find', () => {
    describe('callback', () => {
      it('does nothing when called without defined behavior', () => {
        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();

        // Use the stub like a real model
        return MyMock.find(() => {
          expect.fail();
        });
      });

      it('stubs the callback error with optional parameters', (done) => {
        // Setup our stubs
        const databaseError = new Error('something went wrong');

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
        MyMock.find.returns(databaseError, null);

        // Use the stub like a real model
        MyMock.find({ name: /john/i }, 'name friends', (err, docs) => {
          expect(err).to.equal(databaseError);
          expect(docs).to.be.null;
          done();
        });
      });

      it('stubs the callback docs with optional parameters', (done) => {
        // Setup our stubs
        const databaseData = [ { name: 'A' }, { name: 'B' } ];

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
        MyMock.find.returns(null, databaseData);

        // Use the stub like a real model
        MyMock.find({ name: /john/i }, 'name friends', (err, docs) => {
          expect(err).to.be.null;
          expect(docs).to.equal(databaseData);
          done();
        });
      });

      it('stubs the callback error without optional parameters ', (done) => {
        // Setup our stubs
        const databaseError = new Error('something went wrong');

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
        MyMock.find.returns(databaseError, null);

        // Use the stub like a real model
        MyMock.find((err, docs) => {
          expect(err).to.equal(databaseError);
          expect(docs).to.be.null;
          done();
        });
      });

      it('stubs the callback docs without optional parameters ', (done) => {
        // Setup our stubs
        const databaseData = [ { name: 'A' }, { name: 'B' } ];

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
        MyMock.find.returns(null, databaseData);

        // Use the stub like a real model
        MyMock.find((err, docs) => {
          expect(err).to.be.null;
          expect(docs).to.equal(databaseData);
          done();
        });
      });

      it('stubs the callback err with a full query chain', (done) => {
        // Setup our stubs
        const databaseError = new Error('something went wrong');

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
        MyMock.find.returns(databaseError, null);

        // Use the stub like a real model
        MyMock.find({ name: /john/i }, 'name friends').where('age').gt(10).exec((err, docs) => {
          expect(err).to.equal(databaseError);
          expect(docs).to.be.null;
          done();
        });
      });

      it('stubs the callback docs with a full query chain', (done) => {
        // Setup our stubs
        const databaseData = [ { name: 'A' }, { name: 'B' } ];

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
        MyMock.find.returns(null, databaseData);

        // Use the stub like a real model
        MyMock.find({ name: /john/i }, 'name friends').where('age').gt(10).exec((err, docs) => {
          expect(err).to.be.null;
          expect(docs).to.equal(databaseData);
          done();
        });
      });

      it('stubs the callback docs with null', (done) => {
        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
        MyMock.find.returns(null, null);

        // Use the stub like a real model
        MyMock.find((err, doc) => {
          expect(err).to.be.null;
          expect(doc).to.be.null;
          done();
        });
      });
    });

    describe('promise', () => {
      it('does nothing when called without defined behavior promise', () => {
        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();

        // Use the stub like a real model
        expect(MyMock.find()).to.be.undefined;
      });

      it('stubs the promise error with optional parameters', () => {
        // Setup our stubs
        const databaseError = new Error('something went wrong');

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
        MyMock.find.returns(databaseError, null);

        // Use the stub like a real model
        return MyMock.find({ name: /john/i }, 'name friends')
          .then(() => {
            expect.fail();
          })
          .catch(err => {
            expect(err).to.equal(databaseError);
          });
      });

      it('stubs the promise docs with optional parameters', () => {
        // Setup our stubs
        const databaseData = [ { name: 'A' }, { name: 'B' } ];

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
        MyMock.find.returns(null, databaseData);

        // Use the stub like a real model
        return MyMock.find({ name: /john/i }, 'name friends')
          .then(docs => {
            expect(docs).to.equal(databaseData);
          })
          .catch(() => {
            expect.fail();
          });
      });

      it('stubs the promise error without optional parameters', () => {
        // Setup our stubs
        const databaseError = new Error('something went wrong');

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
        MyMock.find.returns(databaseError, null);

        // Use the stub like a real model
        return MyMock.find()
          .then(() => {
            expect.fail();
          })
          .catch(err => {
            expect(err).to.equal(databaseError);
          });
      });

      it('stubs the promise docs without optional parameters', () => {
        // Setup our stubs
        const databaseData = [ { name: 'A' }, { name: 'B' } ];

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
        MyMock.find.returns(null, databaseData);

        // Use the stub like a real model
        return MyMock.find()
          .then(docs => {
            expect(docs).to.equal(databaseData);
          })
          .catch(() => {
            expect.fail();
          });
      });

      it('stubs the promise err with a full query chain', () => {
        // Setup our stubs
        const databaseError = new Error('something went wrong');

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
        MyMock.find.returns(databaseError, null);

        // Use the stub like a real model
        return MyMock.find({ name: /john/i }, 'name friends').where('age').gt(10)
          .then(data => {
            expect.fail();
          })
          .catch(err => {
            expect(err).to.equal(databaseError);
          });
      });

      it('stubs the promise docs with a full query chain', () => {
        // Setup our stubs
        const databaseData = [ { name: 'A' }, { name: 'B' } ];

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
        MyMock.find.returns(null, databaseData);

        // Use the stub like a real model
        return MyMock.find({ name: /john/i }, 'name friends').where('age').gt(10)
          .then(docs => {
            expect(docs).to.equal(databaseData);
          })
          .catch(() => {
            expect.fail();
          });
      });

      it('stubs the promise docs with null', () => {
        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
        MyMock.find.returns(null, null);

        // Use the stub like a real model
        return MyMock.find()
          .then(docs => {
            expect(docs).to.be.null;
          })
          .catch(() => {
            expect.fail();
          });
      });
    });
  });

  describe('stub findById', () => {
    describe('callback', () => {
      it('does nothing when called without defined behavior', () => {
        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();

        // Use the stub like a real model
        return MyMock.findById('5a190f2cff422a139c0fbf36', () => {
          expect.fail();
        });
      });

      it('stubs the callback error with optional parameterse', (done) => {
        // Setup our stubs
        const databaseError = new Error('something went wrong');

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
        MyMock.findById.returns(databaseError, null);

        // Use the stub like a real model
        MyMock.findById('5a190f2cff422a139c0fbf36', '-__v', (err, doc) => {
          expect(err).to.equal(databaseError);
          expect(doc).to.be.null;
          done();
        });
      });

      it('stubs the callback doc with optional parameterse', (done) => {
        // Setup our stubs
        const databaseData = { name: 'A' };

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
        MyMock.findById.returns(null, databaseData);

        // Use the stub like a real model
        MyMock.findById('5a190f2cff422a139c0fbf36', '-__v', (err, doc) => {
          expect(err).to.be.null;
          expect(doc).to.equal(databaseData);
          done();
        });
      });

      it('stubs the callback error without optional parameters', (done) => {
        // Setup our stubs
        const databaseError = new Error('something went wrong');

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
        MyMock.findById.returns(databaseError, null);

        // Use the stub like a real model
        MyMock.findById('5a190f2cff422a139c0fbf36', (err, doc) => {
          expect(err).to.equal(databaseError);
          expect(doc).to.be.null;
          done();
        });
      });

      it('stubs the callback doc without optional parameters', (done) => {
        // Setup our stubs
        const databaseData = { name: 'A' };

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
        MyMock.findById.returns(null, databaseData);

        // Use the stub like a real model
        MyMock.findById('5a190f2cff422a139c0fbf36', (err, doc) => {
          expect(err).to.be.null;
          expect(doc).to.equal(databaseData);
          done();
        });
      });

      it('stubs the callback doc with null', (done) => {
        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
        MyMock.findById.returns(null, null);

        // Use the stub like a real model
        MyMock.findById('5a190f2cff422a139c0fbf36', (err, doc) => {
          expect(err).to.be.null;
          expect(doc).to.be.null;
          done();
        });
      });
    });

    describe('promise', () => {
      it('does nothing when called without defined behavior', () => {
        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();

        // Use the stub like a real model
        expect(MyMock.find()).to.be.undefined;
      });

      it('stubs the promise error with optional parameters', () => {
        // Setup our stubs
        const databaseError = new Error('something went wrong');

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
        MyMock.findById.returns(databaseError, null);

        // Use the stub like a real model
        return MyMock.findById('5a190f2cff422a139c0fbf36', '-__v')
          .then(() => {
            expect.fail();
          })
          .catch(err => {
            expect(err).to.equal(databaseError);
          });
      });

      it('stubs the promise doc with optional parameters', () => {
        // Setup our stubs
        const databaseData = { name: 'A' };

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
        MyMock.findById.returns(null, databaseData);

        // Use the stub like a real model
        return MyMock.findById('5a190f2cff422a139c0fbf36', '-__v')
          .then(doc => {
            expect(doc).to.equal(databaseData);
          })
          .catch(() => {
            expect.fail();
          });
      });

      it('stubs the promise error without optional parameters', () => {
        // Setup our stubs
        const databaseError = new Error('something went wrong');

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
        MyMock.findById.returns(databaseError, null);

        // Use the stub like a real model
        return MyMock.findById('5a190f2cff422a139c0fbf36')
          .then(() => {
            expect.fail();
          })
          .catch(err => {
            expect(err).to.equal(databaseError);
          });
      });

      it('stubs the promise doc without optional parameters', () => {
        // Setup our stubs
        const databaseData = { name: 'A' };

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
        MyMock.findById.returns(null, databaseData);

        // Use the stub like a real model
        return MyMock.findById('5a190f2cff422a139c0fbf36')
          .then(doc => {
            expect(doc).to.equal(databaseData);
          })
          .catch(() => {
            expect.fail();
          });
      });

      it('stubs the promise docs with null', () => {
        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
        MyMock.findById.returns(null, null);

        // Use the stub like a real model
        return MyMock.findById()
          .then(doc => {
            expect(doc).to.be.null;
          })
          .catch(() => {
            expect.fail();
          });
      });
    });
  });

  describe('stub findByIdAndUpdate', () => {
    describe('callback', () => {
      it('does nothing when called without defined behavior', () => {
        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();

        // Use the stub like a real model
        return MyMock.findByIdAndUpdate('5a190f2cff422a139c0fbf36', { name: 'C' }, () => {
          expect.fail();
        });
      });

      it('stubs the callback error with optional parameters', (done) => {
        // Setup our stubs
        const databaseError = new Error('something went wrong');

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
        MyMock.findByIdAndUpdate.returns(databaseError, null);

        // Use the stub like a real model
        MyMock.findByIdAndUpdate('5a190f2cff422a139c0fbf36', { name: 'C' }, '-__v', (err, doc) => {
          expect(err).to.equal(databaseError);
          expect(doc).to.be.null;
          done();
        });
      });

      it('stubs the callback doc with optional parameters', (done) => {
        // Setup our stubs
        const databaseData = { name: 'A' };

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
        MyMock.findByIdAndUpdate.returns(null, databaseData);

        // Use the stub like a real model
        MyMock.findByIdAndUpdate('5a190f2cff422a139c0fbf36', { name: 'C' }, '-__v', (err, doc) => {
          expect(err).to.be.null;
          expect(doc).to.equal(databaseData);
          done();
        });
      });

      it('stubs the callback error without optional parameters ', (done) => {
        // Setup our stubs
        const databaseError = new Error('something went wrong');

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
        MyMock.findByIdAndUpdate.returns(databaseError, null);

        // Use the stub like a real model
        MyMock.findByIdAndUpdate('5a190f2cff422a139c0fbf36', { name: 'C' }, (err, doc) => {
          expect(err).to.equal(databaseError);
          expect(doc).to.be.null;
          done();
        });
      });

      it('stubs the callback doc without optional parameters ', (done) => {
        // Setup our stubs
        const databaseData = { name: 'A' };

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
        MyMock.findByIdAndUpdate.returns(null, databaseData);

        // Use the stub like a real model
        MyMock.findByIdAndUpdate('5a190f2cff422a139c0fbf36', { name: 'C' }, (err, doc) => {
          expect(err).to.be.null;
          expect(doc).to.equal(databaseData);
          done();
        });
      });

      it('stubs the callback doc with null', (done) => {
        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
        MyMock.findByIdAndUpdate.returns(null, null);

        // Use the stub like a real model
        MyMock.findByIdAndUpdate('5a190f2cff422a139c0fbf36', { name: 'C' }, (err, doc) => {
          expect(err).to.be.null;
          expect(doc).to.be.null;
          done();
        });
      });
    });

    describe('promise', () => {
      it('does nothing when called without defined behavior', () => {
        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();

        // Use the stub like a real model
        expect(MyMock.findByIdAndUpdate()).to.be.undefined;
      });

      it('stubs the promise error with optional parameters', () => {
        // Setup our stubs
        const databaseError = new Error('something went wrong');

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
        MyMock.findByIdAndUpdate.returns(databaseError, null);

        // Use the stub like a real model
        return MyMock.findByIdAndUpdate('5a190f2cff422a139c0fbf36', { name: 'C' }, '-__v')
          .then(() => {
            expect.fail();
          })
          .catch(err => {
            expect(err).to.equal(databaseError);
          });
      });

      it('stubs the promise data with optional parameters', () => {
        // Setup our stubs
        const databaseData = { name: 'C' };

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
        MyMock.findByIdAndUpdate.returns(null, databaseData);

        // Use the stub like a real model
        return MyMock.findByIdAndUpdate('5a190f2cff422a139c0fbf36', { name: 'C' }, '-__v')
          .then(doc => {
            expect(doc).to.equal(databaseData);
          });
      });

      it('stubs the promise error without optional parameter', () => {
        // Setup our stubs
        const databaseError = new Error('something went wrong');

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
        MyMock.findByIdAndUpdate.returns(databaseError, null);

        // Use the stub like a real model
        return MyMock.findByIdAndUpdate('5a190f2cff422a139c0fbf36', { name: 'C' })
          .then(() => {
            expect.fail();
          })
          .catch(err => {
            expect(err).to.equal(databaseError);
          });
      });

      it('stubs the promise data without optional parameters', () => {
        // Setup our stubs
        const databaseData = { name: 'C' };

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
        MyMock.findByIdAndUpdate.returns(null, databaseData);

        // Use the stub like a real model
        return MyMock.findByIdAndUpdate('5a190f2cff422a139c0fbf36', { name: 'C' })
          .then(doc => {
            expect(doc).to.equal(databaseData);
          });
      });

      it('stubs the promise data with null', () => {
        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
        MyMock.findByIdAndUpdate.returns(null, null);

        // Use the stub like a real model
        return MyMock.findByIdAndUpdate('5a190f2cff422a139c0fbf36', { name: 'C' })
          .then(doc => {
            expect(doc).to.be.null;
          });
      });
    });
  });

  describe('stub findByIdAndRemove', () => {
    describe('callback', () => {
      it('does nothing when called without defined behavior', () => {
        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();

        // Use the stub like a real model
        return MyMock.findByIdAndRemove('5a190f2cff422a139c0fbf36', () => {
          expect.fail();
        });
      });

      it('stubs the callback error with optional parameters', (done) => {
        // Setup our stubs
        const databaseError = new Error('something went wrong');

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
        MyMock.findByIdAndRemove.returns(databaseError, null);

        // Use the stub like a real model
        MyMock.findByIdAndRemove('5a190f2cff422a139c0fbf36', '-__v', (err, doc) => {
          expect(err).to.equal(databaseError);
          expect(doc).to.be.null;
          done();
        });
      });

      it('stubs the callback doc with optional parameters', (done) => {
        // Setup our stubs
        const databaseData = [ { name: 'A' }, { name: 'B' } ];

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
        MyMock.findByIdAndRemove.returns(null, databaseData);

        // Use the stub like a real model
        MyMock.findByIdAndRemove('5a190f2cff422a139c0fbf36', '-__v', (err, doc) => {
          expect(err).to.be.null;
          expect(doc).to.equal(databaseData);
          done();
        });
      });

      it('stubs the callback error without optional parameters ', (done) => {
        // Setup our stubs
        const databaseError = new Error('something went wrong');

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
        MyMock.findByIdAndRemove.returns(databaseError, null);

        // Use the stub like a real model
        MyMock.findByIdAndRemove('5a190f2cff422a139c0fbf36', (err, doc) => {
          expect(err).to.equal(databaseError);
          expect(doc).to.be.null;
          done();
        });
      });

      it('stubs the callback doc without optional parameters ', (done) => {
        // Setup our stubs
        const databaseData = [ { name: 'A' }, { name: 'B' } ];

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
        MyMock.findByIdAndRemove.returns(null, databaseData);

        // Use the stub like a real model
        MyMock.findByIdAndRemove('5a190f2cff422a139c0fbf36', (err, doc) => {
          expect(err).to.be.null;
          expect(doc).to.equal(databaseData);
          done();
        });
      });

      it('stubs the callback doc with null', (done) => {
        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
        MyMock.findByIdAndRemove.returns(null, null);

        // Use the stub like a real model
        MyMock.findByIdAndRemove('5a190f2cff422a139c0fbf36', (err, doc) => {
          expect(err).to.be.null;
          expect(doc).to.be.null;
          done();
        });
      });
    });

    describe('promise', () => {
      it('does nothing when called without defined behavior', () => {
        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();

        // Use the stub like a real model
        expect(MyMock.findByIdAndRemove()).to.be.undefined;
      });

      it('stubs the promise error with optional parameters', () => {
        // Setup our stubs
        const databaseError = new Error('something went wrong');

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
        MyMock.findByIdAndRemove.returns(databaseError, null);

        // Use the stub like a real model
        return MyMock.findByIdAndRemove('5a190f2cff422a139c0fbf36', '-__v')
          .then(() => {
            expect.fail();
          })
          .catch(err => {
            expect(err).to.equal(databaseError);
          });
      });

      it('stubs the promise data with optional parameters', () => {
        // Setup our stubs
        const databaseData = { name: 'C' };

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
        MyMock.findByIdAndRemove.returns(null, databaseData);

        // Use the stub like a real model
        return MyMock.findByIdAndRemove('5a190f2cff422a139c0fbf36', '-__v')
          .then(doc => {
            expect(doc).to.equal(databaseData);
          });
      });

      it('stubs the promise error without optional parameter', () => {
        // Setup our stubs
        const databaseError = new Error('something went wrong');

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
        MyMock.findByIdAndRemove.returns(databaseError, null);

        // Use the stub like a real model
        return MyMock.findByIdAndRemove('5a190f2cff422a139c0fbf36')
          .then(() => {
            expect.fail();
          })
          .catch(err => {
            expect(err).to.equal(databaseError);
          });
      });

      it('stubs the promise data without optional parameters', () => {
        // Setup our stubs
        const databaseData = { name: 'C' };

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
        MyMock.findByIdAndRemove.returns(null, databaseData);

        // Use the stub like a real model
        return MyMock.findByIdAndRemove('5a190f2cff422a139c0fbf36')
          .then(doc => {
            expect(doc).to.equal(databaseData);
          });
      });

      it('stubs the promise data with null', () => {
        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
        MyMock.findByIdAndRemove.returns(null, null);

        // Use the stub like a real model
        return MyMock.findByIdAndRemove('5a190f2cff422a139c0fbf36')
          .then(doc => {
            expect(doc).to.be.null;
          });
      });
    });
  });

  describe('stub modelName', () => {
    it('returns undefined when called without defined behavior', (done) => {
      // Create a Mongoose Model stub
      const MyMock = modelgoose.model.stub();

      // Use the stub like a real model
      expect(MyMock.modelName).to.be.undefined;
      done();
    });

    it('stubs the schema', (done) => {
      // Setup our stubs
      const modelName = 'Task';

      // Create a Mongoose Model stub
      const MyMock = modelgoose.model.stub(modelName);

      // Use the stub like a real model
      expect(MyMock.modelName).to.equal(modelName);
      done();
    });
  });

  describe('stub schema', () => {
    it('returns undefined when called without defined behavior', (done) => {
      // Create a Mongoose Model stub
      const MyMock = modelgoose.model.stub();

      // Use the stub like a real model
      expect(MyMock.schema).to.be.undefined;
      done();
    });

    it('stubs the schema', (done) => {
      // Setup our stubs
      const schemaData = { name: 'jared' };

      // Create a Mongoose Model stub
      const MyMock = modelgoose.model.stub(null, schemaData);

      // Use the stub like a real model
      expect(MyMock.schema).to.equal(schemaData);
      done();
    });
  });

  describe('stub prototype.save', () => {
    describe('callback', () => {
      it('does nothing when called without defined behavior', () => {
        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();

        // Use the stub like a real model
        const myMock = new MyMock();
        return myMock.save(() => {
          expect.fail();
        });
      });

      it('stubs the callback error with optional parameters', (done) => {
        // Setup our stubs
        const databaseError = new Error('something went wrong');

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
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

      it('stubs the callback doc with optional parameters', (done) => {
        // Setup our stubs
        const databaseData = { name: 'A' };

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
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

      it('stubs the callback numAffected with optional parameters', (done) => {
        // Setup our stubs
        const databaseAffected = 20;

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
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

      it('stubs the callback error without optional parameters', (done) => {
        // Setup our stubs
        const databaseError = new Error('something went wrong');

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
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

      it('stubs the callback doc without optional parameters', (done) => {
        // Setup our stubs
        const databaseData = { name: 'A' };

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
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

      it('stubs the callback numAffected without optional parameters', (done) => {
        // Setup our stubs
        const databaseAffected = 20;

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
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

      it('stubs the callback doc with null', (done) => {
        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
        MyMock.prototype.save.returns(null, null, null);

        // Use the stub like a real model
        const myMock = new MyMock();
        myMock.save((err, doc, numAffected) => {
          expect(err).to.be.null;
          expect(doc).to.be.null;
          expect(numAffected).to.be.null;
          done();
        });
      });

      it('stubs the callback using document properties', (done) => {
        // Setup our stubs
        const databaseData = { name: 'A', age: 49 };

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
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

    describe('promise', () => {
      it('does nothing when called without defined behavior', () => {
        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();

        // Use the stub like a real model
        const myMock = new MyMock();
        expect(myMock.save()).to.be.undefined;
      });

      it('stubs the promise error with optional parameters', () => {
        // Setup our stubs
        const databaseError = new Error('something went wrong');

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
        MyMock.prototype.save.returns(databaseError, null);

        // Use the stub like a real model
        const myMock = new MyMock();
        return myMock.save({validateBeforeSave: true})
          .then(() => {
            expect.fail();
          })
          .catch(err => {
            expect(err).to.equal(databaseError);
          });
      });

      it('stubs the promise data with optional parameters', () => {
        // Setup our stubs
        const databaseData = { name: 'A' };

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
        MyMock.prototype.save.returns(null, databaseData, null);

        // Use the stub like a real model
        const myMock = new MyMock();
        return myMock.save({validateBeforeSave: true})
          .then(doc => {
            expect(doc).to.equal(databaseData);
          });
      });

      it('stubs the promise error without optional parameters', () => {
        // Setup our stubs
        const databaseError = new Error('something went wrong');

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
        MyMock.prototype.save.returns(databaseError, null, null);

        // Use the stub like a real model
        const myMock = new MyMock();
        return myMock.save()
          .then(() => {
            expect.fail();
          })
          .catch(err => {
            expect(err).to.equal(databaseError);
          });
      });

      it('stubs the promise data without optional parameters', () => {
        // Setup our stubs
        const databaseData = { name: 'A' };

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
        MyMock.prototype.save.returns(null, databaseData, null);

        // Use the stub like a real model
        const myMock = new MyMock();
        return myMock.save()
          .then(doc => {
            expect(doc).to.equal(databaseData);
          });
      });

      it('stubs the promise data with null', () => {
        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
        MyMock.prototype.save.returns(null, null, null);

        // Use the stub like a real model
        const myMock = new MyMock();
        return myMock.save()
          .then(doc => {
            expect(doc).to.be.null;
          });
      });

      it('stubs the promise using document properties', () => {
        // Setup our stubs
        const databaseData = { name: 'A', age: 49 };

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.stub();
        MyMock.prototype.save.returns();

        // Use the stub like a real model
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

describe('modelgoose.model.mock()', () => {
  describe('mock find', () => {
    describe('callback', () => {
      it('it works with a callback', (done) => {
        // Setup our stubs
        const databaseData = { name: 'A', age: 49 };

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.mock();
        MyMock.find.withArgs({name: 'A'}).returns(null, databaseData);

        // Use the stub like a real model
        const myMock = new MyMock();

        MyMock.find({name: 'A'}, (err, docs) => {
          expect(err).to.be.null;
          expect(docs).to.equal(databaseData);
          done();
        });
      });
    });

    describe('promise', () => {
      it('it works with two mock definitions', () => {
        // Setup our stubs
        const databaseData = { name: 'A', age: 35 };
        const databaseData2 = { name: 'A', age: 49 };

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.mock();
        MyMock.find.withArgs({name: 'A'}).where.withArgs({ age: 49 }, '--x').returns(null, databaseData2);
        MyMock.find.withArgs({name: 'A'}).where.withArgs({ age: 35 }, '--v').returns(null, databaseData);

        // Use the stub like a real model
        const myMock = new MyMock();

        return MyMock.find({name: 'A'}).where({age: 49}, '--x')
          .then(doc => {
            expect(doc).to.deep.equal(databaseData2);
          });
      });

      it('it works with two mock definitions multilevel', () => {
        // Setup our stubs
        const databaseData = { name: 'A', age: 35 };
        const databaseData2 = { name: 'A', age: 49 };

        // Create a Mongoose Model stub
        const MyMock = modelgoose.model.mock();
        MyMock.find.withArgs({name: 'A'}).where.withArgs({age: 49 }, '--x').returns(null, databaseData2);
        MyMock.find.withArgs({name: 'A'}).where.withArgs({age: 35 }, '--v').where.withArgs({age: 35 }).returns(null, databaseData);

        // Use the stub like a real model
        const myMock = new MyMock();

        return MyMock.find({name: 'A'}).where({age: 49}, '--x')
          .then(doc => {
            expect(doc).to.deep.equal(databaseData2);
          });
      });
    });
  })
});

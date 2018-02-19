'use strict';

const chai = require('chai');
const expect = chai.expect;
const testgoose = require('./index');

describe('testgoose', () => {
  describe('model.mock()', () => {
    it('throws an error when called with arguments that the tester did not specify', (done) => {
      // Create a Mongoose Model mock
      const ModelMock = testgoose.model.mock();
      ModelMock
        .find.withArgs({ occupation: /host/ })
        .where.withArgs('name.last')
        .equals.withArgs('Ghost')
        .where.withArgs('age')
        .gt.withArgs(17)
        .lt.withArgs(66)
        .where.withArgs('likes')
        .in.withArgs(['vaporizing', 'talking'])
        .limit.withArgs(10)
        .sort.withArgs('-occupation')
        .select.withArgs('name occupation')
        .returns(null, { name: 'fred' });

      // Use the mock like a real model
      try {
        ModelMock
          .find({ occupation: /host/ })
          .where('name.last')
          .equals('Ghost')
          .where('age')
          .gt(17)
          .lt(66)
          .where('likes')
          .in(['vaporizing', 'talking'])
          .limit(10)
          .sort('-occupation')
          .select('SOMETHING ELSE')
          .exec();

        done(new Error('should have thrown an error'))
      }
      catch(err) {
        const expectedErrorMessage = 'invoked query with incorrect chain: ' +
          '[' +
            '{"func":"find","matchers":[{"occupation":{}}]},' +
            '{"func":"where","matchers":["name.last"]},' +
            '{"func":"equals","matchers":["Ghost"]},' +
            '{"func":"where","matchers":["age"]},' +
            '{"func":"gt","matchers":[17]},' +
            '{"func":"lt","matchers":[66]},' +
            '{"func":"where","matchers":["likes"]},' +
            '{"func":"in","matchers":[["vaporizing","talking"]]}' +
            ',{"func":"limit","matchers":[10]},' +
            '{"func":"sort","matchers":["-occupation"]},' +
            '{"func":"select","matchers":["SOMETHING ELSE"]}' +
          ']';

        expect(err.message).to.equal(expectedErrorMessage);
        done();
      }
    });

    it('mocks the model with multiple mock setups', (done) => {
      // Setup our stubs
      const errStub = 'something went wrong';

      // Create the Mongoose Model mocks

      const ModelMock = testgoose.model.mock();
      ModelMock
        .find.withArgs({ occupation: /host/ })
        .where.withArgs('name.last')
        .equals.withArgs('Ghost')
        .where.withArgs('age')
        .gt.withArgs(17)
        .lt.withArgs(66)
        .where.withArgs('likes')
        .in.withArgs(['vaporizing', 'talking'])
        .limit.withArgs(10)
        .sort.withArgs('-occupation')
        .select.withArgs('name occupation')
        .returns(errStub, null);

      const SecondaryModelMock = testgoose.model.mock();
      SecondaryModelMock
        .find.withArgs('fish')
        .returns(null, null);

      // Use the mock like a real model
      ModelMock
        .find({ occupation: /host/ })
        .where('name.last')
        .equals('Ghost')
        .where('age')
        .gt(17)
        .lt(66)
        .where('likes')
        .in(['vaporizing', 'talking'])
        .limit(10)
        .sort('-occupation')
        .select('name occupation')
        .exec((err, data) => {
          expect(err).to.equal(errStub);
          expect(data).to.be.null;
          done();
        });
    });

    it('mocks the callback err with a single long query chain definition', (done) => {
      // Setup our stubs
      const errStub = 'something went wrong';

      // Create a Mongoose Model mock
      const ModelMock = testgoose.model.mock();
      ModelMock
        .find.withArgs({ occupation: /host/ })
        .where.withArgs('name.last')
        .equals.withArgs('Ghost')
        .where.withArgs('age')
        .gt.withArgs(17)
        .lt.withArgs(66)
        .where.withArgs('likes')
        .in.withArgs(['vaporizing', 'talking'])
        .limit.withArgs(10)
        .sort.withArgs('-occupation')
        .select.withArgs('name occupation')
        .returns(errStub, null);

      // Use the mock like a real model
      ModelMock
        .find({ occupation: /host/ })
        .where('name.last')
        .equals('Ghost')
        .where('age')
        .gt(17)
        .lt(66)
        .where('likes')
        .in(['vaporizing', 'talking'])
        .limit(10)
        .sort('-occupation')
        .select('name occupation')
        .exec((err, data) => {
          expect(err).to.equal(errStub);
          expect(data).to.be.null;
          done();
        });
    });

    it('mocks the callback err with multiple long query chain definitions', (done) => {
      // Setup our stubs
      const errStub = 'something went wrong';

      // Create a Mongoose Model mock
      const ModelMock = testgoose.model.mock();

      // Setup our chain definitions

      ModelMock
        .find.withArgs({ occupation: /host/ })
        .where.withArgs('name.last')
        .equals.withArgs('Ghost')
        .where.withArgs('age')
        .gt.withArgs(17)
        .lt.withArgs(66)
        .where.withArgs('likes')
        .in.withArgs(['vaporizing', 'talking'])
        .limit.withArgs(10)
        .sort.withArgs('-occupation')
        .select.withArgs('name sandwich')
        .returns('moose', null);

      ModelMock
        .find.withArgs({ occupation: /host/ })
        .where.withArgs('name.last')
        .equals.withArgs('Ghost')
        .where.withArgs('age')
        .gt.withArgs(17)
        .lt.withArgs(66)
        .where.withArgs('likes')
        .in.withArgs(['vaporizing', 'talking'])
        .limit.withArgs(10)
        .sort.withArgs('-occupation')
        .select.withArgs('name occupation')
        .returns(errStub, null);

      ModelMock
        .find.withArgs({ occupation: /host/ })
        .where.withArgs('name.last')
        .equals.withArgs('Ghost')
        .where.withArgs('age')
        .gt.withArgs(17)
        .lt.withArgs(66)
        .where.withArgs('likes')
        .in.withArgs(['vaporizing', 'talking'])
        .limit.withArgs(10)
        .sort.withArgs('-occupation')
        .select.withArgs('hero')
        .returns('caravan');

      // Use the mock like a real model
      ModelMock
        .find({ occupation: /host/ })
        .where('name.last')
        .equals('Ghost')
        .where('age')
        .gt(17)
        .lt(66)
        .where('likes')
        .in(['vaporizing', 'talking'])
        .limit(10)
        .sort('-occupation')
        .select('name occupation')
        .exec((err, data) => {
          expect(err).to.equal(errStub);
          expect(data).to.be.null;
          done();
        });
    });

    it('mocks the callback data with a single long query chain definition', (done) => {
      // Setup our stubs
      const dataStub = { name: 'fred' };

      // Create a Mongoose Model mock
      const ModelMock = testgoose.model.mock();
      ModelMock
        .find.withArgs({ occupation: /host/ })
        .where.withArgs('name.last')
        .equals.withArgs('Ghost')
        .where.withArgs('age')
        .gt.withArgs(17)
        .lt.withArgs(66)
        .where.withArgs('likes')
        .in.withArgs(['vaporizing', 'talking'])
        .limit.withArgs(10)
        .sort.withArgs('-occupation')
        .select.withArgs('name occupation')
        .returns(null, dataStub);

      // Use the mock like a real model
      ModelMock
        .find({ occupation: /host/ })
        .where('name.last')
        .equals('Ghost')
        .where('age')
        .gt(17)
        .lt(66)
        .where('likes')
        .in(['vaporizing', 'talking'])
        .limit(10)
        .sort('-occupation')
        .select('name occupation')
        .exec((err, data) => {
          expect(err).to.be.null;
          expect(data).to.equal(dataStub);
          done();
        });
    });

    it('mocks the callback data with multiple long query chain definitions', (done) => {
      // Setup our stubs
      const dataStub = { name: 'fred' };

      // Create a Mongoose Model mock
      const ModelMock = testgoose.model.mock();

      // Setup our chain definitions

      ModelMock
        .find.withArgs({ occupation: /host/ })
        .where.withArgs('name.last')
        .equals.withArgs('Ghost')
        .where.withArgs('age')
        .gt.withArgs(17)
        .lt.withArgs(66)
        .where.withArgs('likes')
        .in.withArgs(['vaporizing', 'talking'])
        .limit.withArgs(10)
        .sort.withArgs('-occupation')
        .select.withArgs('name sandwich')
        .returns(null, 'moose');

      ModelMock
        .find.withArgs({ occupation: /host/ })
        .where.withArgs('name.last')
        .equals.withArgs('Ghost')
        .where.withArgs('age')
        .gt.withArgs(17)
        .lt.withArgs(66)
        .where.withArgs('likes')
        .in.withArgs(['vaporizing', 'talking'])
        .limit.withArgs(10)
        .sort.withArgs('-occupation')
        .select.withArgs('name occupation')
        .returns(null, dataStub);

      ModelMock
        .find.withArgs({ occupation: /host/ })
        .where.withArgs('name.last')
        .equals.withArgs('Ghost')
        .where.withArgs('age')
        .gt.withArgs(17)
        .lt.withArgs(66)
        .where.withArgs('likes')
        .in.withArgs(['vaporizing', 'talking'])
        .limit.withArgs(10)
        .sort.withArgs('-occupation')
        .select.withArgs('name sandwich')
        .returns(null, 'caravan');

      // Use the mock like a real model
      ModelMock
        .find({ occupation: /host/ })
        .where('name.last')
        .equals('Ghost')
        .where('age')
        .gt(17)
        .lt(66)
        .where('likes')
        .in(['vaporizing', 'talking'])
        .limit(10)
        .sort('-occupation')
        .select('name occupation')
        .exec((err, data) => {
          expect(err).to.be.null;
          expect(data).to.equal(dataStub);
          done();
        });
    });

    it('mocks the promise err with a single long query chain definition', () => {
      // Setup our stubs
      const errStub = 'something went wrong';

      // Create a Mongoose Model mock
      const ModelMock = testgoose.model.mock();
      ModelMock
        .find.withArgs({ occupation: /host/ })
        .where.withArgs('name.last')
        .equals.withArgs('Ghost')
        .where.withArgs('age')
        .gt.withArgs(17)
        .lt.withArgs(66)
        .where.withArgs('likes')
        .in.withArgs(['vaporizing', 'talking'])
        .limit.withArgs(10)
        .sort.withArgs('-occupation')
        .select.withArgs('name occupation')
        .returns(errStub, null);

      // Use the mock like a real model
      return ModelMock
        .find({ occupation: /host/ })
        .where('name.last')
        .equals('Ghost')
        .where('age')
        .gt(17)
        .lt(66)
        .where('likes')
        .in(['vaporizing', 'talking'])
        .limit(10)
        .sort('-occupation')
        .select('name occupation')
        .then(() => {
          expect.fail();
        })
        .catch(err => {
          expect(err).to.deep.equal(errStub);
        });
    });

    it('mocks the promise err with multiple long query chain definitions', () => {
      // Setup our stubs
      const errStub = 'something went wrong';

      // Create a Mongoose Model mock
      const ModelMock = testgoose.model.mock();

      // Setup our chain definitions

      ModelMock
        .find.withArgs({ occupation: /host/ })
        .where.withArgs('name.last')
        .equals.withArgs('Ghost')
        .where.withArgs('age')
        .gt.withArgs(17)
        .lt.withArgs(66)
        .where.withArgs('likes')
        .in.withArgs(['vaporizing', 'talking'])
        .limit.withArgs(10)
        .sort.withArgs('-occupation')
        .select.withArgs('name sandwich')
        .returns('moose', null);

      ModelMock
        .find.withArgs({ occupation: /host/ })
        .where.withArgs('name.last')
        .equals.withArgs('Ghost')
        .where.withArgs('age')
        .gt.withArgs(17)
        .lt.withArgs(66)
        .where.withArgs('likes')
        .in.withArgs(['vaporizing', 'talking'])
        .limit.withArgs(10)
        .sort.withArgs('-occupation')
        .select.withArgs('name occupation')
        .returns(errStub, null);

      ModelMock
        .find.withArgs({ occupation: /host/ })
        .where.withArgs('name.last')
        .equals.withArgs('Ghost')
        .where.withArgs('age')
        .gt.withArgs(17)
        .lt.withArgs(66)
        .where.withArgs('likes')
        .in.withArgs(['vaporizing', 'talking'])
        .limit.withArgs(10)
        .sort.withArgs('-occupation')
        .select.withArgs('hero')
        .returns('caravan');

      // Use the mock like a real model
      return ModelMock
        .find({ occupation: /host/ })
        .where('name.last')
        .equals('Ghost')
        .where('age')
        .gt(17)
        .lt(66)
        .where('likes')
        .in(['vaporizing', 'talking'])
        .limit(10)
        .sort('-occupation')
        .select('name occupation')
        .then(() => {
          expect.fail();
        })
        .catch(err => {
          expect(err).to.deep.equal(errStub);
        });
    });

    it('mocks the promise data with a single long query chain definition', () => {
      // Setup our stubs
      const dataStub = { name: 'fred' };

      // Create a Mongoose Model mock
      const ModelMock = testgoose.model.mock();
      ModelMock
        .find.withArgs({ occupation: /host/ })
        .where.withArgs('name.last')
        .equals.withArgs('Ghost')
        .where.withArgs('age')
        .gt.withArgs(17)
        .lt.withArgs(66)
        .where.withArgs('likes')
        .in.withArgs(['vaporizing', 'talking'])
        .limit.withArgs(10)
        .sort.withArgs('-occupation')
        .select.withArgs('name occupation')
        .returns(null, dataStub);

      // Use the mock like a real model
      return ModelMock
        .find({ occupation: /host/ })
        .where('name.last')
        .equals('Ghost')
        .where('age')
        .gt(17)
        .lt(66)
        .where('likes')
        .in(['vaporizing', 'talking'])
        .limit(10)
        .sort('-occupation')
        .select('name occupation')
        .then(doc => {
          expect(doc).to.deep.equal(dataStub);
        })
        .catch(() => {
          expect.fail();
        });
    });

    it('mocks the promise data with multiple long query chain definitions', () => {
      // Setup our stubs
      const dataStub = { name: 'fred' };

      // Create a Mongoose Model mock
      const ModelMock = testgoose.model.mock();

      // Setup our chain definitions

      ModelMock
        .find.withArgs({ occupation: /host/ })
        .where.withArgs('name.last')
        .equals.withArgs('Ghost')
        .where.withArgs('age')
        .gt.withArgs(17)
        .lt.withArgs(66)
        .where.withArgs('likes')
        .in.withArgs(['vaporizing', 'talking'])
        .limit.withArgs(10)
        .sort.withArgs('-occupation')
        .select.withArgs('name sandwich')
        .returns(null, 'moose');

      ModelMock
        .find.withArgs({ occupation: /host/ })
        .where.withArgs('name.last')
        .equals.withArgs('Ghost')
        .where.withArgs('age')
        .gt.withArgs(17)
        .lt.withArgs(66)
        .where.withArgs('likes')
        .in.withArgs(['vaporizing', 'talking'])
        .limit.withArgs(10)
        .sort.withArgs('-occupation')
        .select.withArgs('name occupation')
        .returns(null, dataStub);

      ModelMock
        .find.withArgs({ occupation: /host/ })
        .where.withArgs('name.last')
        .equals.withArgs('Ghost')
        .where.withArgs('age')
        .gt.withArgs(17)
        .lt.withArgs(66)
        .where.withArgs('likes')
        .in.withArgs(['vaporizing', 'talking'])
        .limit.withArgs(10)
        .sort.withArgs('-occupation')
        .select.withArgs('name sandwich')
        .returns(null, 'caravan');

      // Use the mock like a real model
      return ModelMock
        .find({ occupation: /host/ })
        .where('name.last')
        .equals('Ghost')
        .where('age')
        .gt(17)
        .lt(66)
        .where('likes')
        .in(['vaporizing', 'talking'])
        .limit(10)
        .sort('-occupation')
        .select('name occupation')
        .then(doc => {
          expect(doc).to.deep.equal(dataStub);
        })
        .catch(() => {
          expect.fail();
        });
    });
  });

  describe('model.stub()', () => {
    it('stubs the model with multiple stub setups', (done) => {
      // Setup our stubs
      const errStub = 'something went wrong';

      // Create the Mongoose Model stubs

      const ModelStub = testgoose.model.stub();
      ModelStub.find.returns(errStub, null);

      const SecondaryModelStub = testgoose.model.stub();
      SecondaryModelStub.find.returns(null, null);

      // Use the stub like a real model
      ModelStub
        .find({ occupation: /host/ })
        .where('name.last')
        .equals('Ghost')
        .where('age')
        .gt(17)
        .lt(66)
        .where('likes')
        .in(['vaporizing', 'talking'])
        .limit(10)
        .sort('-occupation')
        .select('name occupation')
        .exec((err, data) => {
          expect(err).to.equal(errStub);
          expect(data).to.be.null;
          done();
        });
    });

    it('stubs the callback err with a long query chain', (done) => {
      // Setup our stubs
      const errStub = 'something went wrong';

      // Create a Mongoose Model stub
      const ModelStub = testgoose.model.stub();
      ModelStub.find.returns(errStub, null);

      // Use the stub like a real model
      ModelStub
        .find({ occupation: /host/ })
        .where('name.last')
        .equals('Ghost')
        .where('age')
        .gt(17)
        .lt(66)
        .where('likes')
        .in(['vaporizing', 'talking'])
        .limit(10)
        .sort('-occupation')
        .select('name occupation')
        .exec((err, data) => {
          expect(err).to.equal(errStub);
          expect(data).to.be.null;
          done();
        });
    });

    it('stubs the callback data with a long query chain', (done) => {
      // Setup our stubs
      const dataStub = { name: 'fred' };

      // Create a Mongoose Model stub
      const ModelStub = testgoose.model.stub();
      ModelStub.find.returns(null, dataStub);

      // Use the stub like a real model
      ModelStub
        .find({ occupation: /host/ })
        .where('name.last')
        .equals('Ghost')
        .where('age')
        .gt(17)
        .lt(66)
        .where('likes')
        .in(['vaporizing', 'talking'])
        .limit(10)
        .sort('-occupation')
        .select('name occupation')
        .exec((err, data) => {
          expect(err).to.be.null;
          expect(data).to.equal(dataStub);
          done();
        });
    });

    it('stubs the promise err with a long query chain', () => {
      // Setup our stubs
      const errStub = 'something went wrong';

      // Create a Mongoose Model stub
      const ModelStub = testgoose.model.stub();
      ModelStub.find.returns(errStub, null);

      // Use the stub like a real model
      return ModelStub
        .find({ occupation: /host/ })
        .where('name.last')
        .equals('Ghost')
        .where('age')
        .gt(17)
        .lt(66)
        .where('likes')
        .in(['vaporizing', 'talking'])
        .limit(10)
        .sort('-occupation')
        .select('name occupation')
        .then(() => {
          expect.fail();
        })
        .catch(err => {
          expect(err).to.deep.equal(errStub);
        });
    });

    it('stubs the promise data with a long query chain', () => {
      // Setup our stubs
      const dataStub = { name: 'fred' };

      // Create a Mongoose Model mock
      const ModelStub = testgoose.model.stub();
      ModelStub.find.returns(null, dataStub);

      // Use the stub like a real model
      return ModelStub
        .find({ occupation: /host/ })
        .where('name.last')
        .equals('Ghost')
        .where('age')
        .gt(17)
        .lt(66)
        .where('likes')
        .in(['vaporizing', 'talking'])
        .limit(10)
        .sort('-occupation')
        .select('name occupation')
        .then(doc => {
          expect(doc).to.deep.equal(dataStub);
        })
        .catch(() => {
          expect.fail();
        });
    });
  });
});

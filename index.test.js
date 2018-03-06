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
        .static.find.withArgs({ occupation: /host/ })
        .proto.where.withArgs('name.last')
        .proto.equals.withArgs('Ghost')
        .proto.where.withArgs('age')
        .proto.gt.withArgs(17)
        .proto.lt.withArgs(66)
        .proto.where.withArgs('likes')
        .proto.in.withArgs(['vaporizing', 'talking'])
        .proto.limit.withArgs(10)
        .proto.sort.withArgs('-occupation')
        .proto.select.withArgs('name occupation')
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

        done(new Error('should have thrown an error'));
      }
      catch(err) {
        const expectedErrorMessage = 'invoked query with incorrect chain: ' +
          '[' +
            '{"name":"find","args":[{"occupation":{}}]},' +
            '{"name":"where","args":["name.last"]},' +
            '{"name":"equals","args":["Ghost"]},' +
            '{"name":"where","args":["age"]},' +
            '{"name":"gt","args":[17]},' +
            '{"name":"lt","args":[66]},' +
            '{"name":"where","args":["likes"]},' +
            '{"name":"in","args":[["vaporizing","talking"]]},' +
            '{"name":"limit","args":[10]},' +
            '{"name":"sort","args":["-occupation"]},' +
            '{"name":"select","args":["SOMETHING ELSE"]}' +
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
        .static.find.withArgs({ occupation: /host/ })
        .proto.where.withArgs('name.last')
        .proto.equals.withArgs('Ghost')
        .proto.where.withArgs('age')
        .proto.gt.withArgs(17)
        .proto.lt.withArgs(66)
        .proto.where.withArgs('likes')
        .proto.in.withArgs(['vaporizing', 'talking'])
        .proto.limit.withArgs(10)
        .proto.sort.withArgs('-occupation')
        .proto.select.withArgs('name occupation')
        .returns(errStub, null);

      const SecondaryModelMock = testgoose.model.mock();
      SecondaryModelMock
        .static.find.withArgs('fish')
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
        .static.find.withArgs({ occupation: /host/ })
        .proto.where.withArgs('name.last')
        .proto.equals.withArgs('Ghost')
        .proto.where.withArgs('age')
        .proto.gt.withArgs(17)
        .proto.lt.withArgs(66)
        .proto.where.withArgs('likes')
        .proto.in.withArgs(['vaporizing', 'talking'])
        .proto.limit.withArgs(10)
        .proto.sort.withArgs('-occupation')
        .proto.select.withArgs('name occupation')
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
        .static.find.withArgs({ occupation: /host/ })
        .proto.where.withArgs('name.last')
        .proto.equals.withArgs('Ghost')
        .proto.where.withArgs('age')
        .proto.gt.withArgs(17)
        .proto.lt.withArgs(66)
        .proto.where.withArgs('likes')
        .proto.in.withArgs(['vaporizing', 'talking'])
        .proto.limit.withArgs(10)
        .proto.sort.withArgs('-occupation')
        .proto.select.withArgs('name sandwich')
        .returns('moose', null);

      ModelMock
        .static.find.withArgs({ occupation: /host/ })
        .proto.where.withArgs('name.last')
        .proto.equals.withArgs('Ghost')
        .proto.where.withArgs('age')
        .proto.gt.withArgs(17)
        .proto.lt.withArgs(66)
        .proto.where.withArgs('likes')
        .proto.in.withArgs(['vaporizing', 'talking'])
        .proto.limit.withArgs(10)
        .proto.sort.withArgs('-occupation')
        .proto.select.withArgs('name occupation')
        .returns(errStub, null);

      ModelMock
        .static.find.withArgs({ occupation: /host/ })
        .proto.where.withArgs('name.last')
        .proto.equals.withArgs('Ghost')
        .proto.where.withArgs('age')
        .proto.gt.withArgs(17)
        .proto.lt.withArgs(66)
        .proto.where.withArgs('likes')
        .proto.in.withArgs(['vaporizing', 'talking'])
        .proto.limit.withArgs(10)
        .proto.sort.withArgs('-occupation')
        .proto.select.withArgs('hero')
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
        .static.find.withArgs({ occupation: /host/ })
        .proto.where.withArgs('name.last')
        .proto.equals.withArgs('Ghost')
        .proto.where.withArgs('age')
        .proto.gt.withArgs(17)
        .proto.lt.withArgs(66)
        .proto.where.withArgs('likes')
        .proto.in.withArgs(['vaporizing', 'talking'])
        .proto.limit.withArgs(10)
        .proto.sort.withArgs('-occupation')
        .proto.select.withArgs('name occupation')
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
        .static.find.withArgs({ occupation: /host/ })
        .proto.where.withArgs('name.last')
        .proto.equals.withArgs('Ghost')
        .proto.where.withArgs('age')
        .proto.gt.withArgs(17)
        .proto.lt.withArgs(66)
        .proto.where.withArgs('likes')
        .proto.in.withArgs(['vaporizing', 'talking'])
        .proto.limit.withArgs(10)
        .proto.sort.withArgs('-occupation')
        .proto.select.withArgs('name sandwich')
        .returns(null, 'moose');

      ModelMock
        .static.find.withArgs({ occupation: /host/ })
        .proto.where.withArgs('name.last')
        .proto.equals.withArgs('Ghost')
        .proto.where.withArgs('age')
        .proto.gt.withArgs(17)
        .proto.lt.withArgs(66)
        .proto.where.withArgs('likes')
        .proto.in.withArgs(['vaporizing', 'talking'])
        .proto.limit.withArgs(10)
        .proto.sort.withArgs('-occupation')
        .proto.select.withArgs('name occupation')
        .returns(null, dataStub);

      ModelMock
        .static.find.withArgs({ occupation: /host/ })
        .proto.where.withArgs('name.last')
        .proto.equals.withArgs('Ghost')
        .proto.where.withArgs('age')
        .proto.gt.withArgs(17)
        .proto.lt.withArgs(66)
        .proto.where.withArgs('likes')
        .proto.in.withArgs(['vaporizing', 'talking'])
        .proto.limit.withArgs(10)
        .proto.sort.withArgs('-occupation')
        .proto.select.withArgs('name sandwich')
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
        .static.find.withArgs({ occupation: /host/ })
        .proto.where.withArgs('name.last')
        .proto.equals.withArgs('Ghost')
        .proto.where.withArgs('age')
        .proto.gt.withArgs(17)
        .proto.lt.withArgs(66)
        .proto.where.withArgs('likes')
        .proto.in.withArgs(['vaporizing', 'talking'])
        .proto.limit.withArgs(10)
        .proto.sort.withArgs('-occupation')
        .proto.select.withArgs('name occupation')
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
        .static.find.withArgs({ occupation: /host/ })
        .proto.where.withArgs('name.last')
        .proto.equals.withArgs('Ghost')
        .proto.where.withArgs('age')
        .proto.gt.withArgs(17)
        .proto.lt.withArgs(66)
        .proto.where.withArgs('likes')
        .proto.in.withArgs(['vaporizing', 'talking'])
        .proto.limit.withArgs(10)
        .proto.sort.withArgs('-occupation')
        .proto.select.withArgs('name sandwich')
        .returns('moose', null);

      ModelMock
        .static.find.withArgs({ occupation: /host/ })
        .proto.where.withArgs('name.last')
        .proto.equals.withArgs('Ghost')
        .proto.where.withArgs('age')
        .proto.gt.withArgs(17)
        .proto.lt.withArgs(66)
        .proto.where.withArgs('likes')
        .proto.in.withArgs(['vaporizing', 'talking'])
        .proto.limit.withArgs(10)
        .proto.sort.withArgs('-occupation')
        .proto.select.withArgs('name occupation')
        .returns(errStub, null);

      ModelMock
        .static.find.withArgs({ occupation: /host/ })
        .proto.where.withArgs('name.last')
        .proto.equals.withArgs('Ghost')
        .proto.where.withArgs('age')
        .proto.gt.withArgs(17)
        .proto.lt.withArgs(66)
        .proto.where.withArgs('likes')
        .proto.in.withArgs(['vaporizing', 'talking'])
        .proto.limit.withArgs(10)
        .proto.sort.withArgs('-occupation')
        .proto.select.withArgs('hero')
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
        .static.find.withArgs({ occupation: /host/ })
        .proto.where.withArgs('name.last')
        .proto.equals.withArgs('Ghost')
        .proto.where.withArgs('age')
        .proto.gt.withArgs(17)
        .proto.lt.withArgs(66)
        .proto.where.withArgs('likes')
        .proto.in.withArgs(['vaporizing', 'talking'])
        .proto.limit.withArgs(10)
        .proto.sort.withArgs('-occupation')
        .proto.select.withArgs('name occupation')
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
        .static.find.withArgs({ occupation: /host/ })
        .proto.where.withArgs('name.last')
        .proto.equals.withArgs('Ghost')
        .proto.where.withArgs('age')
        .proto.gt.withArgs(17)
        .proto.lt.withArgs(66)
        .proto.where.withArgs('likes')
        .proto.in.withArgs(['vaporizing', 'talking'])
        .proto.limit.withArgs(10)
        .proto.sort.withArgs('-occupation')
        .proto.select.withArgs('name sandwich')
        .returns(null, 'moose');

      ModelMock
        .static.find.withArgs({ occupation: /host/ })
        .proto.where.withArgs('name.last')
        .proto.equals.withArgs('Ghost')
        .proto.where.withArgs('age')
        .proto.gt.withArgs(17)
        .proto.lt.withArgs(66)
        .proto.where.withArgs('likes')
        .proto.in.withArgs(['vaporizing', 'talking'])
        .proto.limit.withArgs(10)
        .proto.sort.withArgs('-occupation')
        .proto.select.withArgs('name occupation')
        .returns(null, dataStub);

      ModelMock
        .static.find.withArgs({ occupation: /host/ })
        .proto.where.withArgs('name.last')
        .proto.equals.withArgs('Ghost')
        .proto.where.withArgs('age')
        .proto.gt.withArgs(17)
        .proto.lt.withArgs(66)
        .proto.where.withArgs('likes')
        .proto.in.withArgs(['vaporizing', 'talking'])
        .proto.limit.withArgs(10)
        .proto.sort.withArgs('-occupation')
        .proto.select.withArgs('name sandwich')
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
      ModelStub.static.find.returns(errStub, null);

      const SecondaryModelStub = testgoose.model.stub();
      SecondaryModelStub.static.find.returns(null, null);

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
      ModelStub.static.find.returns(errStub, null);

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
      ModelStub.static.find.returns(null, dataStub);

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
      ModelStub.static.find.returns(errStub, null);

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
      ModelStub.static.find.returns(null, dataStub);

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

  describe('query.mock()', () => {
    it('returns a new query', (done) => {
      const FirstQueryMock = testgoose.query.mock();
      const SecondQueryMock = testgoose.query.mock();

      FirstQueryMock.proto.find.withArgs('piña colada');
      SecondQueryMock.proto.find.withArgs('margarita');

      expect(FirstQueryMock.proto).to.not.equal(SecondQueryMock.proto);
      done();
    });

    it('mocks the query with multiple mock setups', () => {
      // Setup our stubs
      const dataStub = { name: 'fred' };

      // Create a Mongoose Query mock
      const QueryMock = testgoose.query.mock();
      QueryMock
        .proto.find.withArgs({ occupation: /host/ })
        .proto.where.withArgs('name.last')
        .proto.equals.withArgs('Ghost')
        .proto.where.withArgs('age')
        .proto.gt.withArgs(17)
        .proto.lt.withArgs(66)
        .proto.where.withArgs('likes')
        .proto.in.withArgs(['vaporizing', 'talking'])
        .proto.limit.withArgs(10)
        .proto.sort.withArgs('-occupation')
        .proto.select.withArgs('name occupation')
        .returns(null, dataStub);

      QueryMock
        .proto.find.withArgs({ occupation: /host/ })
        .proto.where.withArgs('name.last')
        .proto.equals.withArgs('Ghost')
        .proto.where.withArgs('age')
        .proto.gt.withArgs(17)
        .proto.lt.withArgs(66)
        .proto.where.withArgs('likes')
        .proto.in.withArgs(['vaporizing', 'talking'])
        .proto.limit.withArgs(10)
        .proto.sort.withArgs('-occupation')
        .proto.select.withArgs('saddle')
        .returns(null, null);

      // Use the mock like a real query
      const queryMock = new QueryMock();
      return queryMock
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

    it('mocks the callback err with a single long chain definition', (done) => {
      // Setup our stubs
      const errStub = 'something went wrong';

      // Create a Mongoose Query mock
      const QueryMock = testgoose.query.mock();
      QueryMock
        .proto.find.withArgs({ occupation: /host/ })
        .proto.where.withArgs('name.last')
        .proto.equals.withArgs('Ghost')
        .proto.where.withArgs('age')
        .proto.gt.withArgs(17)
        .proto.lt.withArgs(66)
        .proto.where.withArgs('likes')
        .proto.in.withArgs(['vaporizing', 'talking'])
        .proto.limit.withArgs(10)
        .proto.sort.withArgs('-occupation')
        .proto.select.withArgs('name occupation')
        .returns(errStub, null);

      // Use the mock like a real query
      const queryMock = new QueryMock();
      queryMock
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

      // Create a Mongoose Query mock
      const QueryMock = testgoose.query.mock();

      // Setup our chain definitions

      QueryMock
        .proto.find.withArgs({ occupation: /host/ })
        .proto.where.withArgs('name.last')
        .proto.equals.withArgs('Ghost')
        .proto.where.withArgs('age')
        .proto.gt.withArgs(17)
        .proto.lt.withArgs(66)
        .proto.where.withArgs('likes')
        .proto.in.withArgs(['vaporizing', 'talking'])
        .proto.limit.withArgs(10)
        .proto.sort.withArgs('-occupation')
        .proto.select.withArgs('name sandwich')
        .returns('moose', null);

      QueryMock
        .proto.find.withArgs({ occupation: /host/ })
        .proto.where.withArgs('name.last')
        .proto.equals.withArgs('Ghost')
        .proto.where.withArgs('age')
        .proto.gt.withArgs(17)
        .proto.lt.withArgs(66)
        .proto.where.withArgs('likes')
        .proto.in.withArgs(['vaporizing', 'talking'])
        .proto.limit.withArgs(10)
        .proto.sort.withArgs('-occupation')
        .proto.select.withArgs('name occupation')
        .returns(errStub, null);

      QueryMock
        .proto.find.withArgs({ occupation: /host/ })
        .proto.where.withArgs('name.last')
        .proto.equals.withArgs('Ghost')
        .proto.where.withArgs('age')
        .proto.gt.withArgs(17)
        .proto.lt.withArgs(66)
        .proto.where.withArgs('likes')
        .proto.in.withArgs(['vaporizing', 'talking'])
        .proto.limit.withArgs(10)
        .proto.sort.withArgs('-occupation')
        .proto.select.withArgs('hero')
        .returns('caravan');

      // Use the mock like a real query
      const queryMock = new QueryMock();
      queryMock
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

      // Create a Mongoose Query mock
      const QueryMock = testgoose.query.mock();
      QueryMock
        .proto.find.withArgs({ occupation: /host/ })
        .proto.where.withArgs('name.last')
        .proto.equals.withArgs('Ghost')
        .proto.where.withArgs('age')
        .proto.gt.withArgs(17)
        .proto.lt.withArgs(66)
        .proto.where.withArgs('likes')
        .proto.in.withArgs(['vaporizing', 'talking'])
        .proto.limit.withArgs(10)
        .proto.sort.withArgs('-occupation')
        .proto.select.withArgs('name occupation')
        .returns(null, dataStub);

      // Use the mock like a real query
      const queryMock = new QueryMock();
      queryMock
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

      // Create a Mongoose Query mock
      const QueryMock = testgoose.query.mock();

      // Setup our chain definitions

      QueryMock
        .proto.find.withArgs({ occupation: /host/ })
        .proto.where.withArgs('name.last')
        .proto.equals.withArgs('Ghost')
        .proto.where.withArgs('age')
        .proto.gt.withArgs(17)
        .proto.lt.withArgs(66)
        .proto.where.withArgs('likes')
        .proto.in.withArgs(['vaporizing', 'talking'])
        .proto.limit.withArgs(10)
        .proto.sort.withArgs('-occupation')
        .proto.select.withArgs('name sandwich')
        .returns(null, 'moose');

      QueryMock
        .proto.find.withArgs({ occupation: /host/ })
        .proto.where.withArgs('name.last')
        .proto.equals.withArgs('Ghost')
        .proto.where.withArgs('age')
        .proto.gt.withArgs(17)
        .proto.lt.withArgs(66)
        .proto.where.withArgs('likes')
        .proto.in.withArgs(['vaporizing', 'talking'])
        .proto.limit.withArgs(10)
        .proto.sort.withArgs('-occupation')
        .proto.select.withArgs('name occupation')
        .returns(null, dataStub);

      QueryMock
        .proto.find.withArgs({ occupation: /host/ })
        .proto.where.withArgs('name.last')
        .proto.equals.withArgs('Ghost')
        .proto.where.withArgs('age')
        .proto.gt.withArgs(17)
        .proto.lt.withArgs(66)
        .proto.where.withArgs('likes')
        .proto.in.withArgs(['vaporizing', 'talking'])
        .proto.limit.withArgs(10)
        .proto.sort.withArgs('-occupation')
        .proto.select.withArgs('name sandwich')
        .returns(null, 'caravan');

      // Use the mock like a real query
      const queryMock = new QueryMock();
      queryMock
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

      // Create a Mongoose Query mock
      const QueryMock = testgoose.query.mock();
      QueryMock
        .proto.find.withArgs({ occupation: /host/ })
        .proto.where.withArgs('name.last')
        .proto.equals.withArgs('Ghost')
        .proto.where.withArgs('age')
        .proto.gt.withArgs(17)
        .proto.lt.withArgs(66)
        .proto.where.withArgs('likes')
        .proto.in.withArgs(['vaporizing', 'talking'])
        .proto.limit.withArgs(10)
        .proto.sort.withArgs('-occupation')
        .proto.select.withArgs('name occupation')
        .returns(errStub, null);

      // Use the mock like a real query
      const queryMock = new QueryMock();
      return queryMock
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

      // Create a Mongoose Query mock
      const QueryMock = testgoose.query.mock();

      // Setup our chain definitions

      QueryMock
        .proto.find.withArgs({ occupation: /host/ })
        .proto.where.withArgs('name.last')
        .proto.equals.withArgs('Ghost')
        .proto.where.withArgs('age')
        .proto.gt.withArgs(17)
        .proto.lt.withArgs(66)
        .proto.where.withArgs('likes')
        .proto.in.withArgs(['vaporizing', 'talking'])
        .proto.limit.withArgs(10)
        .proto.sort.withArgs('-occupation')
        .proto.select.withArgs('name sandwich')
        .returns('moose', null);

      QueryMock
        .proto.find.withArgs({ occupation: /host/ })
        .proto.where.withArgs('name.last')
        .proto.equals.withArgs('Ghost')
        .proto.where.withArgs('age')
        .proto.gt.withArgs(17)
        .proto.lt.withArgs(66)
        .proto.where.withArgs('likes')
        .proto.in.withArgs(['vaporizing', 'talking'])
        .proto.limit.withArgs(10)
        .proto.sort.withArgs('-occupation')
        .proto.select.withArgs('name occupation')
        .returns(errStub, null);

      QueryMock
        .proto.find.withArgs({ occupation: /host/ })
        .proto.where.withArgs('name.last')
        .proto.equals.withArgs('Ghost')
        .proto.where.withArgs('age')
        .proto.gt.withArgs(17)
        .proto.lt.withArgs(66)
        .proto.where.withArgs('likes')
        .proto.in.withArgs(['vaporizing', 'talking'])
        .proto.limit.withArgs(10)
        .proto.sort.withArgs('-occupation')
        .proto.select.withArgs('hero')
        .returns('caravan');

      // Use the mock like a real query
      const queryMock = new QueryMock();
      return queryMock
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

      // Create a Mongoose Query mock
      const QueryMock = testgoose.query.mock();
      QueryMock
        .proto.find.withArgs({ occupation: /host/ })
        .proto.where.withArgs('name.last')
        .proto.equals.withArgs('Ghost')
        .proto.where.withArgs('age')
        .proto.gt.withArgs(17)
        .proto.lt.withArgs(66)
        .proto.where.withArgs('likes')
        .proto.in.withArgs(['vaporizing', 'talking'])
        .proto.limit.withArgs(10)
        .proto.sort.withArgs('-occupation')
        .proto.select.withArgs('name occupation')
        .returns(null, dataStub);

      // Use the mock like a real query
      const queryMock = new QueryMock();
      return queryMock
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

      // Create a Mongoose Query mock
      const QueryMock = testgoose.query.mock();

      // Setup our chain definitions

      QueryMock
        .proto.find.withArgs({ occupation: /host/ })
        .proto.where.withArgs('name.last')
        .proto.equals.withArgs('Ghost')
        .proto.where.withArgs('age')
        .proto.gt.withArgs(17)
        .proto.lt.withArgs(66)
        .proto.where.withArgs('likes')
        .proto.in.withArgs(['vaporizing', 'talking'])
        .proto.limit.withArgs(10)
        .proto.sort.withArgs('-occupation')
        .proto.select.withArgs('name sandwich')
        .returns(null, 'moose');

      QueryMock
        .proto.find.withArgs({ occupation: /host/ })
        .proto.where.withArgs('name.last')
        .proto.equals.withArgs('Ghost')
        .proto.where.withArgs('age')
        .proto.gt.withArgs(17)
        .proto.lt.withArgs(66)
        .proto.where.withArgs('likes')
        .proto.in.withArgs(['vaporizing', 'talking'])
        .proto.limit.withArgs(10)
        .proto.sort.withArgs('-occupation')
        .proto.select.withArgs('name occupation')
        .returns(null, dataStub);

      QueryMock
        .proto.find.withArgs({ occupation: /host/ })
        .proto.where.withArgs('name.last')
        .proto.equals.withArgs('Ghost')
        .proto.where.withArgs('age')
        .proto.gt.withArgs(17)
        .proto.lt.withArgs(66)
        .proto.where.withArgs('likes')
        .proto.in.withArgs(['vaporizing', 'talking'])
        .proto.limit.withArgs(10)
        .proto.sort.withArgs('-occupation')
        .proto.select.withArgs('name sandwich')
        .returns(null, 'caravan');

      // Use the mock like a real query
      const queryMock = new QueryMock();
      return queryMock
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

  describe('query.stub()', () => {
    it('stubs the callback err with a long query chain', (done) => {
      // Setup our stubs
      const errStub = 'something went wrong';

      // Create a Mongoose Query stub
      const QueryStub = testgoose.query.stub();
      QueryStub.proto.returns(errStub, null);

      // Use the stub like a real query
      const queryStub = new QueryStub();
      queryStub
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

      // Create a Mongoose Query stub
      const QueryStub = testgoose.query.stub();
      QueryStub.proto.returns(null, dataStub);

      // Use the stub like a real query
      const queryStub = new QueryStub();
      queryStub
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

      // Create a Mongoose Query stub
      const QueryStub = testgoose.query.stub();
      QueryStub.proto.returns(errStub, null);

      // Use the stub like a real query
      const queryStub = new QueryStub();
      return queryStub
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

      // Create a Mongoose Query stub
      const QueryStub = testgoose.query.stub();
      QueryStub.proto.returns(null, dataStub);

      // Use the stub like a real query
      const queryStub = new QueryStub();
      return queryStub
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

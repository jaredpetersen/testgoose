'use strict';

const chai = require('chai');
chai.use(require('sinon-chai'));
const expect = chai.expect;
const reqres = require('reqres');
const proxyquire = require('proxyquire').noCallThru();
const modelmock = require('../../../index');

describe('examples - express.js rest api', () => {
  describe('task controller', () => {
    describe('getAll()', () => {
      it('returns all tasks from the database', (done) => {
        // Setup our stubs
        const req = reqres.req();
        const res = reqres.res();
        const databaseData = [ { name: 'Fix the gutters' }, { name: 'Paint the fence' } ];

        // Mock out the Mongoose Task model
        const TaskStub = modelmock.model.stub();
        TaskStub.static.find.returns(null, databaseData);

        // Replace the reference to the original Task model with our stub model
        const task = proxyquire('../controllers/task', { '../models/task': TaskStub } );

        // Make sure that the task controller calls res with the data from the database
        res.on('end', () => {
          expect(res.json).to.have.been.calledWithExactly(databaseData);
          done();
        });

        // Run the function under test
        task.getAll(req, res, (next) => {
          // If next exists, an error occurred
          expect(next).to.not.exist();
        });
      });

      it('returns an error when the database encounters an error', (done) => {
        // Setup our stubs
        const req = reqres.req();
        const res = reqres.res();
        const databaseError = new Error('something bad happened');

        // Mock out the Mongoose Task model
        const TaskStub = modelmock.model.stub();
        TaskStub.static.find.returns(databaseError);

        // Replace the reference to the original Task model with our stub model
        const task = proxyquire('../controllers/task', { '../models/task': TaskStub } );

        // Run the function under test
        task.getAll(req, res, (next) => {
          // Make sure that the task controller passes the error along via next
          expect(next).to.equal(databaseError);
          done();
        });
      });
    });

    describe('getSingle()', () => {
      it('returns a single task from the database', (done) => {
        // Setup our stubs
        const req = reqres.req({ params: { id: 1234 } });
        const res = reqres.res();
        const databaseData = { name: 'Mow the lawn' };

        // Mock out the Mongoose Task model
        const TaskMock = modelmock.model.mock();
        TaskMock.static.findById.withArgs(req.params.id, '__v').returns(null, databaseData);

        // Replace the reference to the original Task model with our mock model
        const task = proxyquire('../controllers/task', { '../models/task': TaskMock } );

        // Make sure that the task controller calls res with the data from the database
        res.on('end', () => {
          expect(res.json).to.have.been.calledWithExactly(databaseData);
          done();
        });

        // Run the function under test
        task.getSingle(req, res, (next) => {
          // If next exists, an error occurred
          expect(next).to.not.exist();
          done();
        });
      });

      it('returns an error when the task does not exist in the database', (done) => {
        // Setup our stubs
        const req = reqres.req();
        const res = reqres.res();
        const databaseData = null;

        // Mock out the Mongoose Task model
        const TaskStub = modelmock.model.stub();
        TaskStub.static.findById.returns(null, databaseData);

        // Replace the reference to the original Task model with our stub model
        const task = proxyquire('../controllers/task', { '../models/task': TaskStub } );

        // Run the function under test
        task.getSingle(req, res, (next) => {
          // Make sure that the task controller passes the error along via next
          expect(next.message).to.equal('specified task does not exist');
          done();
        });
      });

      it('returns an error when the database encounters an error', (done) => {
        // Setup our stubs
        const req = reqres.req();
        const res = reqres.res();
        const databaseError = new Error('something bad happened');

        // Mock out the Mongoose Task model
        const TaskStub = modelmock.model.stub();
        TaskStub.static.findById.returns(databaseError);

        // Replace the reference to the original Task model with our stub model
        const task = proxyquire('../controllers/task', { '../models/task': TaskStub } );

        // Run the function under test
        task.getSingle(req, res, (next) => {
          // Make sure that task controller passes the error along via next
          expect(next).to.equal(databaseError);
          done();
        });
      });
    });

    describe('create()', (done) => {
      it('creates a new release in the database', (done) => {
        // Setup our stubs
        const req = reqres.req();
        req.body = { name: 'Fix gutters' };
        const res = reqres.res();

        // Mock out the Mongoose Task model
        const TaskStub = modelmock.model.stub();
        TaskStub.proto.save.returns();

        // Replace the reference to the original Task model with our stub model
        const task = proxyquire('../controllers/task', { '../models/task': TaskStub } );

        // Make sure that the task controller calls res with the data from the database
        res.on('end', () => {
          expect(res.json).to.have.been.calledWithExactly({ name: 'Fix gutters', description: null });
          done();
        });

        // Run the function under test
        task.create(req, res, (next) => {
          // If next exists, an error occurred
          expect(next).to.not.exist();
          done();
        });
      });

      it('returns an error when the database encounters an error', (done) => {
        // Setup our stubs
        const req = reqres.req();
        req.body = { name: 'Fix gutters' };
        const res = reqres.res();
        const databaseError = new Error('something bad happened');

        // Mock out the Mongoose Task model
        const TaskStub = modelmock.model.stub();
        TaskStub.proto.save.returns(databaseError, null);

        // Replace the reference to the original Task model with our stub model
        const task = proxyquire('../controllers/task', { '../models/task': TaskStub } );

        // Run the function under test
        task.create(req, res, (next) => {
          // Make sure that task controller passes the error along via next
          expect(next).to.equal(databaseError);
          done();
        });
      });
    });
  });
});

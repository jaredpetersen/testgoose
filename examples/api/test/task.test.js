'use strict';

const chai = require('chai');
chai.use(require('sinon-chai'));
const expect = chai.expect;
const reqres = require('reqres');
const proxyquire = require('proxyquire').noCallThru();
const modelmock = require('../../../index');

describe('Examples - Express.js REST API', () => {
  describe('Tasks', () => {
    describe('getAll', () => {
      it('returns all tasks from the database', (done) => {
        // Setup our stubs
        const req = reqres.req();
        const res = reqres.res();
        const databaseData = [ { name: 'Fix the gutters' }, { name: 'Paint the fence' } ];

        // Mock out the Mongoose Task model
        const TaskMock = modelmock.mock();
        TaskMock.find.returns(null, databaseData);

        // Replace the reference to the original Task model with our mock model
        const task = proxyquire('../controllers/task', { '../models/task': TaskMock } );

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
        const TaskMock = modelmock.mock();
        TaskMock.find.returns(databaseError);

        // Replace the reference to the original Task model with our mock model
        const task = proxyquire('../controllers/task', { '../models/task': TaskMock } );

        // Run the function under test
        task.getAll(req, res, (next) => {
          // Make sure that the task controller passes the error along via next
          expect(next).to.equal(databaseError);
          done();
        });
      });
    });

    describe('getSingle', () => {
      it('returns a single task from the database', (done) => {
        // Setup our stubs
        const req = reqres.req();
        const res = reqres.res();
        const databaseData = { id: 1234 };

        // Mock out the Mongoose Task model
        const TaskMock = modelmock.mock();
        TaskMock.findById.returns(null, databaseData);

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
        const TaskMock = modelmock.mock();
        TaskMock.findById.returns(null, databaseData);

        // Replace the reference to the original Task model with our mock model
        const task = proxyquire('../controllers/task', { '../models/task': TaskMock } );

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
        const TaskMock = modelmock.mock();
        TaskMock.findById.returns(databaseError);

        // Replace the reference to the original Task model with our mock model
        const task = proxyquire('../controllers/task', { '../models/task': TaskMock } );

        // Run the function under test
        task.getSingle(req, res, (next) => {
          // Make sure that task controller passes the error along via next
          expect(next).to.equal(databaseError);
          done();
        });
      });
    });

    describe('create', (done) => {
      it('creates a new release in the database', (done) => {
        // Setup our stubs
        const req = reqres.req();
        req.body = { name: 'Fix gutters' };
        const res = reqres.res();

        // Mock out the Mongoose Task model
        const TaskMock = modelmock.mock();
        TaskMock.prototype.save.returns();

        // Replace the reference to the original Task model with our mock model
        const task = proxyquire('../controllers/task', { '../models/task': TaskMock } );

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
        const TaskMock = modelmock.mock();
        TaskMock.prototype.save.returns(databaseError, null);

        // Replace the reference to the original Task model with our mock model
        const task = proxyquire('../controllers/task', { '../models/task': TaskMock } );

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

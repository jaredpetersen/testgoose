'use strict';

const chai = require('chai');
const expect = chai.expect;
const proxyquire = require('proxyquire').noCallThru();
const testgoose = require('../../../../index');

describe('examples - express.js rest api', () => {
  describe('task controller', () => {
    describe('getAll()', () => {
      it('returns all tasks from the database', (done) => {
        // Stub the data returned from the database
        const databaseData = [ { name: 'Fix the gutters' }, { name: 'Paint the fence' } ];

        // Stub the Express request
        const req = {};

        // Mock the Express response - make sure that res.json is called with the correct data
        const res = {
          json: (data) => {
            expect(data).to.equal(databaseData);
            done();
          }
        };

        // Stub the Mongoose Task model
        const TaskStub = testgoose.model.stub();
        TaskStub.static.find.returns(null, databaseData);

        // Replace the reference to the original Task model with our stub model
        const taskController = proxyquire('./tasks', { './model': TaskStub } );

        // Run the controller function under test
        taskController.getAll(req, res, (next) => {
          // If next exists, an error occurred
          expect(next).to.not.exist();
        });
      });

      it('returns an error when the database encounters an error', (done) => {
        // Stub the error returned from the database
        const databaseError = new Error('something bad happened');

        // Stub the Express request and response
        const req = {};
        const res = {};

        // Stub the Mongoose Task model
        const TaskStub = testgoose.model.stub();
        TaskStub.static.find.returns(databaseError);

        // Replace the reference to the original Task model with our stub model
        const taskController = proxyquire('./tasks', { './model': TaskStub } );

        // Run the function under test
        taskController.getAll(req, res, (next) => {
          // Make sure that the task controller passes the error along via next
          expect(next).to.equal(databaseError);
          done();
        });
      });
    });

    describe('getSingle()', () => {
      it('returns a single task from the database', (done) => {
        // Stub the data returned from the database
        const databaseData = { name: 'Mow the lawn' };

        // Stub the Express request
        const req = { params: { id: 1234 } };

        // Mock the Express response - make sure that res.json is called with the correct data
        const res = {
          json: (data) => {
            expect(data).to.equal(databaseData);
            done();
          }
        };

        // Mock the Mongoose Task model
        const TaskMock = testgoose.model.mock();
        TaskMock.static.findById.withArgs(req.params.id, '__v').returns(null, databaseData);

        // Replace the reference to the original Task model with our mock model
        const taskController = proxyquire('./tasks', { './model': TaskMock } );

        // Run the function under test
        taskController.getSingle(req, res, (next) => {
          // If next exists, an error occurred
          expect(next).to.not.exist();
          done();
        });
      });

      it('returns an error when the task does not exist in the database', (done) => {
        // Stub the data returned from the database
        const databaseData = null;

        // Stub the Express request and response
        const req = { params: { id: 1234 } };
        const res = {};

        // Stub the Mongoose Task model
        const TaskStub = testgoose.model.stub();
        TaskStub.static.findById.returns(null, databaseData);

        // Replace the reference to the original Task model with our stub model
        const taskController = proxyquire('./tasks', { './model': TaskStub } );

        // Run the function under test
        taskController.getSingle(req, res, (next) => {
          // Make sure that the task controller passes the error along via next
          expect(next.message).to.equal('specified task does not exist');
          done();
        });
      });

      it('returns an error when the database encounters an error', (done) => {
        // Stub the error returned from the database
        const databaseError = new Error('something bad happened');

        // Stub the Express request and response
        const req = { params: { id: 1234 } };
        const res = {};

        // Stub the Mongoose Task model
        const TaskStub = testgoose.model.stub();
        TaskStub.static.findById.returns(databaseError);

        // Replace the reference to the original Task model with our stub model
        const taskController = proxyquire('./tasks', { './model': TaskStub } );

        // Run the function under test
        taskController.getSingle(req, res, (next) => {
          // Make sure that task controller passes the error along via next
          expect(next).to.equal(databaseError);
          done();
        });
      });
    });

    describe('create()', (done) => {
      it('creates a new release in the database', (done) => {
        // Stub the Express request
        const req = { body: { name: 'Fix gutters' } };

        // Mock the Express response - make sure that res.json is called with the correct data
        const res = {
          status: (code) => {
            expect(code).to.equal(201);
            return res;
          },
          json: (data) => {
            expect(data).to.deep.equal({ name: req.body.name, description: null });
            done();
          }
        };

        // Stub the Mongoose Task model
        const TaskStub = testgoose.model.stub();
        TaskStub.proto.save.returns();

        // Replace the reference to the original Task model with our stub model
        const taskController = proxyquire('./tasks', { './model': TaskStub } );

        // Run the function under test
        taskController.create(req, res, (next) => {
          // If next exists, an error occurred
          expect(next).to.not.exist();
          done();
        });
      });

      it('returns an error when the database encounters an error', (done) => {
        // Stub the error returned from the database
        const databaseError = new Error('something bad happened');

        // Stub the Express request and response
        const req = { body: {} };
        const res = {};

        // Stub the Mongoose Task model
        const TaskStub = testgoose.model.stub();
        TaskStub.proto.save.returns(databaseError, null);

        // Replace the reference to the original Task model with our stub model
        const taskController = proxyquire('./tasks', { './model': TaskStub } );

        // Run the function under test
        taskController.create(req, res, (next) => {
          // Make sure that task controller passes the error along via next
          expect(next).to.equal(databaseError);
          done();
        });
      });
    });
  });
});

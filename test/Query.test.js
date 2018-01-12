'use strict';

const chai = require('chai');
const expect = chai.expect;
const Query = require('../lib/Query');

describe('Query', () => {
  describe('find', () => {
    it('returns itself when not given a callback', (done) => {
      const query = new Query();
      const queryChain = query.find();

      expect(queryChain).to.equal(query);
      done();
    });

    it('calls the provided callback', (done) => {
      const query = new Query();
      query.find(() => {
        done();
      });
    });
  });

  describe('findOne', () => {
    it('returns itself when not given a callback', (done) => {
      const query = new Query();
      const queryChain = query.findOne();

      expect(queryChain).to.equal(query);
      done();
    });

    it('calls the provided callback', (done) => {
      const query = new Query();
      query.findOne(() => {
        done();
      });
    });
  });

  describe('findOneAndUpdate', () => {
    it('returns itself when not given a callback', (done) => {
      const query = new Query();
      const queryChain = query.findOneAndUpdate();

      expect(queryChain).to.equal(query);
      done();
    });

    it('calls the provided callback', (done) => {
      const query = new Query();
      query.findOneAndUpdate(() => {
        done();
      });
    });
  });

  describe('findOneAndRemove', () => {
    it('returns itself when not given a callback', (done) => {
      const query = new Query();
      const queryChain = query.findOneAndRemove();

      expect(queryChain).to.equal(query);
      done();
    });

    it('calls the provided callback', (done) => {
      const query = new Query();
      query.findOneAndRemove(() => {
        done();
      });
    });
  });

  describe('then', () => {
    it('rejects a promise with error when called with error', () => {
      const queryError = new Error('something went wrong');
      const query = new Query(queryError, null);

      return query.find()
        .then(() => {
          expect.fail();
        })
        .catch(err => {
          expect(err).to.equal(queryError);
        });
    });

    it('resolves a promise with data when called with data', () => {
      const queryData = { name: 'A' };
      const query = new Query(null, queryData);

      return query.find()
        .then(data => {
          expect(data).to.equal(queryData);
        })
        .catch(() => {
          expect.fail();
        });
    });
  });

  describe('exec', () => {
    it('calls a callback with error when called with error', (done) => {
      const queryError = new Error('something went wrong');
      const query = new Query(queryError, null);

      query.exec((err, data) => {
        expect(err).to.equal(queryError);
        expect(data).to.be.null;
        done();
      });
    });

    it('calls a callback with data when called with data', (done) => {
      const queryData = { name: 'A' };
      const query = new Query(null, queryData);

      query.exec((err, data) => {
        expect(err).to.be.null;
        expect(data).to.equal(queryData);
        done();
      });
    });

    it('rejects a promise with error when called with error', () => {
      const queryError = new Error('something went wrong');
      const query = new Query(queryError, null);

      return query.exec()
        .then(() => {
          expect.fail();
        })
        .catch(err => {
          expect(err).to.equal(queryError);
        });
    });

    it('resolves a promise with data when called with data', () => {
      const queryData = { name: 'A' };
      const query = new Query(null, queryData);

      return query.exec()
        .then(data => {
          expect(data).to.equal(queryData);
        })
        .catch(() => {
          expect.fail();
        });
    });
  });
});

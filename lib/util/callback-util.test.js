'use strict';

const expect = require('chai').expect;
const callbackUtil = require('./callback-util');

describe('callback-util', () => {

  describe('getCallback()', () => {
    it('returns callback when the callback exists', (done) => {
      const args = [ 'a', 1, { name: 'cat' }, false, () => {} ];
      const callback = callbackUtil.getCallback(args);

      expect(callback).to.deep.equal(args[args.length - 1]);
      done();
    });

    it('returns null when the callback does not exist', (done) => {
      const args = [ 'a', 1, { name: 'cat' }, false ];
      const callback = callbackUtil.getCallback(args);

      expect(callback).to.be.null;
      done();
    });
  });

  describe('getArgumentsWithoutCallback()', () => {
    it('gets all of the arguments without the callback when the callback exists', (done) => {
      const args = [ 'a', 1, { name: 'cat' }, false, () => {} ];
      const argumentsWithoutCallback = callbackUtil.getArgumentsWithoutCallback(args);

      expect(argumentsWithoutCallback).to.deep.equal(args.slice(0, args.length - 1));
      done();
    });

    it('gets all of the arguments without the callback when the callback does not exist', (done) => {
      const args = [ 'a', 1, { name: 'cat' }, false ];
      const argumentsWithoutCallback = callbackUtil.getArgumentsWithoutCallback(args);

      expect(argumentsWithoutCallback).to.equal(args);
      done();
    });
  });

});

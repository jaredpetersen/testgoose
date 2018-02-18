'use strict';

const expect = require('chai').expect;
const callbackUtil = require('./callback-util');

describe('callback-util', () => {

  describe('getCallback()', () => {
    it('returns callback when the callback exists', (done) => {
      const parameters = [ 'a', 1, { name: 'cat' }, false, () => {} ];
      const callback = callbackUtil.getCallback(parameters);

      expect(callback).to.deep.equal(parameters[parameters.length - 1]);
      done();
    });

    it('returns null when the callback does not exist', (done) => {
      const parameters = [ 'a', 1, { name: 'cat' }, false ];
      const callback = callbackUtil.getCallback(parameters);

      expect(callback).to.be.null;
      done();
    });
  });

  describe('getArgumentsWithoutCallback()', () => {
    it('gets all of the parameters without the callback when the callback exists', (done) => {
      const parameters = [ 'a', 1, { name: 'cat' }, false, () => {} ];
      const parametersWithoutCallback = callbackUtil.getArgumentsWithoutCallback(parameters);

      expect(parametersWithoutCallback).to.deep.equal(parameters.slice(0, parameters.length - 1));
      done();
    });

    it('gets all of the parameters without the callback when the callback does not exist', (done) => {
      const parameters = [ 'a', 1, { name: 'cat' }, false ];
      const parametersWithoutCallback = callbackUtil.getArgumentsWithoutCallback(parameters);

      expect(parametersWithoutCallback).to.equal(parameters);
      done();
    });
  });

});

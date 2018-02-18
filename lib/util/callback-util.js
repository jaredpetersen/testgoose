'use strict';

module.exports.getCallback = (args) => {
  const lastParam = args[args.length - 1];
  return (typeof lastParam === 'function') ? lastParam : null;
};

module.exports.getArgumentsWithoutCallback = (args) => {
  return (typeof args[args.length - 1] === 'function') ?
    args.slice(0, -1) :
    args;
}

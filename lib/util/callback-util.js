'use strict';

module.exports.getCallback = (parameters) => {
  const lastParam = parameters[parameters.length - 1];
  return (typeof lastParam === 'function') ? lastParam : null;
};

module.exports.getParametersWithoutCallback = (parameters) => {
  return (typeof parameters[parameters.length - 1] === 'function') ?
    parameters.slice(0, -1) :
    parameters;
}

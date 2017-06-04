'use strict'

const ConfigBase = require('class-config-base')
const { replaceable } = ConfigBase

ConfigBase.method = fn => {
  if (typeof fn === 'function') {
    return {
      enumerable: true,
      configurable: true,
      writable: true,
      value: fn,
    }
  }

  return replaceable(fn)
}

module.exports = ConfigBase

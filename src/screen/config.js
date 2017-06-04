'use strict'

const ConfigBase = require('class-config-base')
const { readonly } = ConfigBase
const defaultNumber = require('default-number')
const defaultConfig = require('./default')

class ScreenConfig extends ConfigBase {

  constructor (initConfig) {
    super(initConfig, defaultConfig)
  }

  defineAccessors () {
    return {
      width:
        positiveNumber,

      height:
        positiveNumber,

      availTop:
        positiveNumber,

      availLeft:
        positiveNumber,

      availRight:
        positiveNumber,

      availBottom:
        positiveNumber,
    }
  }

  // https://www.w3.org/TR/cssom-view-1/#screen
  defineInterfaces () {
    return {
      width: cfg => readonly({
        get: () => cfg.width
      }),

      height: cfg => readonly({
        get: () => cfg.height
      }),

      availTop: cfg => readonly({
        get: () => cfg.availTop
      }),

      availLeft: cfg => readonly({
        get: () => cfg.availLeft
      }),

      availWidth: cfg => readonly({
        get: () => Math.max(0, cfg.width - cfg.availLeft - cfg.availRight)
      }),

      availHeight: cfg => readonly({
        get: () => Math.max(0, cfg.height - cfg.availTop - cfg.availBottom)
      }),

      colorDepth: () => readonly({
        get: () => 24
      }),

      pixelDepth: () => readonly({
        get: () => 24
      }),
    }
  }
}

function positiveNumber (p, key) {
  return {
    enumerable: true,
    get () { return p[key] },
    set (v) { p[key] = defaultNumber(v, p[key], 0) },
  }
}

module.exports = ScreenConfig

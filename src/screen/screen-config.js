'use strict'

const ConfigBase = require('class-config-base')
const defaultNumber = require('default-number')
const defaultConfig = require('./screen-default')


class ScreenConfig extends ConfigBase {

  constructor (initConfig) {
    super(initConfig, defaultConfig)
  }

  getAccessorDescriptors () {
    return {

      width: getNumberPropDesc,

      height: getNumberPropDesc,

      availTop: getNumberPropDesc,

      availLeft: getNumberPropDesc,

      availRight: getNumberPropDesc,

      availBottom: getNumberPropDesc,
    }
  }

  // https://www.w3.org/TR/cssom-view-1/#screen
  getInterfaceDescriptors () {
    const cfg = this
    return {

      width: getReadonlyPropDesc(() => cfg.width),

      height: getReadonlyPropDesc(() => cfg.height),

      availWidth: getReadonlyPropDesc(() =>
        Math.max(0, cfg.width - cfg.availLeft - cfg.availRight)),

      availHeight: getReadonlyPropDesc(() =>
        Math.max(0, cfg.height - cfg.availTop - cfg.availBottom)),

      availLeft: getReadonlyPropDesc(() => cfg.availLeft),

      availTop: getReadonlyPropDesc(() => cfg.availTop),

      colorDepth: getReadonlyPropDesc(() => 24),

      pixelDepth: getReadonlyPropDesc(() => 24),

      toString: {
        value: () => '[object Screen]',
      },
    }
  }
}

function getNumberPropDesc (parent, key) {
  return {
    enumerable: true,
    get () { return parent[key] },
    set (v) { parent[key] = defaultNumber(v, parent[key], 0) },
  }
}

function getReadonlyPropDesc (getter) {
  return {
    enumerable: true,
    set: noop,
    get: getter,
  }
}

function noop () {}

module.exports = ScreenConfig

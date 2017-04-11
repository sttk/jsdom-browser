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

      width: getNumberPropertyDescriptor,

      height: getNumberPropertyDescriptor,

      availTop: getNumberPropertyDescriptor,

      availLeft: getNumberPropertyDescriptor,

      availRight: getNumberPropertyDescriptor,

      availBottom: getNumberPropertyDescriptor,
    }
  }

  // https://www.w3.org/TR/cssom-view-1/#screen
  getInterfaceDescriptors () {
    const cfg = this
    return {

      width: {
        enumerable: true,
        set () {},
        get () { return cfg.width },
      },

      height: {
        enumerable: true,
        set () {},
        get () { return cfg.height },
      },

      availWidth: {
        enumerable: true,
        set () {},
        get () {
          return Math.max(0, cfg.width - cfg.availLeft - cfg.availRight)
        },
      },

      availHeight: {
        enumerable: true,
        set () {},
        get () {
          return Math.max(0, cfg.height - cfg.availTop - cfg.availBottom)
        },
      },

      availLeft: {
        enumerable: true,
        set () {},
        get () { return cfg.availLeft },
      },

      availTop: {
        enumerable: true,
        set () {},
        get () { return cfg.availTop },
      },

      colorDepth: {
        enumerable: true,
        set () {},
        get () { return 24 },
      },

      pixelDepth: {
        enumerable: true,
        set () {},
        get () { return 24 },
      },

      toString: {
        value: () => '[object Screen]',
      },
    }
  }
}

function getNumberPropertyDescriptor (parent, key) {
  return {
    enumerable: true,
    get () { return parent[key] },
    set (v) { parent[key] = defaultNumber(v, parent[key], 0) },
  }
}

module.exports = ScreenConfig

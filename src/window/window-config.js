'use strict'

const ConfigBase = require('class-config-base')
const ScreenConfig = require('../screen/screen-config')
const Screen = require('../screen/screen')
const defaultConfig = require('./window-default')

class WindowConfig extends ConfigBase {

  constructor (initConfig) {
    super(initConfig, defaultConfig)
  }

  getAccessorDescriptors () {
    if (!(this.$private.screen instanceof Screen)) {
      this.$private.screen = new Screen(new ScreenConfig())
    }

    return super.getAccessorDescriptors()
  }

  // https://www.w3.org/TR/cssom-view-1/#extensions-to-the-window-interface`
  getInterfaceDescriptors () {
    const cfg = this

    return {
      screen: {
        enumerable: true,
        writable: true,
        configurable: true,
        value: cfg.screen,
      },
    }
  }
}

module.exports = WindowConfig

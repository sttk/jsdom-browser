'use strict'

const ScreenConfig = require('./screen-config')
const Screen = require('./screen')

class WindowConfig {

  constructor (config) {
    config = config || {}

    if (config.screenConfig instanceof ScreenConfig) {
      this.screenConfig = config.screenConfig
    } else {
      this.screenConfig = new ScreenConfig()
    }

    if (config.screen instanceof Screen) {
      this._screen = config.screen
    } else {
      this._screen = new Screen(this.screenConfig)
    }
  }

  get screen () { return this._screen }
  set screen (v) { this._screen = v }

  getPropertyDescriptors () {
    const self = this

    return {
      screen: {
        enumerable: true,
        configurable: true,
        set (v) { self.screen = v },
        get () { return self.screen },
      },
    }
  }
}

module.exports = WindowConfig

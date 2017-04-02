'use strict'

const WindowConfig = require('./window/window-config')

class BrowserConfig {

  constructor (config) {
    config = config || {}

    if (config.windowConfig instanceof WindowConfig) {
      this.windowConfig = config.windowConfig
    } else {
      this.windowConfig = new WindowConfig()
    }
  }
}

module.exports = BrowserConfig

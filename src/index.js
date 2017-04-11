'use strict'

const ScreenConfig = require('./screen/screen-config')
const WindowConfig = require('./window/window-config')
const Screen = require('./screen/screen')
const defaultConfig = require('./browser-default')
const copyProps = require('copy-props')

class Browser {

  constructor (initConfig) {
    const config = {}
    if (initConfig instanceof Browser) {
      config.screenConfig = copyProps(initConfig.screenConfig)
      config.windowConfig = copyProps(initConfig.windowConfig)
    } else {
      copyProps(initConfig, copyProps(defaultConfig, config))
    }

    const screenCfg = new ScreenConfig(config.screenConfig)
    Object.defineProperty(this, 'screenConfig', { value: screenCfg })

    const screen = new Screen(screenCfg)
    config.windowConfig.screen = screen

    const windowCfg = new WindowConfig(config.windowConfig)
    Object.defineProperty(this, 'windowConfig', { value: windowCfg })
  }

  simulate (window) {
    if (this.windowObject) {
      return
    }

    this.windowConfig.configure(window)
    Object.defineProperty(this, 'windowObject', { value: window })
  }
}

module.exports = Browser

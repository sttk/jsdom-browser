'use strict'

const ScreenConfig = require('./screen/screen-config')
const WindowConfig = require('./window/window-config')
const Screen = require('./screen/screen')
const defaultConfig = require('./browser-default')
const copyProps = require('copy-props')

class BrowserConfig {

  constructor () {
    this.WindowConfig = BrowserConfig.WindowConfig
    this.ScreenConfig = BrowserConfig.ScreenConfig
  }

  configure (window, browserConfig) {
    if (this.windowObject) {
      return
    }

    let screenCfg,
        windowCfg

    if (browserConfig instanceof BrowserConfig) {
      screenCfg = copyProps(browserConfig.screenConfig)
      windowCfg = copyProps(browserConfig.windowConfig)
    } else {
      screenCfg = copyProps(defaultConfig.screenConfig)
      windowCfg = copyProps(defaultConfig.windowConfig)

      if (browserConfig) {
        copyProps(browserConfig.screenConfig, screenCfg)
        copyProps(browserConfig.windowConfig, windowCfg)
      }
    }

    screenCfg = new this.ScreenConfig(screenCfg)
    Object.defineProperty(this, 'screenConfig', { value: screenCfg })

    if (!(windowCfg.screen instanceof Screen)) {
      windowCfg.screen = new Screen(screenCfg)
    }

    windowCfg = new this.WindowConfig(windowCfg)
    Object.defineProperty(this, 'windowConfig', { value: windowCfg })

    windowCfg.configure(window)
    Object.defineProperty(this, 'windowObject', { value: window })
  }
}

Object.defineProperty(BrowserConfig, 'ScreenConfig', { value: ScreenConfig })
Object.defineProperty(BrowserConfig, 'WindowConfig', { value: WindowConfig })

module.exports = BrowserConfig

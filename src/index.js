'use strict'

const copyProps = require('copy-props')
const WindowManager = require('./window/manager')
const ContentManager = require('./window/content')
const WindowConfig = require('./window/config')
const { newWindow, openWindow } = require('./window/opening')
const ScreenConfig = require('./screen/config')
const Screen = require('./screen')
const BrowserOptions = require('./options')
const defaultConfig = require('./default')

class Browser {

  constructor (browserConfig) {
    const { windowConfig, screenConfig, options } = newConfig(browserConfig)
    this.windowConfig = windowConfig
    this.screenConfig = screenConfig
    this.options = options

    Object.defineProperties(this, {
      windowManager: { value: new WindowManager() },
      contentManager: { value: new ContentManager() },
    })
  }

  getConfig (object) {
    switch (Object.prototype.toString.call(object)) {
      case '[object Window]': {
        return this.windowManager.getConfig(object)
      }
      case '[object Screen]': {
        return this.screenConfig
      }
    }
  }

  getWindow (key) {
    return this.windowManager.get(key)
  }

  addContent (url, content) {
    this.contentManager.add(url, content)
  }

  newWindow () {
    return newWindow(this)
  }

  openWindow (url) {
    return openWindow(url, this)
  }
}

function newConfig (browserConfig) {
  const config = copyProps(defaultConfig, {})

  if (browserConfig) {
    Object.keys(browserConfig).forEach(prop => {
      config[prop] = copyProps(browserConfig[prop], config[prop])
    })
  }

  const screenConfig = new ScreenConfig(config.screenConfig)
  const screen = new Screen(screenConfig)

  config.windowConfig.screen = screen
  const windowConfig = new WindowConfig(config.windowConfig)

  const options = new BrowserOptions(config.options)

  return { screenConfig, windowConfig, options }
}

module.exports = Browser

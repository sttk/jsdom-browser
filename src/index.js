'use strict'

const copyProps = require('copy-props')
const WindowManager = require('./window/manager')
const ContentManager = require('./window/content')
const WindowConfig = require('./window/config')
const { newWindow, openWindow } = require('./window/opening')
const ScreenConfig = require('./screen/config')
const Screen = require('./screen')
const defaultConfig = require('./default')

class Browser {

  constructor (browserConfig) {
    browserConfig = copyProps(browserConfig, copyProps(defaultConfig, {}))

    const screenConfig = new ScreenConfig(browserConfig.screenConfig)
    const screen = new Screen(screenConfig)

    browserConfig.windowConfig.screen = screen
    const windowConfig = new WindowConfig(browserConfig.windowConfig)

    this.windowConfig = windowConfig
    this.screenConfig = screenConfig
    this.userAgent = browserConfig.userAgent

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

module.exports = Browser

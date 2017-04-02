'use strict'

const simulateWindow = require('./window')

function simulateBrowser (window, browserConfig) {
  browserConfig = browserConfig || {}

  simulateWindow(window, browserConfig.windowConfig)
}

module.exports = {
  simulate: simulateBrowser,
  BrowserConfig: require('./browser-config'),
  WindowConfig: require('./window/window-config'),
  ScreenConfig: require('./window/screen-config'),
  Screen: require('./window/screen'),
}


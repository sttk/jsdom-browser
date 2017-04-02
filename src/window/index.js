'use strict'

const WindowConfig = require('./window-config')

// https://www.w3.org/TR/cssom-view-1/#extensions-to-the-window-interface
function simulateWindow (window, windowConfig) {

  if (! (windowConfig instanceof WindowConfig)) {
    windowConfig = new WindowConfig()
  }

  const descriptors = windowConfig.getPropertyDescriptors()
  for (const name in descriptors) {
    Object.defineProperty(window, name, descriptors[name])
  }
}

module.exports = simulateWindow

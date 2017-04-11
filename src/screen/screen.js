'use strict'

class Screen {
  constructor (screenConfig) {
    screenConfig.configure(this)
  }
}

module.exports = Screen

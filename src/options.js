'use strict'

const ConfigBase = require('class-config-base')
const { options: defaultOptions } = require('./default')

class BrowserOptions extends ConfigBase {

  constructor (initOptions) {
    super(initOptions, defaultOptions)
  }
}

module.exports = BrowserOptions

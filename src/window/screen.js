'use strict'

// https://www.w3.org/TR/cssom-view-1/#screen
class Screen {

  constructor (screenConfig) {
    const descriptors = screenConfig.getPropertyDescriptors()
    for (const name in descriptors) {
      Object.defineProperty(this, name, descriptors[name])
    }
  }

  toString () {
    const classname = this.constructor.name
    const params = Object.keys(this)
      .map(name => `${name}: ${this[name]}`)
      .join(', ')
    return `${classname} { ${params} }`
  }
}

module.exports = Screen

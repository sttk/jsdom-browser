'use strict'

const defaultValue = require('default-val')

class WindowManager {

  constructor () {
    this._windows = []
    this._windowsDictionary = {}
    this._configToWindowMap = new WeakMap()
    this._windowToConfigMap = new WeakMap()
  }

  get count () {
    return this._windows.length
  }

  get (key) {
    switch (Object.prototype.toString.call(key)) {
      case '[object Number]': {
        return this._windows[key]
      }
      case '[object String]': {
        return (this._windowsDictionary[key] || []).find(win => !win.closed)
      }
      default: {
        return this._configToWindowMap.get(key)
      }
    }
  }

  getConfig (window) {
    return this._windowToConfigMap.get(window)
  }

  set (window, config) {
    if (this._windows.indexOf(window) < 0) {
      this._windows.push(window)
    }

    addToArrayDictionary(this._windowsDictionary, window.name, window)

    this._configToWindowMap.set(config, window)
    this._windowToConfigMap.set(window, config)

    const self = this
    config.name = window.name

    Object.defineProperty(window, 'name', {
      enumerable: true,
      get () { return config.name },
      set (name) {
        const oldName = window.name
        removeFromArrayDictionary(self._windowsDictionary, oldName, window)
        addToArrayDictionary(self._windowsDictionary, name, window)
        config.name = defaultValue(name, '')
      },
    })
  }
}

function removeFromArrayDictionary (arrayDictionary, key, item) {
  const arr = arrayDictionary[key]
  if (!Array.isArray(arr)) {
    delete arrayDictionary[key]
    return
  }

  const found = arr.indexOf(item)
  /* istanbul ignore else */
  if (found >= 0) {
    arr.splice(found, 1)
  }

  if (!arr.length) {
    delete arrayDictionary[key]
  }
}

function addToArrayDictionary (arrayDictionary, key, item) {
  if (!key) {
    return
  }

  let arr = arrayDictionary[key]
  if (!arr || !Array.isArray(arr)) {
    arrayDictionary[key] = arr = []
    arr.push(item)
    return
  }

  if (arr.indexOf(item) < 0) {
    arr.push(item)
    return
  }
}

module.exports = WindowManager

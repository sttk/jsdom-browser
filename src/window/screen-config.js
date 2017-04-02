'use strict'

const defaultNumber = require('default-number')

class ScreenConfig {

  constructor () {
    this._width = 1024
    this._height = 768
    this._availWidth = this._width
    this._availHeight = this._height
    this._availLeft = 0
    this._availTop = 0
  }

  get width () { return this._width }
  set width (v) { this._width = defaultNumber(v, this._width, 0) }

  get height () { return this._height }
  set height (v) { this._height = defaultNumber(v, this._height, 0) }

  get availLeft () { return this._availLeft }
  set availLeft (v) {
    this._availLeft = defaultNumber(v, this._availLeft, 0, this._width)
    this._availWidth = calcAvailWidth(null, this)
  }

  get availTop () { return this._availTop }
  set availTop (v) {
    this._availTop = defaultNumber(v, this._availTop, 0, this._height)
    this._availHeight = calcAvailHeight(null, this)
  }

  get availWidth () { return this._availWidth }
  set availWidth (v) { this._availWidth = calcAvailWidth(v, this) }

  get availHeight () { return this._availHeight }
  set availHeight (v) { this._availHeight = calcAvailHeight(v, this) }

  getPropertyDescriptors () {
    const self = this

    return {
      width: {
        enumerable: true,
        get () { return self.width },
        set () {},
      },

      height: {
        enumerable: true,
        get () { return self.height },
        set () {},
      },

      availWidth: {
        enumerable: true,
        get () { return self.availWidth },
        set () {},
      },

      availHeight: {
        enumerable: true,
        get () { return self.availHeight },
        set () {},
      },

      availLeft: {
        enumerable: true,
        get () { return self.availLeft },
        set () {},
      },

      availTop: {
        enumerable: true,
        get () { return self.availTop },
        set () {},
      },

      colorDepth: {
        enumerable: true,
        get () { return 24 },
        set () {},
      },

      pixelDepth: {
        enumerable: true,
        get () { return 24 },
        set () {},
      },
    }
  }
}

function calcAvailWidth (w, cfg) {
  return defaultNumber(w, cfg._availWidth, 0, cfg._width - cfg._availLeft)
}

function calcAvailHeight (h, cfg) {
  return defaultNumber(h, cfg._availHeight, 0, cfg._height - cfg._availTop)
}

module.exports = ScreenConfig

'use strict'

const ConfigBase = require('class-config-base')
const ScreenConfig = require('../screen/screen-config')
const Screen = require('../screen/screen')
const defaultConfig = require('./window-default')
const defaultNumber = require('default-number')

class WindowConfig extends ConfigBase {

  constructor (initConfig) {
    super(initConfig, defaultConfig)
  }

  getAccessorDescriptors () {
    if (!(this.$private.screen instanceof Screen)) {
      this.$private.screen = new Screen(new ScreenConfig())
    }

    const cfg = this

    return {
      screen: parent => ({
        enumerable: true,
        get () { return parent.screen },
        set () {},
      }),

      width: parent => ({
        enumerable: true,
        get () { return parent.width },
        set (v) {
          parent.width = defaultNumber(v, parent.width, cfg.minSize.width)
        },
      }),

      'frame.minSize.width': parent => ({
        enumerable: true,
        get () { return parent.width },
        set (v) {
          parent.width = defaultNumber(v, parent.width, 0)
          if (cfg.isFrameWindow) {
            cfg.width = Math.max(cfg.width, parent.width)
          }
        },
      }),

      'popup.minSize.width': parent => ({
        enumerable: true,
        get () { return parent.width },
        set (v) {
          parent.width = defaultNumber(v, parent.width, 0)
          if (!cfg.isFrameWindow) {
            cfg.width = Math.max(cfg.width, parent.width)
          }
        },
      }),

      height: parent => ({
        enumerable: true,
        get () { return parent.height },
        set (v) {
          parent.height = defaultNumber(v, parent.height, cfg.minSize.height)
        },
      }),

      'frame.minSize.height': parent => ({
        enumerable: true,
        get () { return parent.height },
        set (v) {
          parent.height = defaultNumber(v, parent.height, 0)
          if (cfg.isFrameWindow) {
            cfg.height = Math.max(cfg.height, parent.height)
          }
        },
      }),

      'popup.minSize.height': parent => ({
        enumerable: true,
        get () { return parent.height },
        set (v) {
          parent.height = defaultNumber(v, parent.height, 0)
          if (!cfg.isFrameWindow) {
            cfg.height = Math.max(cfg.height, parent.height)
          }
        },
      }),

      zoom: parent => ({
        enumerable: true,
        get () { return parent.zoom || 1 },
        set (v) {
          parent.zoom = defaultNumber(v, parent.zoom, cfg.minZoom, cfg.maxZoom)
        },
      }),

      minZoom: parent => ({
        enumerable: true,
        get () { return parent.minZoom },
        set (v) {
          parent.minZoom = defaultNumber(v, parent.minZoom, 0.01, 1)
          cfg.zoom = Math.max(cfg.zoom, parent.minZoom)
        },
      }),

      maxZoom: parent => ({
        enumerable: true,
        get () { return parent.maxZoom },
        set (v) {
          parent.maxZoom = defaultNumber(v, parent.minZoom, 1, 100)
          cfg.zoom = Math.min(cfg.zoom, parent.maxZoom)
        },
      }),
    }
  }

  get edgeSize () {
    const size = frameOrPopup(this).edgeSize
    return {
      width: size.left + size.right,
      height: size.top + size.bottom,
    }
  }

  get minSize () {
    return frameOrPopup(this).minSize
  }

  get minOpeningSize () {
    return frameOrPopup(this).minOpeningSize
  }

  get minResizableSize () {
    return frameOrPopup(this).minResizableSize
  }

  get openingShift () {
    return frameOrPopup(this).openingShift
  }

  // https://www.w3.org/TR/cssom-view-1/#extensions-to-the-window-interface`
  getInterfaceDescriptors () {
    const cfg = this

    return {
      screen: {
        enumerable: true,
        writable: true,
        configurable: true,
        value: cfg.screen,
      },

      innerWidth: {
        enumerable: true,
        configurable: true,
        set (v) { replaceProp(this, 'innerWidth', v) },
        get () {
          return Math.round((cfg.width - cfg.edgeSize.width) / cfg.zoom)
        },
      },

      innerHeight: {
        enumerable: true,
        configurable: true,
        set (v) { replaceProp(this, 'innerHeight', v) },
        get () {
          return Math.round((cfg.height - cfg.edgeSize.height) / cfg.zoom)
        },
      },

      scrollX: {
        enumerable: true,
        configurable: true,
        set (v) { replaceProp(this, 'scrollX', v) },
        get () { return this.document.body.scrollLeft },
      },

      scrollY: {
        enumerable: true,
        configurable: true,
        set (v) { replaceProp(this, 'scrollY', v) },
        get () { return this.document.body.scrollTop },
      },

      pageXOffset: {
        enumerable: true,
        configurable: true,
        set (v) { replaceProp(this, 'pageXOffset', v) },
        get () { return this.document.body.scrollLeft },
      },

      pageYOffset: {
        enumerable: true,
        configurable: true,
        set (v) { replaceProp(this, 'pageYOffset', v) },
        get () { return this.document.body.scrollTop },
      },

      screenX: {
        enumerable: true,
        configurable: true,
        set (v) { replaceProp(this, 'screenX', v) },
        get () { return cfg.left },
      },

      screenY: {
        enumerable: true,
        configurable: true,
        set (v) { replaceProp(this, 'screenY', v) },
        get () { return cfg.top },
      },

      outerWidth: {
        enumerable: true,
        configurable: true,
        set (v) { replaceProp(this, 'outerWidth', v) },
        get () { return cfg.width },
      },

      outerHeight: {
        enumerable: true,
        configurable: true,
        set (v) { replaceProp(this, 'outerHeight', v) },
        get () { return cfg.height },
      },

      devicePixelRatio: {
        enumerable: true,
        configurable: true,
        set (v) { replaceProp(this, 'devicePixelRatio', v) },
        get () { return cfg.zoom },
      },
    }
  }
}

function frameOrPopup (cfg) {
  return cfg.isFrameWindow ? cfg.frame : cfg.popup
}

function replaceProp (obj, name, value) {
  Object.defineProperty(obj, name, {
    enumerable: true,
    configurable: true,
    writable: true,
    value,
  })
}

module.exports = WindowConfig

'use strict'

const ConfigBase = require('../util/config-base')
const { readonly, writable, replaceable, method } = ConfigBase
const defaultConfig = require('./default')
const defaultNumber = require('default-number')
const { EventEmitter } = require('events')

class WindowConfig extends ConfigBase {

  constructor (initConfig) {
    super(initConfig, defaultConfig)

    Object.defineProperty(this, '$events', { value: new EventEmitter() })
  }

  on (eventName, listener) {
    this.$events.on(eventName, listener)
  }

  once (eventName, listener) {
    this.$events.once(eventName, listener)
  }

  defineAccessors () {
    return {
      screen: (p, key) => readonly({
        get: () => p[key]
      }),

      width: (p, key) => writable({
        get: () => p[key],
        set: v => p[key] = defaultNumber(v, p[key], this.minSize.width),
      }),

      'frame.minSize.width': (p, key) => writable({
        get: () => p[key],
        set: v => {
          p[key] = defaultNumber(v, p[key], 0)
          if (this.isFrameWindow) {
            this.width = Math.max(this.width, p[key])
          }
        },
      }),

      'popup.minSize.width': (p, key) => writable({
        get: () => p[key],
        set: v => {
          p[key] = defaultNumber(v, p[key], 0)
          if (!this.isFrameWindow) {
            this.width = Math.max(this.width, p[key])
          }
        },
      }),

      height: (p, key) => writable({
        get: () => p[key],
        set: v => p[key] = defaultNumber(v, p[key], this.minSize.height),
      }),

      'frame.minSize.height': (p, key) => writable({
        get: () => p[key],
        set: v => {
          p[key] = defaultNumber(v, p[key], 0)
          if (this.isFrameWindow) {
            this.height = Math.max(this.height, p[key])
          }
        },
      }),

      'popup.minSize.height': (p, key) => writable({
        get: () => p[key],
        set: v => {
          p[key] = defaultNumber(v, p[key], 0)
          if (!this.isFrameWindow) {
            this.height = Math.max(this.height, p[key])
          }
        },
      }),

      zoom: (p, key) => writable({
        get: () => p[key] || 1,
        set: v => {
          p[key] = defaultNumber(v, p[key], this.minZoom, this.maxZoom)
        },
      }),

      minZoom: (p, key) => writable({
        get: () => p[key],
        set: v => {
          p[key] = defaultNumber(v, p[key], 0.01, 1)
          this.zoom = Math.max(this.zoom, p.minZoom)
        }
      }),

      maxZoom: (p, key) => writable({
        get: () => p[key],
        set: v => {
          p[key] = defaultNumber(v, p[key], 1, 100)
          this.zoom = Math.min(this.zoom, p.maxZoom)
        }
      }),
    }
  }

  get edgeSize () {
    const sz = frameOrPopup(this).edgeSize
    return {
      width: sz.left + sz.right,
      height: sz.top + sz.bottom,
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

  get isMovableByScript () {
    return !this.isFrameWindow
  }

  get isResizableByScript () {
    return !this.isFrameWindow
  }

  // https://www.w3.org/TR/cssom-view-1/#extensions-to-the-window-interface`
  defineInterfaces () {
    return {
      screen: cfg => replaceable({
        get: () => cfg.screen
      }),

      innerWidth: cfg => replaceable({
        get: () => Math.round((cfg.width - cfg.edgeSize.width) / cfg.zoom),
      }),

      innerHeight: cfg => replaceable({
        get: () => Math.round((cfg.height - cfg.edgeSize.height) / cfg.zoom),
      }),

      scrollX: () => replaceable({
        get () { return this.document.body.scrollLeft },
      }),

      scrollY: () => replaceable({
        get () { return this.document.body.scrollTop },
      }),

      pageXOffset: () => replaceable({
        get () { return this.document.body.scrollLeft },
      }),

      pageYOffset: () => replaceable({
        get () { return this.document.body.scrollTop },
      }),

      screenX: cfg => replaceable({
        get: () => cfg.left,
      }),

      screenY: cfg => replaceable({
        get: () => cfg.top,
      }),

      outerWidth: cfg => replaceable({
        get: () => cfg.width,
      }),

      outerHeight: cfg => replaceable({
        get: () => cfg.height,
      }),

      devicePixelRatio: cfg => replaceable({
        get: () => cfg.zoom,
      }),

      moveTo: cfg => method((x, y) => {
        moveWindow(cfg, x, y)
      }),

      moveBy: cfg => method((dx, dy) => {
        moveWindow(cfg, cfg.left + dx, cfg.top + dy)
      }),

      resizeTo: cfg => method((w, h) => {
        resizeWindow(cfg, w, h)
      }),

      resizeBy: cfg => method((dw, dh) => {
        resizeWindow(cfg, cfg.width + dw, cfg.height + dh)
      }),

      scroll: () => method({
        get () {
          const win = this
          return (x, y) => {
            win.document.body.scrollLeft = x
            win.document.body.scrollTop  = y
          }
        }
      }),

      scrollTo: () => method({
        get () {
          const win = this
          return (x, y) => {
            win.document.body.scrollLeft = x
            win.document.body.scrollTop  = y
          }
        }
      }),

      scrollBy: () => method({
        get () {
          const win = this
          return (x, y) => {
            win.document.body.scrollLeft += x
            win.document.body.scrollTop  += y
          }
        }
      }),

    }
  }
}

function frameOrPopup (config) {
  return config.isFrameWindow ? config.frame : config.popup
}

function moveWindow (cfg, x, y) {
  if (!cfg.isMovableByScript) {
    return
  }

  const xmin = cfg.screen.availLeft
  const xmax = cfg.screen.availLeft + cfg.screen.availWidth - cfg.width
  const ymin = cfg.screen.availTop
  const ymax = cfg.screen.availTop + cfg.screen.availHeight - cfg.height

  cfg.left = defaultNumber(x, xmin, xmin, xmax)
  cfg.top  = defaultNumber(y, ymin, ymin, ymax)
}

function resizeWindow (cfg, w, h) {
  if (!cfg.isResizableByScript) {
    return
  }

  const wmin = cfg.minResizableSize.width
  const wmax = cfg.screen.availWidth
  const hmin = cfg.minResizableSize.height
  const hmax = cfg.screen.availHeight

  cfg.width  = defaultNumber(w, wmin, wmin, wmax)
  cfg.height = defaultNumber(h, hmin, hmin, hmax)

  const xmin = cfg.screen.availLeft
  const xmax = cfg.screen.availLeft + cfg.screen.availWidth - cfg.width
  const ymin = cfg.screen.availTop
  const ymax = cfg.screen.availTop + cfg.screen.availHeight - cfg.height

  cfg.left = defaultNumber(cfg.left, xmin, xmin, xmax)
  cfg.top  = defaultNumber(cfg.top,  ymin, ymin, ymax)
}

module.exports = WindowConfig

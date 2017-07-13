'use strict'

require('./enable-to-run-scripts')

const { JSDOM } = require('jsdom')
const defaultValue = require('default-val')
const defaults = require('lodash.defaults')


function createBlankWindow (name = '', opener, opts) {
  opener = defaultValue(opener, null, '[object Window]')

  if (!opener && !opts) {
    opts = arguments[1]
  }

  opts = defaultOptions(opts, inheritOptions(opener))

  // Suppress firing "load" event in jsdom/lib/jsdom/browser/Window.js.
  process.nextTick(() => { detachDocument() })

  const win  = new JSDOM('', opts).window
  win.name = String(name)
  win.opener = opener

  process.nextTick(() => { attachDocument() })

  return win


  function detachDocument () {
    delete win.document
  }

  function attachDocument () {
    redefineDocument(win)
  }
}

function inheritOptions (window) {
  if (window) {
    return {
      referrer: window.location.href,
      userAgent: window.navigator.userAgent,
    }
  }
}

function defaultOptions (opts, defs) {
  if (opts) {
    opts = {
      url: 'about:blank',
      referrer: defaultValue(opts.referrer, undefined, '[object String]'),
      userAgent: defaultValue(opts.userAgent, ''),
      runScripts: defaultValue(opts.runScripts, undefined, '[object String]'),
    }
  }
  return defaults(opts, defs, { userAgent: '' })
}

function redefineDocument (win) {
  Object.defineProperty(win, 'document', {
    enumerable: true,
    configurable: true,
    get () { return this._document },
  })
}

module.exports = createBlankWindow

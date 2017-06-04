'use strict'

const { JSDOM } = require('jsdom')
const defaultValue = require('default-val')

function createBlankWindow (name = '', opts) {
  const opener = defaultValue(opts, null, '[object Window]')
  if (opener) {
    opts = inheritOptions(opts)
  } else {
    opts = filterOptions(opts)
  }

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
  return filterOptions({
    referrer: window.location.href,
    userAgent: window.navigator.userAgent,
  })
}

function filterOptions (opts) {
  opts = opts || {}
  return {
    referrer: defaultValue(opts.referrer, undefined, '[object String]'),
    userAgent: defaultValue(opts.userAgent, ''),
    url: 'about:blank',
  }
}

function redefineDocument (win) {
  Object.defineProperty(win, 'document', {
    enumerable: true,
    configurable: true,
    get () { return this._document },
  })
}

module.exports = createBlankWindow

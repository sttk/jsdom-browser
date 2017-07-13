'use strict'

const { replaceable, method } = require('../util/config-base')
const { parseFeatures, applyFeatures } = require('./features')
const {
  createBlankWindow, promiseToLoadContent, clearHistory
} = require('../jsdom')


function configureOpening (window, browser) {
  const originalClose = window.close.bind(window)
  const config = browser.windowManager.getConfig(window)

  Object.defineProperties(window, {
    closed: replaceable({
      get: () => config.closed
    }),

    close: method(() => {
      originalClose()
      config.closed = true
    }),

    open: method((url, target, features) => {
      if (config.closed) {
        return
      }

      const { win, isNew } = resolveTarget(target, window, browser)
      const cfg = getConfig(win, config, browser)
      applyFeatures(cfg, parseFeatures(features), isNew)

      const isLoading = !(url == null || url === '')
      if (isLoading) {
        if (isNew) {
          clearHistory(win)
        }
        loadContentAsync(win, cfg, url, browser.contentManager)
      }

      return win
    }),
  })
}

function resolveTarget (target, opener, browser) {
  if (target == null || target === '') {
    target = '_blank'
  } else {
    target = String(target)
  }

  switch (target) {
    case '_self': {
      return { win: opener }
    }
    case '_parent': {
      return { win: opener.parent }
    }
    case '_top': {
      return { win: opener.top }
    }
    case '_blank': {
      const win = createBlankWindow('', opener, browser.options)
      return { win, isNew: true }
    }
    default: {
      let win = browser.windowManager.get(target)
      if (win) {
        return { win }
      }

      win = createBlankWindow(target, opener, browser.options)
      return { win, isNew: true }
    }
  }
}

function getConfig (win, baseConfig, browser) {
  return browser.windowManager.getConfig(win) ||
         newConfig(win, baseConfig, browser)
}

function newConfig (win, baseConfig, browser) {
  const ctor = baseConfig.constructor
  const cfg = new ctor(baseConfig)

  cfg.configure(win)
  browser.windowManager.set(win, cfg)
  configureOpening(win, browser)

  return cfg
}

function loadContentAsync (win, cfg, url, contentManager) {
  promiseToLoadContent(win, url, contentManager.get(url)).then(() => {
    cfg.$events.emit('load', null, win, cfg)
  }).catch(err => {
    cfg.$events.emit('load', err, win, cfg)
  })
}


function newWindow (browser) {
  const win = createBlankWindow('', browser.options)
  newConfig(win, browser.windowConfig, browser)
  return win
}

function openWindow (url, browser) {
  const win = createBlankWindow('', browser.options)
  const cfg = newConfig(win, browser.windowConfig, browser)

  const isLoading = !(url == null || url === '')
  if (isLoading) {
    clearHistory(win)
    loadContentAsync(win, cfg, url, browser.contentManager)
  }

  return win
}

module.exports = { configureOpening, newWindow, openWindow }

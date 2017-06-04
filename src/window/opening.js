'use strict'

/* eslint prefer-rest-params: "off" */

const { replaceable, method } = require('../util/config-base')
const { parseFeatures, applyFeatures } = require('./features')
const {
  createBlankWindow, promiseToLoadContent, clearHistory
} = require('../jsdom')


function configureOpening (window, { windowManager, contentManager }) {
  const originalClose = window.close.bind(window)
  const config = windowManager.getConfig(window)
  const managerSet = arguments[1]

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

      const { win, isNew } = resolveTarget(target, window, windowManager)
      const cfg = getConfig(win, config, managerSet)
      applyFeatures(cfg, parseFeatures(features), isNew)

      const isLoading = !(url == null || url === '')
      if (isLoading) {
        if (isNew) {
          clearHistory(win)
        }
        loadContentAsync(win, cfg, url, contentManager)
      }

      return win
    }),
  })
}

function resolveTarget (target, opener, windowManager) {
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
      return { win: createBlankWindow('', opener), isNew: true }
    }
    default: {
      const win = windowManager.get(target)
      if (win) {
        return { win }
      }

      return { win: createBlankWindow(target, opener), isNew: true }
    }
  }
}

function getConfig (win, baseConfig, managerSet) {
  return managerSet.windowManager.getConfig(win) ||
         newConfig(win, baseConfig, managerSet)
}

function newConfig (win, baseConfig, managerSet) {
  const ctor = baseConfig.constructor
  const cfg = new ctor(baseConfig)

  cfg.configure(win)
  managerSet.windowManager.set(win, cfg)
  configureOpening(win, managerSet)

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
  const win = createBlankWindow('', browser)
  newConfig(win, browser.windowConfig, browser)
  return win
}

function openWindow (url, browser) {
  const win = createBlankWindow('', browser)
  const cfg = newConfig(win, browser.windowConfig, browser)

  const isLoading = !(url == null || url === '')
  if (isLoading) {
    clearHistory(win)
    loadContentAsync(win, cfg, url, browser.contentManager)
  }

  return win
}

module.exports = { configureOpening, newWindow, openWindow }

'use strict'

/* eslint max-len: ['error', { 'ignoreComments': true }] */

const defaultValue = require('default-val')

// https://www.w3.org/TR/cssom-view-1/#the-features-argument-to-the-open%28%29-method
function parseFeatures (features) {
  features = defaultValue(features, '')
  if (!features) {
    return {}
  }

  return features
    .split(',')
    .map(toNameAndValuePair)
    .reduce(toPlainObject, {})
}

function toNameAndValuePair (feature) {
  const found = feature.indexOf('=')
  if (found < 0) {
    return {
      name: feature.toLowerCase(),
    }
  }

  return {
    name: feature.slice(0, found).trim().toLowerCase(),
    value: parseInteger(feature.slice(found + 1).trim()),
  }
}

// https://html.spec.whatwg.org/multipage/infrastructure.html#rules-for-parsing-integers
function parseInteger (value) {
  if (/^[-+]?[0-9]+$/.test(value)) {
    return parseInt(value, 10)
  }

  // "yes" and "no" are not integers but are supported by browsers.
  if (/^yes$/i.test(value)) {
    return 1
  }
  if (/^no$/i.test(value)) {
    return 0
  }

  return null
}

function toPlainObject (obj, prop) {
  obj[prop.name] = prop.value
  return obj
}

function isEmptyObject (obj) {
  return !Object.keys(obj).length
}

function applyFeatures (windowConfig, features, isNewWindow) {
  if (isNewWindow) {
    windowConfig.isFrameWindow = isEmptyObject(features)
  }

  if (windowConfig.isFrameWindow) {
    return
  }

  if (features.width != null && features.height != null) {
    windowConfig.width = features.width + windowConfig.edgeSize.width
    windowConfig.height = features.height + windowConfig.edgeSize.height
  }

  if (features.top != null && features.left != null) {
    windowConfig.top = features.top
    windowConfig.left = features.left
  } else {
    windowConfig.top += windowConfig.openingShift.y
    windowConfig.left += windowConfig.openingShift.x
  }
}

module.exports = { parseFeatures, applyFeatures }

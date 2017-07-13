'use strict'

const utils = require('jsdom/lib/jsdom/utils')

const implementedProps = [
  'screen',
  'innerWidth',
  'innerHeight',
  'scrollX',
  'scrollY',
  'pageXOffset',
  'pageYOffset',
  'screenX',
  'screenY',
  'outerWidth',
  'outerHeight',
  'devicePixelRatio',
  'moveTo',
  'moveBy',
  'resizeTo',
  'resizeBy',
  'scroll',
  'scrollTo',
  'scrollBy',
  'closed',
  'close',
  'open',
  'name',
]

function notImplemented (prop) {
  return (implementedProps.indexOf(prop) < 0)
}

utils.define = (object, properties) => {
  const names = Object.getOwnPropertyNames(properties).filter(notImplemented)
  for (const name of names) {
    const propDesc = Object.getOwnPropertyDescriptor(properties, name)
    Object.defineProperty(object, name, propDesc)
  }
}


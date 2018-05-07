'use strict'

const ScreenConfig = require('../screen/config')

module.exports = {
  screenConfig: new ScreenConfig(),

  top: 0,
  left: 0,
  width: 1024,
  height: 768,

  frame: {
    edgeSize: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    },
    minSize: {
      width: 0,
      height: 0
    },
    minOpeningSize: {
      width: 0,
      height: 0
    },
    minResizableSize: {
      width: 0,
      height: 0
    },
    openingShift: {
      x: 0,
      y: 0
    }
  },

  popup: {
    edgeSize: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    },
    minSize: {
      width: 0,
      height: 0
    },
    minOpeningSize: {
      width: 0,
      height: 0
    },
    minResizableSize: {
      width: 0,
      height: 0
    },
    openingShift: {
      x: 0,
      y: 0
    }
  },

  zoom: 1,
  minZoom: 0.25,
  maxZoom: 5,

  name: '',
  closed: false,

  isFrameWindow: true
}

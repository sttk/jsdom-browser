'use strict'

/* eslint max-statements: ['error', 100] */

const expect = require('chai').expect
const WindowConfig = require('../../src/window/window-config')
const ScreenConfig = require('../../src/screen/screen-config')
const Screen = require('../../src/screen/screen')
const jsdom = require('jsdom')

const semver = require('semver')
const version = process.version

describe('window/properties', () => {

  const screenConfig = new ScreenConfig()
  const screen = new Screen(screenConfig)
  const windowConfig = new WindowConfig({ screen })
  const window = jsdom.jsdom('', {
    created (err, window) {
      windowConfig.configure(window)
    }
  }).defaultView

  it('.screen', () => {
    expect(window.screen).to.equal(screen)

    const screen2 = new Screen(screenConfig)
    window.screen = screen2
    expect(window.screen).to.equal(screen2)

    if (semver.gte(version, '6.10.2')) {
      delete window.screen
      expect(window.screen).to.be.undefined
    }
  })

  it('.innerWidth', () => {
    expect(window.innerWidth).to.equal(1024)
    expect(windowConfig.edgeSize.width).to.equal(0)
    expect(windowConfig.isFrameWindow).to.be.true

    windowConfig.frame.edgeSize.left = 5

    expect(window.innerWidth).to.equal(1019)
    expect(windowConfig.edgeSize.width).to.equal(5)

    windowConfig.frame.edgeSize.right = 6

    expect(window.innerWidth).to.equal(1013)
    expect(windowConfig.edgeSize.width).to.equal(11)

    window.innerWidth = 1000

    expect(window.innerWidth).to.equal(1000)
    expect(windowConfig.edgeSize.width).to.equal(11)

    if (semver.gte(version, '6.10.2')) {
      delete window.innerWidth
      expect(window.innerWidth).to.be.undefined
      expect(windowConfig.edgeSize.width).to.equal(11)
    }
  })

  it('.innerHeight', () => {
    expect(window.innerHeight).to.equal(768)
    expect(windowConfig.edgeSize.height).to.equal(0)
    expect(windowConfig.isFrameWindow).to.be.true

    windowConfig.frame.edgeSize.top = 5

    expect(window.innerHeight).to.equal(763)
    expect(windowConfig.edgeSize.height).to.equal(5)

    windowConfig.frame.edgeSize.bottom = 40

    expect(window.innerHeight).to.equal(723)
    expect(windowConfig.edgeSize.height).to.equal(45)

    window.innerHeight = 1000

    expect(window.innerHeight).to.equal(1000)
    expect(windowConfig.edgeSize.height).to.equal(45)

    if (semver.gte(version, '6.10.2')) {
      delete window.innerHeight
      expect(window.innerHeight).to.be.undefined
      expect(windowConfig.edgeSize.height).to.equal(45)
    }
  })

  it('.scrollX/.pageXOffset', () => {
    expect(window.scrollX).to.equal(0)
    expect(window.pageXOffset).to.equal(0)
    expect(window.document.body.scrollLeft).to.equal(0)

    window.document.body.scrollLeft = 100

    expect(window.scrollX).to.equal(100)
    expect(window.pageXOffset).to.equal(100)
    expect(window.document.body.scrollLeft).to.equal(100)

    window.scrollX = 200

    expect(window.scrollX).to.equal(200)
    expect(window.pageXOffset).to.equal(100)
    expect(window.document.body.scrollLeft).to.equal(100)

    window.pageXOffset = 201

    expect(window.scrollX).to.equal(200)
    expect(window.pageXOffset).to.equal(201)
    expect(window.document.body.scrollLeft).to.equal(100)

    if (semver.gte(version, '6.10.2')) {
      delete window.scrollX
      expect(window.scrollX).to.be.undefined
      expect(window.pageXOffset).to.equal(201)
      expect(window.document.body.scrollLeft).to.equal(100)
    }

    delete window.pageXOffset
    expect(window.scrollX).to.be.undefined
    expect(window.pageXOffset).to.be.undefined
    expect(window.document.body.scrollLeft).to.equal(100)
  })

  it('.scrollY/.pageYOffset', () => {
    expect(window.scrollY).to.equal(0)
    expect(window.pageYOffset).to.equal(0)
    expect(window.document.body.scrollTop).to.equal(0)

    window.document.body.scrollTop = 100

    expect(window.scrollY).to.equal(100)
    expect(window.pageYOffset).to.equal(100)
    expect(window.document.body.scrollTop).to.equal(100)

    window.scrollY = 200

    expect(window.scrollY).to.equal(200)
    expect(window.pageYOffset).to.equal(100)
    expect(window.document.body.scrollTop).to.equal(100)

    window.pageYOffset = 201

    expect(window.scrollY).to.equal(200)
    expect(window.pageYOffset).to.equal(201)
    expect(window.document.body.scrollTop).to.equal(100)

    if (semver.gte(version, '6.10.2')) {
      delete window.scrollY
      expect(window.scrollY).to.be.undefined
      expect(window.pageYOffset).to.equal(201)
      expect(window.document.body.scrollTop).to.equal(100)

      delete window.pageYOffset
      expect(window.scrollY).to.be.undefined
      expect(window.pageYOffset).to.be.undefined
      expect(window.document.body.scrollTop).to.equal(100)
    }
  })

  it('.screenX', () => {
    expect(window.screenX).to.equal(0)
    expect(windowConfig.left).to.equal(0)

    windowConfig.left = 10

    expect(window.screenX).to.equal(10)
    expect(windowConfig.left).to.equal(10)

    window.screenX = 20

    expect(window.screenX).to.equal(20)
    expect(windowConfig.left).to.equal(10)

    if (semver.gte(version, '6.10.2')) {
      delete window.screenX
      expect(window.screenX).to.be.undefined
      expect(windowConfig.left).to.equal(10)
    }
  })

  it('.screenY', () => {
    expect(window.screenY).to.equal(0)
    expect(windowConfig.top).to.equal(0)

    windowConfig.top = 20

    expect(window.screenY).to.equal(20)
    expect(windowConfig.top).to.equal(20)

    window.screenY = 30

    expect(window.screenY).to.equal(30)
    expect(windowConfig.top).to.equal(20)

    if (semver.gte(version, '6.10.2')) {
      delete window.screenY
      expect(window.screenY).to.be.undefined
      expect(windowConfig.top).to.equal(20)
    }
  })

  it('.outerWidth', () => {
    expect(window.outerWidth).to.equal(1024)
    expect(windowConfig.width).to.equal(1024)

    windowConfig.width = 1280

    expect(window.outerWidth).to.equal(1280)
    expect(windowConfig.width).to.equal(1280)

    window.outerWidth = 1196

    expect(window.outerWidth).to.equal(1196)
    expect(windowConfig.width).to.equal(1280)

    if (semver.gte(version, '6.10.2')) {
      delete window.outerWidth
      expect(window.outerWidth).to.be.undefined
      expect(windowConfig.width).to.equal(1280)
    }
  })

  it('.outerHeight', () => {
    expect(window.outerHeight).to.equal(768)
    expect(windowConfig.height).to.equal(768)

    windowConfig.height = 1000

    expect(window.outerHeight).to.equal(1000)
    expect(windowConfig.height).to.equal(1000)

    window.outerHeight = 1024

    expect(window.outerHeight).to.equal(1024)
    expect(windowConfig.height).to.equal(1000)

    if (semver.gte(version, '6.10.2')) {
      delete window.outerHeight
      expect(window.outerHeight).to.be.undefined
      expect(windowConfig.height).to.equal(1000)
    }
  })

  it('.devicePixelRatio', () => {
    expect(window.devicePixelRatio).to.equal(1)
    expect(windowConfig.zoom).to.equal(1)

    windowConfig.zoom = 2

    expect(window.devicePixelRatio).to.equal(2)
    expect(windowConfig.zoom).to.equal(2)

    window.devicePixelRatio = 3

    expect(window.devicePixelRatio).to.equal(3)
    expect(windowConfig.zoom).to.equal(2)

    if (semver.gte(version, '6.10.2')) {
      delete window.devicePixelRatio
      expect(window.devicePixelRatio).to.be.undefined
      expect(windowConfig.zoom).to.equal(2)
    }
  })

})

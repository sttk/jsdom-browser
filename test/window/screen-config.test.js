'use strict'

const expect = require('chai').expect
const ScreenConfig = require('../../src/window/screen-config')
const Screen = require('../../src/window/screen')

describe('window/screen-config', () => {

  it('Should create ScreenConfig object', () => {
    let screenConfig = new ScreenConfig()
    expect(screenConfig.width).to.equal(1024)
    expect(screenConfig.height).to.equal(768)
    expect(screenConfig.availWidth).to.equal(1024)
    expect(screenConfig.availHeight).to.equal(768)
    expect(screenConfig.availLeft).to.equal(0)
    expect(screenConfig.availTop).to.equal(0)
  })

  it('Should be able to change property values', () => {
    let screenConfig = new ScreenConfig()

    screenConfig.width = 1280
    screenConfig.height = 1000
    screenConfig.availLeft = 5
    screenConfig.availTop = 23
    screenConfig.availWidth = 1270
    screenConfig.availHeight = 972

    expect(screenConfig.width).to.equal(1280)
    expect(screenConfig.height).to.equal(1000)
    expect(screenConfig.availWidth).to.equal(1270)
    expect(screenConfig.availHeight).to.equal(972)
    expect(screenConfig.availLeft).to.equal(5)
    expect(screenConfig.availTop).to.equal(23)
  })

  it('Should be limitted by each property range', () => {
    let screenConfig = new ScreenConfig()

    screenConfig.width = 1280
    screenConfig.height = 1000
    screenConfig.availLeft = 1500 
    screenConfig.availTop = 1200

    expect(screenConfig.width).to.equal(1280)
    expect(screenConfig.height).to.equal(1000)
    expect(screenConfig.availWidth).to.equal(0)
    expect(screenConfig.availHeight).to.equal(0)
    expect(screenConfig.availLeft).to.equal(1280)
    expect(screenConfig.availTop).to.equal(1000)

    screenConfig.availWidth = 300 
    screenConfig.availHeight = 200

    expect(screenConfig.width).to.equal(1280)
    expect(screenConfig.height).to.equal(1000)
    expect(screenConfig.availWidth).to.equal(0)
    expect(screenConfig.availHeight).to.equal(0)
    expect(screenConfig.availLeft).to.equal(1280)
    expect(screenConfig.availTop).to.equal(1000)

    screenConfig.availWidth = 1280 
    screenConfig.availHeight = 1000

    expect(screenConfig.width).to.equal(1280)
    expect(screenConfig.height).to.equal(1000)
    expect(screenConfig.availWidth).to.equal(0)
    expect(screenConfig.availHeight).to.equal(0)
    expect(screenConfig.availLeft).to.equal(1280)
    expect(screenConfig.availTop).to.equal(1000)

    screenConfig.availLeft = 0 
    screenConfig.availTop = 0

    expect(screenConfig.width).to.equal(1280)
    expect(screenConfig.height).to.equal(1000)
    expect(screenConfig.availWidth).to.equal(0)
    expect(screenConfig.availHeight).to.equal(0)
    expect(screenConfig.availLeft).to.equal(0)
    expect(screenConfig.availTop).to.equal(0)

    screenConfig.availWidth = 1280 
    screenConfig.availHeight = 1000

    expect(screenConfig.width).to.equal(1280)
    expect(screenConfig.height).to.equal(1000)
    expect(screenConfig.availWidth).to.equal(1280)
    expect(screenConfig.availHeight).to.equal(1000)
    expect(screenConfig.availLeft).to.equal(0)
    expect(screenConfig.availTop).to.equal(0)

    screenConfig.availLeft = 10 
    screenConfig.availTop = 30

    expect(screenConfig.width).to.equal(1280)
    expect(screenConfig.height).to.equal(1000)
    expect(screenConfig.availWidth).to.equal(1270)
    expect(screenConfig.availHeight).to.equal(970)
    expect(screenConfig.availLeft).to.equal(10)
    expect(screenConfig.availTop).to.equal(30)

    screenConfig.availWidth = 1260 
    screenConfig.availHeight = 960

    expect(screenConfig.width).to.equal(1280)
    expect(screenConfig.height).to.equal(1000)
    expect(screenConfig.availWidth).to.equal(1260)
    expect(screenConfig.availHeight).to.equal(960)
    expect(screenConfig.availLeft).to.equal(10)
    expect(screenConfig.availTop).to.equal(30)
  })

  it('Should ignore to set invalid property values', () => {
    let screenConfig = new ScreenConfig()

    screenConfig.width = undefined
    screenConfig.height = null
    screenConfig.availLeft = 'a'
    screenConfig.availTop = NaN 
    screenConfig.availWidth = [] 
    screenConfig.availHeight = {}

    expect(screenConfig.width).to.equal(1024)
    expect(screenConfig.height).to.equal(768)
    expect(screenConfig.availWidth).to.equal(1024)
    expect(screenConfig.availHeight).to.equal(768)
    expect(screenConfig.availLeft).to.equal(0)
    expect(screenConfig.availTop).to.equal(0)
  })

  it('Should get property descriptors for Screen object', () => {
    let screenConfig = new ScreenConfig()
    let screen = {}

    let descriptors = screenConfig.getPropertyDescriptors()
    Object.keys(descriptors).forEach(name => {
      Object.defineProperty(screen, name, descriptors[name])
    })

    expect(screen.width).to.equal(1024)
    expect(screen.height).to.equal(768)
    expect(screen.availWidth).to.equal(1024)
    expect(screen.availHeight).to.equal(768)
    expect(screen.availLeft).to.equal(0)
    expect(screen.availTop).to.equal(0)
    expect(screen.pixelDepth).to.equal(24)
    expect(screen.colorDepth).to.equal(24)

    screenConfig.width = 1280
    screenConfig.height = 1000
    screenConfig.availLeft = 5
    screenConfig.availTop = 23
    screenConfig.availWidth = 1270
    screenConfig.availHeight = 972

    expect(screen.width).to.equal(1280)
    expect(screen.height).to.equal(1000)
    expect(screen.availWidth).to.equal(1270)
    expect(screen.availHeight).to.equal(972)
    expect(screen.availLeft).to.equal(5)
    expect(screen.availTop).to.equal(23)
    expect(screen.pixelDepth).to.equal(24)
    expect(screen.colorDepth).to.equal(24)
  })

  it('Should be able to override', () => {
    class MyScreenConfig extends ScreenConfig {
      get availLeft () { return 0 }
      set availLeft (v) {}
      get availTop () { return 0 }
      set availTop (v) {}
      get availWidth () { return this._width }
      set availWidth (v) {}
      get availHeight () { return this._height }
      set availHeight (v) {}
    }
    let screenConfig = new MyScreenConfig()

    let screen = {}

    let descriptors = screenConfig.getPropertyDescriptors()
    Object.keys(descriptors).forEach(name => {
      Object.defineProperty(screen, name, descriptors[name])
    })

    expect(screen.width).to.equal(1024)
    expect(screen.height).to.equal(768)
    expect(screen.availWidth).to.equal(1024)
    expect(screen.availHeight).to.equal(768)
    expect(screen.availLeft).to.equal(0)
    expect(screen.availTop).to.equal(0)
    expect(screen.pixelDepth).to.equal(24)
    expect(screen.colorDepth).to.equal(24)

    screenConfig.width = 1280
    screenConfig.height = 1000
    screenConfig.availLeft = 5
    screenConfig.availTop = 23
    screenConfig.availWidth = 1270
    screenConfig.availHeight = 972

    expect(screen.width).to.equal(1280)
    expect(screen.height).to.equal(1000)
    expect(screen.availWidth).to.equal(1280)
    expect(screen.availHeight).to.equal(1000)
    expect(screen.availLeft).to.equal(0)
    expect(screen.availTop).to.equal(0)
    expect(screen.pixelDepth).to.equal(24)
    expect(screen.colorDepth).to.equal(24)
  })
})

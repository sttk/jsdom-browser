'use strict'

const expect = require('chai').expect
const WindowConfig = require('../../src/window/window-config')
const ScreenConfig = require('../../src/window/screen-config')
const Screen = require('../../src/window/screen')

describe('window/window-config', () => {

  it('Should create WindowConfig object with no argument', () => {
    let windowConfig = new WindowConfig()
    expect(windowConfig.screen instanceof Screen).to.be.true
  })

  it('Should create WindowConfig object with a ScreenConfig object', () => {
    let screenConfig = new ScreenConfig()
    screenConfig.width = 1280
    screenConfig.height = 1024
    screenConfig.availWidth = 1280
    screenConfig.availHeight = 1024
    screenConfig.availLeft = 0
    screenConfig.availTop = 23

    let windowConfig = new WindowConfig({ screenConfig })
    expect(windowConfig.screen instanceof Screen).to.be.true
    expect(windowConfig.screen.width).to.equal(1280)
    expect(windowConfig.screen.height).to.equal(1024)
    expect(windowConfig.screen.availWidth).to.equal(1280)
    expect(windowConfig.screen.availHeight).to.equal(1001)
    expect(windowConfig.screen.availLeft).to.equal(0)
    expect(windowConfig.screen.availTop).to.equal(23)
  })

  it('Should create WindowConfig object with a WindowConfig object', () => {
    let screenConfig = new ScreenConfig()
    let windowConfig0 = new WindowConfig({ screenConfig })
    let screen = windowConfig0.screen

    screenConfig.width = 1280
    screenConfig.height = 1024
    screenConfig.availWidth = 1280
    screenConfig.availHeight = 1024
    screenConfig.availLeft = 0
    screenConfig.availTop = 23

    let windowConfig = new WindowConfig(windowConfig0)
    expect(windowConfig.screen instanceof Screen).to.be.true
    expect(windowConfig.screen).to.equal(windowConfig0.screen)
    expect(windowConfig.screenConfig).to.equal(windowConfig0.screenConfig)
    expect(windowConfig.screen.width).to.equal(1280)
    expect(windowConfig.screen.height).to.equal(1024)
    expect(windowConfig.screen.availWidth).to.equal(1280)
    expect(windowConfig.screen.availHeight).to.equal(1001)
    expect(windowConfig.screen.availLeft).to.equal(0)
    expect(windowConfig.screen.availTop).to.equal(23)
  })

  it('Should get property descriptors for Window object', () => {
    let screenConfig = new ScreenConfig()
    let windowConfig = new WindowConfig(screenConfig)
    let screen = windowConfig.screen
    let window = {}

    let descriptors = windowConfig.getPropertyDescriptors()
    Object.keys(descriptors).forEach(name => {
      Object.defineProperty(window, name, descriptors[name])
    })

    expect(window.screen).to.equal(screen)

    window.screen = 1
    expect(window.screen).to.equal(1)

    delete window.screen
    expect(window.screen).to.be.undefined
  })

  it('Should be able to override', () => {
    class MyWindowConfig extends WindowConfig {
      getPropertyDescriptors () {
        const self = this
        let descriptors = super.getPropertyDescriptors()
        descriptors.screen = {
          enumerable: true,
          set (v) {},
          get () { return self.screen },
        }
        return descriptors
      }
    }

    let screenConfig = new ScreenConfig()
    let windowConfig = new MyWindowConfig(screenConfig)
    let screen = windowConfig.screen
    let window = {}

    let descriptors = windowConfig.getPropertyDescriptors()
    Object.keys(descriptors).forEach(name => {
      Object.defineProperty(window, name, descriptors[name])
    })

    expect(window.screen).to.equal(screen)

    window.screen = 1
    expect(window.screen).to.equal(screen)

    expect(() => { delete window.screen }).throw(TypeError)
    expect(window.screen).to.equal(screen)
  })
})

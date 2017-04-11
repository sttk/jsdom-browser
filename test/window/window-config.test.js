'use strict'

const expect = require('chai').expect
const WindowConfig = require('../../src/window/window-config')
const ScreenConfig = require('../../src/screen/screen-config')
const Screen = require('../../src/screen/screen')

describe('window/window-config', () => {

  it('Should create WindowConfig object with no argument', () => {
    const windowConfig = new WindowConfig()
    expect(windowConfig.screen).to.be.an.instanceof(Screen)
  })

  it('Should create WindowConfig object with a ScreenConfig object', () => {
    const screenConfig = new ScreenConfig()
    screenConfig.width = 1280
    screenConfig.height = 1024
    screenConfig.availTop = 23
    screenConfig.availLeft = 0
    screenConfig.availRight = 0
    screenConfig.availBottom = 0

    const screen = new Screen(screenConfig)

    const windowConfig = new WindowConfig({ screen })
    expect(windowConfig.screen).to.be.an.instanceof(Screen)
    expect(windowConfig.screen.width).to.equal(1280)
    expect(windowConfig.screen.height).to.equal(1024)
    expect(windowConfig.screen.availWidth).to.equal(1280)
    expect(windowConfig.screen.availHeight).to.equal(1001)
    expect(windowConfig.screen.availLeft).to.equal(0)
    expect(windowConfig.screen.availTop).to.equal(23)
  })

  it('Should create WindowConfig object with a WindowConfig object', () => {
    const screenConfig = new ScreenConfig()
    const screen = new Screen(screenConfig)
    let windowConfig = new WindowConfig({ screen })

    screenConfig.width = 1280
    screenConfig.height = 1024
    screenConfig.availTop = 23
    screenConfig.availLeft = 1
    screenConfig.availRight = 1
    screenConfig.availBottom = 4

    windowConfig = new WindowConfig(windowConfig)
    expect(windowConfig.screen).to.be.an.instanceof(Screen)
    expect(windowConfig.screen.width).to.equal(1280)
    expect(windowConfig.screen.height).to.equal(1024)
    expect(windowConfig.screen.availWidth).to.equal(1278)
    expect(windowConfig.screen.availHeight).to.equal(997)
    expect(windowConfig.screen.availLeft).to.equal(1)
    expect(windowConfig.screen.availTop).to.equal(23)
  })

  it('Should configure properties of Window object', () => {
    const screenConfig = new ScreenConfig()
    const screen = new Screen(screenConfig)
    const windowConfig = new WindowConfig({ screen })
    const window = {}

    windowConfig.configure(window)
    expect(window.screen).to.equal(windowConfig.screen)

    window.screen = 1
    expect(window.screen).to.equal(1)

    delete window.screen
    expect(window.screen).to.be.undefined

    window.screen = windowConfig.screen
    expect(window.screen).to.equal(windowConfig.screen)
  })

})

'use strict'

const expect = require('chai').expect
const Browser = require('../src')
const WindowConfig = require('../src/window/window-config')
const ScreenConfig = require('../src/screen/screen-config')
const Screen = require('../src/screen/screen')
const jsdom = require('jsdom')

describe('jsdom-browser', () => {

  it('Should create Browser object with no argument', () => {
    const browser = new Browser()
    expect(browser.windowConfig).to.be.an.instanceof(WindowConfig)
    expect(browser.screenConfig).to.be.an.instanceof(ScreenConfig)
    expect(browser.windowObject).to.be.undefined
  })

  it('Should create Browser object with a plain object', () => {
    const config = { screenConfig: { width: 2048, height: 1024 } }
    const browser = new Browser(config)

    expect(browser.windowConfig).to.be.an.instanceof(WindowConfig)
    expect(browser.screenConfig).to.be.an.instanceof(ScreenConfig)
    expect(browser.windowObject).to.be.undefined

    expect(browser.screenConfig.width).to.equal(2048)
    expect(browser.screenConfig.height).to.equal(1024)
    expect(browser.windowConfig.screen.width).to.equal(2048)
    expect(browser.windowConfig.screen.height).to.equal(1024)

    // Should be no influence
    config.width = 10
    config.height = 20

    expect(browser.screenConfig.width).to.equal(2048)
    expect(browser.screenConfig.height).to.equal(1024)
    expect(browser.windowConfig.screen.width).to.equal(2048)
    expect(browser.windowConfig.screen.height).to.equal(1024)
  })

  it('Should create Browser object with another Browser object', () => {
    const config = { screenConfig: { width: 2048, height: 1024 } }
    const browser0 = new Browser(config)
    const browser = new Browser(browser0)

    expect(browser.windowConfig).to.be.an.instanceof(WindowConfig)
    expect(browser.screenConfig).to.be.an.instanceof(ScreenConfig)
    expect(browser.windowObject).to.be.undefined

    expect(browser.screenConfig.width).to.equal(2048)
    expect(browser.screenConfig.height).to.equal(1024)
    expect(browser.windowConfig.screen.width).to.equal(2048)
    expect(browser.windowConfig.screen.height).to.equal(1024)

    // Should be no influence
    browser0.screenConfig.$private.width = 10
    browser0.screenConfig.$private.height = 20
    expect(browser0.screenConfig.width).to.equal(10)
    expect(browser0.screenConfig.height).to.equal(20)
    expect(browser0.windowConfig.screen.width).to.equal(10)
    expect(browser0.windowConfig.screen.height).to.equal(20)

    expect(browser.windowConfig.screen.width).to.equal(2048)
    expect(browser.windowConfig.screen.height).to.equal(1024)
    expect(browser.windowConfig.screen.width).to.equal(2048)
    expect(browser.windowConfig.screen.height).to.equal(1024)
  })

  it('Should set a Window object and configure it', () => {
    const config = { screenConfig: { width: 2048, height: 1024 } }
    const browser = new Browser(config)

    const window = jsdom.jsdom('', {
      created (err, window) {
        browser.simulate(window)
      }
    }).defaultView

    expect(window.screen).to.be.an.instanceof(Screen)
    expect(window.screen.width).to.equal(2048)
    expect(window.screen.height).to.equal(1024)
    expect(window.screen.availWidth).to.equal(2048)
    expect(window.screen.availHeight).to.equal(1001)
    expect(window.screen.availLeft).to.equal(0)
    expect(window.screen.availTop).to.equal(23)
    expect(window.screen.pixelDepth).to.equal(24)
    expect(window.screen.colorDepth).to.equal(24)

    browser.screenConfig.width = 1980
    expect(window.screen.width).to.equal(1980)
    expect(window.screen.height).to.equal(1024)
    expect(window.screen.availWidth).to.equal(1980)
    expect(window.screen.availHeight).to.equal(1001)
    expect(window.screen.availLeft).to.equal(0)
    expect(window.screen.availTop).to.equal(23)
    expect(window.screen.pixelDepth).to.equal(24)
    expect(window.screen.colorDepth).to.equal(24)

    // Not be able to set twice
    const window2 = jsdom.jsdom('', {
      created (err, win) {
        browser.simulate(win)
      }
    }).defaultView

    expect(window2.screen).not.to.be.an.instanceof(Screen)
  })
})

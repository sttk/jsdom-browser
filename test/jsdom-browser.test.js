'use strict'

const expect = require('chai').expect
const BrowserConfig = require('../src')
const WindowConfig = require('../src/window/window-config')
const ScreenConfig = require('../src/screen/screen-config')
const Screen = require('../src/screen/screen')
const jsdom = require('jsdom')

describe('jsdom-browser', () => {

  it('Should get default ScreenConfig and WindowConfig classes', () => {
    expect(BrowserConfig.ScreenConfig).to.equal(ScreenConfig)
    expect(BrowserConfig.WindowConfig).to.equal(WindowConfig)
  })

  it('Should create a BrowserConfig instance', () => {
    const browserConfig = new BrowserConfig()
    expect(browserConfig.ScreenConfig).to.equal(ScreenConfig)
    expect(browserConfig.WindowConfig).to.equal(WindowConfig)
    expect(browserConfig.screenConfig).to.be.undefined
    expect(browserConfig.windowConfig).to.be.undefined
    expect(browserConfig.windowObject).to.be.undefined

    class ScreenConfigEx extends ScreenConfig {}
    class WindowConfigEx extends WindowConfig {}
    browserConfig.ScreenConfig = ScreenConfigEx
    browserConfig.WindowConfig = WindowConfigEx

    expect(browserConfig.ScreenConfig).to.equal(ScreenConfigEx)
    expect(browserConfig.WindowConfig).to.equal(WindowConfigEx)
    expect(browserConfig.screenConfig).to.be.undefined
    expect(browserConfig.windowConfig).to.be.undefined
    expect(browserConfig.windowObject).to.be.undefined

    expect(BrowserConfig.ScreenConfig).to.equal(ScreenConfig)
    expect(BrowserConfig.WindowConfig).to.equal(WindowConfig)
  })

  it('Should configure a Window object with default config.', () => {
    const browserConfig = new BrowserConfig()
    const window = jsdom.jsdom('', {
      created (err, window) {
        browserConfig.configure(window)
      },
    }).defaultView

    expect(browserConfig.ScreenConfig).to.equal(ScreenConfig)
    expect(browserConfig.WindowConfig).to.equal(WindowConfig)
    expect(browserConfig.screenConfig).to.be.a.instanceof(ScreenConfig)
    expect(browserConfig.windowConfig).to.be.a.instanceof(WindowConfig)

    expect(window.outerWidth).to.equal(1024)
    expect(window.outerHeight).to.equal(768)
    expect(browserConfig.windowObject.outerWidth).to.equal(1024)
    expect(browserConfig.windowObject.outerHeight).to.equal(768)
    expect(browserConfig.windowConfig.width).to.equal(1024)
    expect(browserConfig.windowConfig.height).to.equal(768)
  })

  it('Should configure a Window object with user-defined config', () => {
    const browserConfig = new BrowserConfig()
    const initConfig = {
      windowConfig: { width: 2048, height: 1024 },
    }
    const window = jsdom.jsdom('', {
      created (err, window) {
        browserConfig.configure(window, initConfig)
      },
    }).defaultView

    expect(browserConfig.ScreenConfig).to.equal(ScreenConfig)
    expect(browserConfig.WindowConfig).to.equal(WindowConfig)
    expect(browserConfig.screenConfig).to.be.a.instanceof(ScreenConfig)
    expect(browserConfig.windowConfig).to.be.a.instanceof(WindowConfig)

    expect(window.outerWidth).to.equal(2048)
    expect(window.outerHeight).to.equal(1024)
    expect(browserConfig.windowObject.outerWidth).to.equal(2048)
    expect(browserConfig.windowObject.outerHeight).to.equal(1024)
    expect(browserConfig.windowConfig.width).to.equal(2048)
    expect(browserConfig.windowConfig.height).to.equal(1024)
  })

  it('Should configure a Window object with user-defined config', () => {
    const browserConfig = new BrowserConfig()
    const initConfig = {
      windowConfig: { width: 2048, height: 1024 },
    }
    const window = jsdom.jsdom('', {
      created (err, window) {
        browserConfig.configure(window, initConfig)
      },
    }).defaultView

    const browserConfig2 = new BrowserConfig()
    const window2 = jsdom.jsdom('', {
      created (err, window) {
        browserConfig2.configure(window, browserConfig)
      },
    }).defaultView

    expect(browserConfig2.screenConfig).not.to
      .equal(browserConfig.screenConfig)
    expect(browserConfig2.windowConfig).not.to
      .equal(browserConfig.windowConfig)
    expect(browserConfig2.windowObject.document).not.to
      .equal(browserConfig.windowObject.document)
    expect(window2.screen).to.equal(window.screen)

    expect(window.outerWidth).to.equal(2048)
    expect(window.outerHeight).to.equal(1024)
    expect(browserConfig.windowObject.outerWidth).to.equal(2048)
    expect(browserConfig.windowObject.outerHeight).to.equal(1024)
    expect(browserConfig.windowConfig.width).to.equal(2048)
    expect(browserConfig.windowConfig.height).to.equal(1024)

    expect(window2.outerWidth).to.equal(2048)
    expect(window2.outerHeight).to.equal(1024)
    expect(browserConfig2.windowObject.outerWidth).to.equal(2048)
    expect(browserConfig2.windowObject.outerHeight).to.equal(1024)
    expect(browserConfig2.windowConfig.width).to.equal(2048)
    expect(browserConfig2.windowConfig.height).to.equal(1024)
  })

  it('Should not configure twice', () => {
    const browserConfig = new BrowserConfig()

    const window = jsdom.jsdom('', {
      created (err, window) {
        browserConfig.configure(window)
      },
    }).defaultView

    const window2 = jsdom.jsdom('', {
      created (err, window) {
        browserConfig.configure(window)
      },
    }).defaultView

    expect(window.screen).to.be.a.instanceof(Screen)
    expect(window2.screen).not.to.be.a.instanceof(Screen)
  })

  it('Should be able to use customized BrowserConfig', () => {
    const browserConfig = new BrowserConfig()

    class ScreenConfigEx extends ScreenConfig {}
    class WindowConfigEx extends WindowConfig {}
    browserConfig.ScreenConfig = ScreenConfigEx
    browserConfig.WindowConfig = WindowConfigEx

    const window = jsdom.jsdom('', {
      created (err, window) {
        browserConfig.configure(window)
      },
    }).defaultView

    expect(browserConfig.ScreenConfig).to.equal(ScreenConfigEx)
    expect(browserConfig.WindowConfig).to.equal(WindowConfigEx)
    expect(browserConfig.screenConfig).to.be.a.instanceof(ScreenConfigEx)
    expect(browserConfig.windowConfig).to.be.a.instanceof(WindowConfigEx)
    expect(browserConfig.windowObject.document).to.equal(window.document)
    expect(window.screen).to.be.a.instanceof(Screen)
  })

})

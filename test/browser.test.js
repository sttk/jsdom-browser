'use strict'

const expect = require('chai').expect
const jsdom = require('jsdom')
const {
  simulate, BrowserConfig, WindowConfig, ScreenConfig, Screen,
} = require('../src')

describe('jsdom-browser', () => {

  it('Should simulate behaviors of a browser', () => {
    let window = jsdom.jsdom('', {
      created (err, window) {
        simulate(window)
      }
    }).defaultView

    expect(window.screen instanceof Screen).to.be.true
    expect(window.screen.width).to.equal(1024)
    expect(window.screen.height).to.equal(768)
    expect(window.screen.availWidth).to.equal(1024)
    expect(window.screen.availHeight).to.equal(768)
    expect(window.screen.availLeft).to.equal(0)
    expect(window.screen.availTop).to.equal(0)
    expect(window.screen.pixelDepth).to.equal(24)
    expect(window.screen.colorDepth).to.equal(24)
  })

  it('Should simulate behaviors of the user-custom browser', () => {
    let screenConfig = new ScreenConfig()
    screenConfig.width = 1280
    screenConfig.height = 968
    screenConfig.availLeft = 5
    screenConfig.availTop = 23
    screenConfig.availWidth = 1260
    screenConfig.availHeight = 940

    let windowConfig = new WindowConfig({ screenConfig })
    let browserConfig = new BrowserConfig({ windowConfig })

    let window = jsdom.jsdom('', {
      created (err, window) {
        simulate(window, browserConfig)
      }
    }).defaultView

    expect(window.screen instanceof Screen).to.be.true
    expect(window.screen.width).to.equal(1280)
    expect(window.screen.height).to.equal(968)
    expect(window.screen.availWidth).to.equal(1260)
    expect(window.screen.availHeight).to.equal(940)
    expect(window.screen.availLeft).to.equal(5)
    expect(window.screen.availTop).to.equal(23)
    expect(window.screen.pixelDepth).to.equal(24)
    expect(window.screen.colorDepth).to.equal(24)
  })

})

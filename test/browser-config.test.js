'use strict'

const expect = require('chai').expect
const BrowserConfig = require('../src/browser-config')
const WindowConfig = require('../src/window/window-config')
const ScreenConfig = require('../src/window/screen-config')
const Screen = require('../src/window/screen')

describe('browser-config', () => {

  it('Should create BrowserConfig object with no argument', () => {
    let browserConfig = new BrowserConfig()
    expect(browserConfig.windowConfig instanceof WindowConfig).to.be.true
  })

  it('Should create BrowserConfig object with a WindowConfig object', () => {
    let windowConfig = new WindowConfig()
    let browserConfig = new BrowserConfig({ windowConfig })
    expect(browserConfig.windowConfig).to.equal(windowConfig)
  })

  it('Should create BrowserConfig object with a BrowserConfig object', () => {
    let screenConfig = new ScreenConfig()
    let screen = new Screen(screenConfig)
    let windowConfig = new WindowConfig({ screenConfig, screen })
    let browserConfig0 = new BrowserConfig({ windowConfig })

    expect(browserConfig0.windowConfig).to.equal(windowConfig)
    expect(browserConfig0.windowConfig.screenConfig).to.equal(screenConfig)
    expect(browserConfig0.windowConfig.screen).to.equal(screen)
  })
})

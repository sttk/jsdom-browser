'use strict'

const expect = require('chai').expect
const simulateWindow = require('../../src/window')
const WindowConfig = require('../../src/window/window-config')
const ScreenConfig = require('../../src/window/screen-config')
const jsdom = require('jsdom')

describe('window', () => {

  it('Should get property values specified by window-config', () => {
    let screenConfig = new ScreenConfig()
    let windowConfig = new WindowConfig(screenConfig)
    let screen = windowConfig.screen

    let window = jsdom.jsdom('', {
      created (err, window) {
        simulateWindow(window, windowConfig)
      }
    }).defaultView

    expect(window.screen).to.equal(screen)
  })

  it('Should not be able to change read only properties', () => {
    let screenConfig = new ScreenConfig()
    let windowConfig = new WindowConfig(screenConfig)
    let screen = windowConfig.screen

    let window = jsdom.jsdom('', {
      created (err, window) {
        simulateWindow(window, windowConfig)
      }
    }).defaultView

    expect(window.screen).to.equal(screen)
    expect(window.screen.width).to.equal(1024)
    expect(window.screen.height).to.equal(768)
    expect(window.screen.availWidth).to.equal(1024)
    expect(window.screen.availHeight).to.equal(768)
    expect(window.screen.availLeft).to.equal(0)
    expect(window.screen.availTop).to.equal(0)
    expect(window.screen.pixelDepth).to.equal(24)
    expect(window.screen.colorDepth).to.equal(24)

    window.screen.width = 0
    window.screen.height = 1
    window.screen.availWidth = 2
    window.screen.availHeight = 3
    window.screen.availLeft = 4
    window.screen.availTop = 5
    window.screen.pixelDepth = 6
    window.screen.colorDepth = 7

    expect(window.screen).to.equal(screen)
    expect(window.screen.width).to.equal(1024)
    expect(window.screen.height).to.equal(768)
    expect(window.screen.availWidth).to.equal(1024)
    expect(window.screen.availHeight).to.equal(768)
    expect(window.screen.availLeft).to.equal(0)
    expect(window.screen.availTop).to.equal(0)
    expect(window.screen.pixelDepth).to.equal(24)
    expect(window.screen.colorDepth).to.equal(24)
  })
})

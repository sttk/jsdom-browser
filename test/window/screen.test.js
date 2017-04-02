'use strict'

const expect = require('chai').expect
const ScreenConfig = require('../../src/window/screen-config')
const Screen = require('../../src/window/screen')

describe('window/screen', () => {

  it('Should get property values specified by screen-config', () => {
    let screenConfig = new ScreenConfig()
    let screen = new Screen(screenConfig)

    expect(screen.width).to.equal(1024)
    expect(screen.height).to.equal(768)
    expect(screen.availLeft).to.equal(0)
    expect(screen.availTop).to.equal(0)
    expect(screen.availWidth).to.equal(1024)
    expect(screen.availHeight).to.equal(768)
    expect(screen.colorDepth).to.equal(24)
    expect(screen.pixelDepth).to.equal(24)

    expect(screen.toString()).to.equal('Screen { width: 1024, ' +
      'height: 768, availWidth: 1024, availHeight: 768, availLeft: 0, ' +
      'availTop: 0, colorDepth: 24, pixelDepth: 24 }'
    )
  })

  it('Should be read-only properties', () => {
    let screenConfig = new ScreenConfig()
    let screen = new Screen(screenConfig)

    screenConfig.availLeft = 3
    screenConfig.availTop = 15
    screenConfig.availWidth = 1016
    screenConfig.availHeight = 750

    expect(screen.width).to.equal(1024)
    expect(screen.height).to.equal(768)
    expect(screen.availLeft).to.equal(3)
    expect(screen.availTop).to.equal(15)
    expect(screen.availWidth).to.equal(1016)
    expect(screen.availHeight).to.equal(750)
    expect(screen.colorDepth).to.equal(24)
    expect(screen.pixelDepth).to.equal(24)

    expect(screen.toString()).to.equal('Screen { width: 1024, ' +
      'height: 768, availWidth: 1016, availHeight: 750, availLeft: 3, ' +
      'availTop: 15, colorDepth: 24, pixelDepth: 24 }'
    )

    screen.width = 999
    screen.height = 999
    screen.availLeft = 9
    screen.availTop = 9
    screen.availWidth = 999
    screen.availHeight = 999
    screen.colorDepth = 99
    screen.pixelDepth = 99

    expect(screen.width).to.equal(1024)
    expect(screen.height).to.equal(768)
    expect(screen.availLeft).to.equal(3)
    expect(screen.availTop).to.equal(15)
    expect(screen.availWidth).to.equal(1016)
    expect(screen.availHeight).to.equal(750)
    expect(screen.colorDepth).to.equal(24)
    expect(screen.pixelDepth).to.equal(24)

    expect(screen.toString()).to.equal('Screen { width: 1024, ' +
      'height: 768, availWidth: 1016, availHeight: 750, availLeft: 3, ' +
      'availTop: 15, colorDepth: 24, pixelDepth: 24 }'
    )
  })

  it('Should get property names with Object.keys', () => {
    let screenConfig = new ScreenConfig()

    let screen = new Screen(screenConfig)

    expect(Object.keys(screen)).to.deep.equal(['width', 'height', 'availWidth',
      'availHeight', 'availLeft', 'availTop', 'colorDepth', 'pixelDepth'
    ])
  })
})

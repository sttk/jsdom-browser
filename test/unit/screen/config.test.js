'use strict'

const expect = require('chai').expect
const ScreenConfig = require('../../../src/screen/config')


describe('screen/config', () => {

  it('Should create ScreenConfig object', () => {
    const screenConfig = new ScreenConfig()
    expect(screenConfig.width).to.equal(1024)
    expect(screenConfig.height).to.equal(768)
    expect(screenConfig.availTop).to.equal(0)
    expect(screenConfig.availLeft).to.equal(0)
    expect(screenConfig.availRight).to.equal(0)
    expect(screenConfig.availBottom).to.equal(0)
  })

  it('Should create ScreenConfig object with an argument', () => {
    const initConfig = { width: 1280, height: 1000, availBottom: 40 }
    const screenConfig = new ScreenConfig(initConfig)
    expect(screenConfig.width).to.equal(1280)
    expect(screenConfig.height).to.equal(1000)
    expect(screenConfig.availTop).to.equal(0)
    expect(screenConfig.availLeft).to.equal(0)
    expect(screenConfig.availRight).to.equal(0)
    expect(screenConfig.availBottom).to.equal(40)
  })

  it('Should be able to change property values', () => {
    const screenConfig = new ScreenConfig()

    screenConfig.width = 1280
    screenConfig.height = 1000
    screenConfig.availTop = 23
    screenConfig.availLeft = 4
    screenConfig.availRight = 4
    screenConfig.availBottom = 5

    expect(screenConfig.width).to.equal(1280)
    expect(screenConfig.height).to.equal(1000)
    expect(screenConfig.availTop).to.equal(23)
    expect(screenConfig.availLeft).to.equal(4)
    expect(screenConfig.availRight).to.equal(4)
    expect(screenConfig.availBottom).to.equal(5)
  })

  it('Should be limitted by each property range', () => {
    const screenConfig = new ScreenConfig()

    screenConfig.width = 1280
    screenConfig.height = 1000
    screenConfig.availTop = -10
    screenConfig.availLeft = -10
    screenConfig.availRight = -10
    screenConfig.availBottom = -10

    expect(screenConfig.width).to.equal(1280)
    expect(screenConfig.height).to.equal(1000)
    expect(screenConfig.availTop).to.equal(0)
    expect(screenConfig.availLeft).to.equal(0)
    expect(screenConfig.availRight).to.equal(0)
    expect(screenConfig.availBottom).to.equal(0)
  })

  it('Should ignore to set invalid property values', () => {
    const screenConfig = new ScreenConfig({
      width: 1000,
      height: 500,
      availTop: 10,
      availLeft: 20,
      availRight: 30,
      availBottom: 40,
    })

    expect(screenConfig.width).to.equal(1000)
    expect(screenConfig.height).to.equal(500)
    expect(screenConfig.availTop).to.equal(10)
    expect(screenConfig.availLeft).to.equal(20)
    expect(screenConfig.availRight).to.equal(30)
    expect(screenConfig.availBottom).to.equal(40)

    screenConfig.width = undefined
    screenConfig.height = null
    screenConfig.availTop = NaN
    screenConfig.availLeft = 'a'
    screenConfig.availRight = []
    screenConfig.availBottom = {}

    expect(screenConfig.width).to.equal(1000)
    expect(screenConfig.height).to.equal(500)
    expect(screenConfig.availTop).to.equal(10)
    expect(screenConfig.availLeft).to.equal(20)
    expect(screenConfig.availRight).to.equal(30)
    expect(screenConfig.availBottom).to.equal(40)
  })

})

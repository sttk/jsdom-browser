'use strict'

const expect = require('chai').expect
const { parseFeatures, applyFeatures } = require('../../src/window/features')
const WindowConfig = require('../../src/window/config')
const ScreenConfig = require('../../src/screen/config')
const Screen = require('../../src/screen')

describe('window/features', () => {

  describe('parseFeatures', () => {

    it('Should return an empty object when an empty string', () => {
      expect(parseFeatures('')).to.deep.equal({})
    })

    it('Should return an empty object when null or undefined', () => {
      expect(parseFeatures(null)).to.deep.equal({})
      expect(parseFeatures(undefined)).to.deep.equal({})
    })

    it('Should return an object which has parsed features',  () => {
      const features = 'left=10,top=20,width=2000,height=500,location=1,' +
                       'menubar=0,resizable=1,scrollbars=0'
      expect(parseFeatures(features)).to.deep.equal({
        left: 10, top: 20, width: 2000, height: 500,
        location: 1, menubar: 0, resizable: 1, scrollbars: 0,
      })
    })

    it('Should support yes/no values', () => {
      const features = 'left=10,width=1024,menubar=yes,resizable=no'
      expect(parseFeatures(features)).to.deep.equal({
        left: 10, width: 1024, menubar: 1, resizable: 0,
      })
      const features2 = 'left=10,width=1024,menubar=Yes,resizable=No'
      expect(parseFeatures(features2)).to.deep.equal({
        left: 10, width: 1024, menubar: 1, resizable: 0,
      })
    })

    it('Should set null if bad value', () => {
      const features = 'left=10,width=aaa,menubar=true,resizable,location='
      expect(parseFeatures(features)).to.deep.equal({
        left: 10, width: null, menubar: null, resizable: undefined,
        location: null,
      })
    })
  })

  describe('applyFeatures', () => {
    const screenConfig = new ScreenConfig()
    const screen = new Screen(screenConfig)
    const windowConfig = new WindowConfig({
      screen, width: 500, height: 400, top: 50, left: 80,
      frame: {
        edgeSize: { top: 70, left: 8, right: 8, bottom: 4 },
        openingShift: { x: 0, y: 0 },
      },
      popup: {
        edgeSize: { top: 40, left: 5, right: 5, bottom: 4 },
        openingShift: { x: 10, y: 10 },
      },
    })

    it('Should update windowConfig.top/.left with features', () => {
      expect(windowConfig.top).to.equal(50)
      expect(windowConfig.left).to.equal(80)
      expect(windowConfig.width).to.equal(500)
      expect(windowConfig.height).to.equal(400)
      expect(windowConfig.isFrameWindow).to.true

      const features = parseFeatures('top=250,left=320')
      applyFeatures(windowConfig, features, false)

      expect(windowConfig.top).to.equal(50)
      expect(windowConfig.left).to.equal(80)
      expect(windowConfig.width).to.equal(500)
      expect(windowConfig.height).to.equal(400)
      expect(windowConfig.isFrameWindow).to.true

      applyFeatures(windowConfig, features, true)

      expect(windowConfig.top).to.equal(250)
      expect(windowConfig.left).to.equal(320)
      expect(windowConfig.width).to.equal(500)
      expect(windowConfig.height).to.equal(400)
      expect(windowConfig.isFrameWindow).to.false
    })

    it('Should update windowConfig.width/.height with features', () => {
      expect(windowConfig.top).to.equal(250)
      expect(windowConfig.left).to.equal(320)
      expect(windowConfig.width).to.equal(500)
      expect(windowConfig.height).to.equal(400)
      expect(windowConfig.isFrameWindow).to.false
      windowConfig.isFrameWindow = true
      expect(windowConfig.isFrameWindow).to.true

      const features = parseFeatures('width=450,height=720')
      applyFeatures(windowConfig, features, false)

      expect(windowConfig.top).to.equal(250)
      expect(windowConfig.left).to.equal(320)
      expect(windowConfig.width).to.equal(500)
      expect(windowConfig.height).to.equal(400)
      expect(windowConfig.isFrameWindow).to.true

      applyFeatures(windowConfig, features, true)

      expect(windowConfig.top).to.equal(260)
      expect(windowConfig.left).to.equal(330)
      expect(windowConfig.width).to.equal(450 + 5 + 5)
      expect(windowConfig.height).to.equal(720 + 40 + 4)
      expect(windowConfig.isFrameWindow).to.false
    })

    it('Should not resize and move when features is empty', () => {
      expect(windowConfig.top).to.equal(260)
      expect(windowConfig.left).to.equal(330)
      expect(windowConfig.width).to.equal(450 + 5 + 5)
      expect(windowConfig.height).to.equal(720 + 40 + 4)
      expect(windowConfig.isFrameWindow).to.false

      const features = parseFeatures('')
      applyFeatures(windowConfig, features, false)

      expect(windowConfig.top).to.equal(270)
      expect(windowConfig.left).to.equal(340)
      expect(windowConfig.width).to.equal(450 + 5 + 5)
      expect(windowConfig.height).to.equal(720 + 40 + 4)
      expect(windowConfig.isFrameWindow).to.false

      applyFeatures(windowConfig, features, true)

      expect(windowConfig.top).to.equal(270)
      expect(windowConfig.left).to.equal(340)
      expect(windowConfig.width).to.equal(450 + 5 + 5)
      expect(windowConfig.height).to.equal(720 + 40 + 4)
      expect(windowConfig.isFrameWindow).to.true
    })

  })

})

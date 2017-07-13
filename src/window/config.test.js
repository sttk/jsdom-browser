'use strict'

/* eslint max-statements: ['error', 100] */

const expect = require('chai').expect
const WindowConfig = require('./config')
const ScreenConfig = require('../screen/config')
const Screen = require('../screen')

describe('window/config', () => {

  describe('constructor', () => {

    it('Should create WindowConfig object with no argument', () => {
      const windowConfig = new WindowConfig()
      expect(windowConfig.screen).to.be.an.instanceof(Screen)
      expect(windowConfig.top).to.equal(0)
      expect(windowConfig.left).to.equal(0)
      expect(windowConfig.width).to.equal(1024)
      expect(windowConfig.height).to.equal(768)
      expect(windowConfig.frame.edgeSize.top).to.equal(0)
      expect(windowConfig.frame.edgeSize.left).to.equal(0)
      expect(windowConfig.frame.edgeSize.right).to.equal(0)
      expect(windowConfig.frame.edgeSize.bottom).to.equal(0)
      expect(windowConfig.frame.minSize.width).to.equal(0)
      expect(windowConfig.frame.minSize.height).to.equal(0)
      expect(windowConfig.frame.minOpeningSize.width).to.equal(0)
      expect(windowConfig.frame.minOpeningSize.height).to.equal(0)
      expect(windowConfig.frame.minResizableSize.width).to.equal(0)
      expect(windowConfig.frame.minResizableSize.height).to.equal(0)
      expect(windowConfig.frame.openingShift.x).to.equal(0)
      expect(windowConfig.frame.openingShift.y).to.equal(0)
      expect(windowConfig.popup.edgeSize.top).to.equal(0)
      expect(windowConfig.popup.edgeSize.left).to.equal(0)
      expect(windowConfig.popup.edgeSize.right).to.equal(0)
      expect(windowConfig.popup.edgeSize.bottom).to.equal(0)
      expect(windowConfig.popup.minSize.width).to.equal(0)
      expect(windowConfig.popup.minSize.height).to.equal(0)
      expect(windowConfig.popup.minOpeningSize.width).to.equal(0)
      expect(windowConfig.popup.minOpeningSize.height).to.equal(0)
      expect(windowConfig.popup.minResizableSize.width).to.equal(0)
      expect(windowConfig.popup.minResizableSize.height).to.equal(0)
      expect(windowConfig.popup.openingShift.x).to.equal(0)
      expect(windowConfig.popup.openingShift.y).to.equal(0)
      expect(windowConfig.zoom).to.equal(1)
      expect(windowConfig.minZoom).to.equal(0.25)
      expect(windowConfig.maxZoom).to.equal(5)
      expect(windowConfig.closed).to.equal(false)
      expect(windowConfig.isFrameWindow).to.equal(true)

      expect(windowConfig.edgeSize.width).to.equal(0)
      expect(windowConfig.edgeSize.height).to.equal(0)
      expect(windowConfig.minSize.width).to.equal(0)
      expect(windowConfig.minSize.height).to.equal(0)
      expect(windowConfig.minOpeningSize.width).to.equal(0)
      expect(windowConfig.minOpeningSize.height).to.equal(0)
      expect(windowConfig.minResizableSize.width).to.equal(0)
      expect(windowConfig.minResizableSize.height).to.equal(0)
      expect(windowConfig.openingShift.x).to.equal(0)
      expect(windowConfig.openingShift.y).to.equal(0)
      expect(windowConfig.isMovableByScript).to.equal(false)
      expect(windowConfig.isResizableByScript).to.equal(false)
    })

    it('Should create WindowConfig object with a plain object', () => {
      const screenConfig = new ScreenConfig()
      screenConfig.width = 1280
      screenConfig.height = 1024
      screenConfig.availTop = 23
      screenConfig.availLeft = 0
      screenConfig.availRight = 0
      screenConfig.availBottom = 0

      const screen = new Screen(screenConfig)

      const windowConfig = new WindowConfig({
        screen, left: 10, top: 20, width: 500, height: 400,
        frame: {
          edgeSize: { top: 11, left: 3, right: 4, bottom: 39 },
          minSize: { width: 30, height: 50 },
          minOpeningSize: { width: 35, height: 55 },
          minResizableSize: { width: 38, height: 58 },
          openingShift: { x: 1, y: 2 },
        },
        popup: {
          edgeSize: { top: 22, left: 13, right: 14, bottom: 29 },
          minSize: { width: 31, height: 51 },
          minOpeningSize: { width: 36, height: 56 },
          minResizableSize: { width: 37, height: 57 },
          openingShift: { x: 11, y: 12 },
        },
        zoom: 1.2, minZoom: 0.1, maxZoom: 10,
        closed: true, isFrameWindow: true,
      })

      expect(windowConfig.screen).to.equal(screen)
      expect(windowConfig.screen.width).to.equal(1280)
      expect(windowConfig.screen.height).to.equal(1024)
      expect(windowConfig.screen.availWidth).to.equal(1280)
      expect(windowConfig.screen.availHeight).to.equal(1001)
      expect(windowConfig.screen.availLeft).to.equal(0)
      expect(windowConfig.screen.availTop).to.equal(23)

      expect(windowConfig.top).to.equal(20)
      expect(windowConfig.left).to.equal(10)
      expect(windowConfig.width).to.equal(500)
      expect(windowConfig.height).to.equal(400)
      expect(windowConfig.frame.edgeSize.top).to.equal(11)
      expect(windowConfig.frame.edgeSize.left).to.equal(3)
      expect(windowConfig.frame.edgeSize.right).to.equal(4)
      expect(windowConfig.frame.edgeSize.bottom).to.equal(39)
      expect(windowConfig.frame.minSize.width).to.equal(30)
      expect(windowConfig.frame.minSize.height).to.equal(50)
      expect(windowConfig.frame.minOpeningSize.width).to.equal(35)
      expect(windowConfig.frame.minOpeningSize.height).to.equal(55)
      expect(windowConfig.frame.minResizableSize.width).to.equal(38)
      expect(windowConfig.frame.minResizableSize.height).to.equal(58)
      expect(windowConfig.frame.openingShift.x).to.equal(1)
      expect(windowConfig.frame.openingShift.y).to.equal(2)
      expect(windowConfig.popup.edgeSize.top).to.equal(22)
      expect(windowConfig.popup.edgeSize.left).to.equal(13)
      expect(windowConfig.popup.edgeSize.right).to.equal(14)
      expect(windowConfig.popup.edgeSize.bottom).to.equal(29)
      expect(windowConfig.popup.minSize.width).to.equal(31)
      expect(windowConfig.popup.minSize.height).to.equal(51)
      expect(windowConfig.popup.minOpeningSize.width).to.equal(36)
      expect(windowConfig.popup.minOpeningSize.height).to.equal(56)
      expect(windowConfig.popup.minResizableSize.width).to.equal(37)
      expect(windowConfig.popup.minResizableSize.height).to.equal(57)
      expect(windowConfig.popup.openingShift.x).to.equal(11)
      expect(windowConfig.popup.openingShift.y).to.equal(12)
      expect(windowConfig.zoom).to.equal(1.2)
      expect(windowConfig.minZoom).to.equal(0.1)
      expect(windowConfig.maxZoom).to.equal(10)
      expect(windowConfig.closed).to.equal(true)
      expect(windowConfig.isFrameWindow).to.equal(true)

      expect(windowConfig.edgeSize.width).to.equal(7)
      expect(windowConfig.edgeSize.height).to.equal(50)
      expect(windowConfig.minSize.width).to.equal(30)
      expect(windowConfig.minSize.height).to.equal(50)
      expect(windowConfig.minOpeningSize.width).to.equal(35)
      expect(windowConfig.minOpeningSize.height).to.equal(55)
      expect(windowConfig.minResizableSize.width).to.equal(38)
      expect(windowConfig.minResizableSize.height).to.equal(58)
      expect(windowConfig.openingShift.x).to.equal(1)
      expect(windowConfig.openingShift.y).to.equal(2)
      expect(windowConfig.isMovableByScript).to.equal(false)
      expect(windowConfig.isResizableByScript).to.equal(false)

      windowConfig.isFrameWindow = false

      expect(windowConfig.edgeSize.width).to.equal(27)
      expect(windowConfig.edgeSize.height).to.equal(51)
      expect(windowConfig.minSize.width).to.equal(31)
      expect(windowConfig.minSize.height).to.equal(51)
      expect(windowConfig.minOpeningSize.width).to.equal(36)
      expect(windowConfig.minOpeningSize.height).to.equal(56)
      expect(windowConfig.minResizableSize.width).to.equal(37)
      expect(windowConfig.minResizableSize.height).to.equal(57)
      expect(windowConfig.openingShift.x).to.equal(11)
      expect(windowConfig.openingShift.y).to.equal(12)
      expect(windowConfig.isMovableByScript).to.equal(true)
      expect(windowConfig.isResizableByScript).to.equal(true)
    })

    it('Should create WindowConfig object with a Window Config', () => {
      const screenConfig = new ScreenConfig()
      screenConfig.width = 1280
      screenConfig.height = 1024
      screenConfig.availTop = 23
      screenConfig.availLeft = 0
      screenConfig.availRight = 0
      screenConfig.availBottom = 0

      const screen = new Screen(screenConfig)

      const windowConfig0 = new WindowConfig({
        screen, left: 10, top: 20, width: 500, height: 400,
        frame: {
          edgeSize: { top: 11, left: 3, right: 4, bottom: 39 },
          minSize: { width: 30, height: 50 },
          minOpeningSize: { width: 35, height: 55 },
          minResizableSize: { width: 38, height: 58 },
          openingShift: { x: 1, y: 2 },
        },
        popup: {
          edgeSize: { top: 22, left: 13, right: 14, bottom: 29 },
          minSize: { width: 31, height: 51 },
          minOpeningSize: { width: 36, height: 56 },
          minResizableSize: { width: 37, height: 57 },
          openingShift: { x: 11, y: 12 },
        },
        zoom: 1.2, minZoom: 0.1, maxZoom: 10,
        closed: true, isFrameWindow: true,
      })

      const windowConfig = new WindowConfig(windowConfig0)

      expect(windowConfig.screen).to.equal(screen)
      expect(windowConfig.screen.width).to.equal(1280)
      expect(windowConfig.screen.height).to.equal(1024)
      expect(windowConfig.screen.availWidth).to.equal(1280)
      expect(windowConfig.screen.availHeight).to.equal(1001)
      expect(windowConfig.screen.availLeft).to.equal(0)
      expect(windowConfig.screen.availTop).to.equal(23)

      expect(windowConfig.top).to.equal(20)
      expect(windowConfig.left).to.equal(10)
      expect(windowConfig.width).to.equal(500)
      expect(windowConfig.height).to.equal(400)
      expect(windowConfig.frame.edgeSize.top).to.equal(11)
      expect(windowConfig.frame.edgeSize.left).to.equal(3)
      expect(windowConfig.frame.edgeSize.right).to.equal(4)
      expect(windowConfig.frame.edgeSize.bottom).to.equal(39)
      expect(windowConfig.frame.minSize.width).to.equal(30)
      expect(windowConfig.frame.minSize.height).to.equal(50)
      expect(windowConfig.frame.minOpeningSize.width).to.equal(35)
      expect(windowConfig.frame.minOpeningSize.height).to.equal(55)
      expect(windowConfig.frame.minResizableSize.width).to.equal(38)
      expect(windowConfig.frame.minResizableSize.height).to.equal(58)
      expect(windowConfig.frame.openingShift.x).to.equal(1)
      expect(windowConfig.frame.openingShift.y).to.equal(2)
      expect(windowConfig.popup.edgeSize.top).to.equal(22)
      expect(windowConfig.popup.edgeSize.left).to.equal(13)
      expect(windowConfig.popup.edgeSize.right).to.equal(14)
      expect(windowConfig.popup.edgeSize.bottom).to.equal(29)
      expect(windowConfig.popup.minSize.width).to.equal(31)
      expect(windowConfig.popup.minSize.height).to.equal(51)
      expect(windowConfig.popup.minOpeningSize.width).to.equal(36)
      expect(windowConfig.popup.minOpeningSize.height).to.equal(56)
      expect(windowConfig.popup.minResizableSize.width).to.equal(37)
      expect(windowConfig.popup.minResizableSize.height).to.equal(57)
      expect(windowConfig.popup.openingShift.x).to.equal(11)
      expect(windowConfig.popup.openingShift.y).to.equal(12)
      expect(windowConfig.zoom).to.equal(1.2)
      expect(windowConfig.minZoom).to.equal(0.1)
      expect(windowConfig.maxZoom).to.equal(10)
      expect(windowConfig.closed).to.equal(true)
      expect(windowConfig.isFrameWindow).to.equal(true)

      expect(windowConfig.edgeSize.width).to.equal(7)
      expect(windowConfig.edgeSize.height).to.equal(50)
      expect(windowConfig.minSize.width).to.equal(30)
      expect(windowConfig.minSize.height).to.equal(50)
      expect(windowConfig.minOpeningSize.width).to.equal(35)
      expect(windowConfig.minOpeningSize.height).to.equal(55)
      expect(windowConfig.minResizableSize.width).to.equal(38)
      expect(windowConfig.minResizableSize.height).to.equal(58)
      expect(windowConfig.openingShift.x).to.equal(1)
      expect(windowConfig.openingShift.y).to.equal(2)
      expect(windowConfig.isMovableByScript).to.equal(false)
      expect(windowConfig.isResizableByScript).to.equal(false)

      windowConfig.isFrameWindow = false

      expect(windowConfig.edgeSize.width).to.equal(27)
      expect(windowConfig.edgeSize.height).to.equal(51)
      expect(windowConfig.minSize.width).to.equal(31)
      expect(windowConfig.minSize.height).to.equal(51)
      expect(windowConfig.minOpeningSize.width).to.equal(36)
      expect(windowConfig.minOpeningSize.height).to.equal(56)
      expect(windowConfig.minResizableSize.width).to.equal(37)
      expect(windowConfig.minResizableSize.height).to.equal(57)
      expect(windowConfig.openingShift.x).to.equal(11)
      expect(windowConfig.openingShift.y).to.equal(12)
      expect(windowConfig.isMovableByScript).to.equal(true)
      expect(windowConfig.isResizableByScript).to.equal(true)
    })
  })

  describe('property accessors', () => {
    const screenConfig = new ScreenConfig()
    const screen = new Screen(screenConfig)
    const windowConfig = new WindowConfig({ screen })

    it('Should not change .screen', () => {
      const screen2 = new Screen(screenConfig)
      expect(screen2).not.to.equal(screen)

      windowConfig.screen = screen2
      expect(windowConfig.screen).to.equal(screen)
      expect(windowConfig.screen).not.to.equal(screen2)
    })

    it('Should change .top/.left/.width/.height', () => {
      windowConfig.top = 50
      expect(windowConfig.top).to.equal(50)

      windowConfig.left = 60
      expect(windowConfig.left).to.equal(60)

      windowConfig.width = 2000
      expect(windowConfig.width).to.equal(2000)

      windowConfig.height = 1500
      expect(windowConfig.height).to.equal(1500)
    })

    it('Should change .edgeSize.*', () => {
      windowConfig.frame.edgeSize.top = 30
      expect(windowConfig.frame.edgeSize.top).to.equal(30)

      windowConfig.frame.edgeSize.left = 31
      expect(windowConfig.frame.edgeSize.left).to.equal(31)

      windowConfig.frame.edgeSize.right = 32
      expect(windowConfig.frame.edgeSize.right).to.equal(32)

      windowConfig.frame.edgeSize.bottom = 33
      expect(windowConfig.frame.edgeSize.bottom).to.equal(33)
    })

    it('Should change .frame.*', () => {
      windowConfig.frame.minSize.width = 34
      expect(windowConfig.frame.minSize.width).to.equal(34)

      windowConfig.frame.minSize.height = 35
      expect(windowConfig.frame.minSize.height).to.equal(35)

      windowConfig.frame.minOpeningSize.width = 36
      expect(windowConfig.frame.minOpeningSize.width).to.equal(36)

      windowConfig.frame.minOpeningSize.height = 37
      expect(windowConfig.frame.minOpeningSize.height).to.equal(37)

      windowConfig.frame.minResizableSize.width = 38
      expect(windowConfig.frame.minResizableSize.width).to.equal(38)

      windowConfig.frame.minResizableSize.height = 39
      expect(windowConfig.frame.minResizableSize.height).to.equal(39)

      windowConfig.frame.openingShift.x = 40
      expect(windowConfig.frame.openingShift.x).to.equal(40)

      windowConfig.frame.openingShift.y = 41
      expect(windowConfig.frame.openingShift.y).to.equal(41)
    })

    it('Should change .popup.*', () => {
      windowConfig.popup.edgeSize.top = 130
      expect(windowConfig.popup.edgeSize.top).to.equal(130)

      windowConfig.popup.edgeSize.left = 131
      expect(windowConfig.popup.edgeSize.left).to.equal(131)

      windowConfig.popup.edgeSize.right = 132
      expect(windowConfig.popup.edgeSize.right).to.equal(132)

      windowConfig.popup.edgeSize.bottom = 133
      expect(windowConfig.popup.edgeSize.bottom).to.equal(133)

      windowConfig.popup.minSize.width = 134
      expect(windowConfig.popup.minSize.width).to.equal(134)

      windowConfig.popup.minSize.height = 135
      expect(windowConfig.popup.minSize.height).to.equal(135)

      windowConfig.popup.minOpeningSize.width = 136
      expect(windowConfig.popup.minOpeningSize.width).to.equal(136)

      windowConfig.popup.minOpeningSize.height = 137
      expect(windowConfig.popup.minOpeningSize.height).to.equal(137)

      windowConfig.popup.minResizableSize.width = 138
      expect(windowConfig.popup.minResizableSize.width).to.equal(138)

      windowConfig.popup.minResizableSize.height = 139
      expect(windowConfig.popup.minResizableSize.height).to.equal(139)

      windowConfig.popup.openingShift.x = 140
      expect(windowConfig.popup.openingShift.x).to.equal(140)

      windowConfig.popup.openingShift.y = 141
      expect(windowConfig.popup.openingShift.y).to.equal(141)
    })

    it('Should change .zoom/.minZoom/.maxZoom', () => {
      windowConfig.zoom = 1.2
      expect(windowConfig.zoom).to.equal(1.2)

      windowConfig.zoom = 0.25
      expect(windowConfig.zoom).to.equal(0.25)

      windowConfig.zoom = 5
      expect(windowConfig.zoom).to.equal(5)
    })

    it('Should change .closed', () => {
      windowConfig.closed = true
      expect(windowConfig.closed).to.equal(true)

      windowConfig.closed = false
      expect(windowConfig.closed).to.equal(false)
    })

    it('Should change .isFrameWindow', () => {
      windowConfig.isFrameWindow = false
      expect(windowConfig.isFrameWindow).to.equal(false)

      windowConfig.isFrameWindow = true
      expect(windowConfig.isFrameWindow).to.equal(true)
    })

    it('Should change .isMovableByScript/.isResizbleByScript', () => {
      windowConfig.isFrameWindow = true
      expect(windowConfig.isMovableByScript).to.equal(false)
      expect(windowConfig.isResizableByScript).to.equal(false)

      windowConfig.isFrameWindow = false
      expect(windowConfig.isMovableByScript).to.equal(true)
      expect(windowConfig.isResizableByScript).to.equal(true)
    })
  })

  describe('property restrictions', () => {
    const screenConfig = new ScreenConfig()
    const screen = new Screen(screenConfig)

    it('Should use .frame.edgeSize.* when .isFrameWindow is true', () => {
      const windowConfig = new WindowConfig({ screen })
      expect(windowConfig.isFrameWindow).to.be.true

      expect(windowConfig.edgeSize.width).to.equal(0)
      expect(windowConfig.edgeSize.height).to.equal(0)
      expect(windowConfig.frame.edgeSize.top).to.equal(0)
      expect(windowConfig.frame.edgeSize.left).to.equal(0)
      expect(windowConfig.frame.edgeSize.right).to.equal(0)
      expect(windowConfig.frame.edgeSize.bottom).to.equal(0)
      expect(windowConfig.popup.edgeSize.top).to.equal(0)
      expect(windowConfig.popup.edgeSize.left).to.equal(0)
      expect(windowConfig.popup.edgeSize.right).to.equal(0)
      expect(windowConfig.popup.edgeSize.bottom).to.equal(0)

      windowConfig.edgeSize.width = 10
      expect(windowConfig.edgeSize.width).to.equal(0)
      expect(windowConfig.frame.edgeSize.left).to.equal(0)
      expect(windowConfig.frame.edgeSize.right).to.equal(0)
      expect(windowConfig.popup.edgeSize.left).to.equal(0)
      expect(windowConfig.popup.edgeSize.right).to.equal(0)

      windowConfig.frame.edgeSize.left = 10
      expect(windowConfig.edgeSize.width).to.equal(10)
      expect(windowConfig.frame.edgeSize.left).to.equal(10)
      expect(windowConfig.frame.edgeSize.right).to.equal(0)
      expect(windowConfig.popup.edgeSize.left).to.equal(0)
      expect(windowConfig.popup.edgeSize.right).to.equal(0)

      windowConfig.popup.edgeSize.left = 50
      expect(windowConfig.edgeSize.width).to.equal(10)
      expect(windowConfig.frame.edgeSize.left).to.equal(10)
      expect(windowConfig.frame.edgeSize.right).to.equal(0)
      expect(windowConfig.popup.edgeSize.left).to.equal(50)
      expect(windowConfig.popup.edgeSize.right).to.equal(0)

      windowConfig.frame.edgeSize.right = 11
      expect(windowConfig.edgeSize.width).to.equal(21)
      expect(windowConfig.frame.edgeSize.left).to.equal(10)
      expect(windowConfig.frame.edgeSize.right).to.equal(11)
      expect(windowConfig.popup.edgeSize.left).to.equal(50)
      expect(windowConfig.popup.edgeSize.right).to.equal(0)

      windowConfig.popup.edgeSize.right = 51
      expect(windowConfig.edgeSize.width).to.equal(21)
      expect(windowConfig.frame.edgeSize.left).to.equal(10)
      expect(windowConfig.frame.edgeSize.right).to.equal(11)
      expect(windowConfig.popup.edgeSize.left).to.equal(50)
      expect(windowConfig.popup.edgeSize.right).to.equal(51)

      windowConfig.edgeSize.height = 20
      expect(windowConfig.edgeSize.height).to.equal(0)
      expect(windowConfig.frame.edgeSize.top).to.equal(0)
      expect(windowConfig.frame.edgeSize.bottom).to.equal(0)
      expect(windowConfig.popup.edgeSize.top).to.equal(0)
      expect(windowConfig.popup.edgeSize.bottom).to.equal(0)

      windowConfig.frame.edgeSize.top = 20
      expect(windowConfig.edgeSize.height).to.equal(20)
      expect(windowConfig.frame.edgeSize.top).to.equal(20)
      expect(windowConfig.frame.edgeSize.bottom).to.equal(0)
      expect(windowConfig.popup.edgeSize.top).to.equal(0)
      expect(windowConfig.popup.edgeSize.bottom).to.equal(0)

      windowConfig.popup.edgeSize.top = 25
      expect(windowConfig.edgeSize.height).to.equal(20)
      expect(windowConfig.frame.edgeSize.top).to.equal(20)
      expect(windowConfig.frame.edgeSize.bottom).to.equal(0)
      expect(windowConfig.popup.edgeSize.top).to.equal(25)
      expect(windowConfig.popup.edgeSize.bottom).to.equal(0)

      windowConfig.frame.edgeSize.bottom = 21
      expect(windowConfig.edgeSize.height).to.equal(41)
      expect(windowConfig.frame.edgeSize.top).to.equal(20)
      expect(windowConfig.frame.edgeSize.bottom).to.equal(21)
      expect(windowConfig.popup.edgeSize.top).to.equal(25)
      expect(windowConfig.popup.edgeSize.bottom).to.equal(0)

      windowConfig.popup.edgeSize.bottom = 26
      expect(windowConfig.edgeSize.height).to.equal(41)
      expect(windowConfig.frame.edgeSize.top).to.equal(20)
      expect(windowConfig.frame.edgeSize.bottom).to.equal(21)
      expect(windowConfig.popup.edgeSize.top).to.equal(25)
      expect(windowConfig.popup.edgeSize.bottom).to.equal(26)
    })

    it('Should use .frame.minSize.* when .isFrameWindow is true', () => {
      const windowConfig = new WindowConfig({ screen })
      expect(windowConfig.isFrameWindow).to.be.true

      expect(windowConfig.minSize.width).to.equal(0)
      expect(windowConfig.minSize.height).to.equal(0)
      expect(windowConfig.frame.minSize.width).to.equal(0)
      expect(windowConfig.frame.minSize.height).to.equal(0)
      expect(windowConfig.popup.minSize.width).to.equal(0)
      expect(windowConfig.popup.minSize.height).to.equal(0)

      windowConfig.minSize.width = 5
      expect(windowConfig.minSize.width).to.equal(5)
      expect(windowConfig.frame.minSize.width).to.equal(5)
      expect(windowConfig.popup.minSize.width).to.equal(0)

      windowConfig.frame.minSize.width = 6
      expect(windowConfig.minSize.width).to.equal(6)
      expect(windowConfig.frame.minSize.width).to.equal(6)
      expect(windowConfig.popup.minSize.width).to.equal(0)

      windowConfig.popup.minSize.width = 11
      expect(windowConfig.minSize.width).to.equal(6)
      expect(windowConfig.frame.minSize.width).to.equal(6)
      expect(windowConfig.popup.minSize.width).to.equal(11)

      windowConfig.minSize.height = 7
      expect(windowConfig.minSize.height).to.equal(7)
      expect(windowConfig.frame.minSize.height).to.equal(7)
      expect(windowConfig.popup.minSize.height).to.equal(0)

      windowConfig.frame.minSize.height = 8
      expect(windowConfig.minSize.height).to.equal(8)
      expect(windowConfig.frame.minSize.height).to.equal(8)
      expect(windowConfig.popup.minSize.height).to.equal(0)

      windowConfig.popup.minSize.height = 12
      expect(windowConfig.minSize.height).to.equal(8)
      expect(windowConfig.frame.minSize.height).to.equal(8)
      expect(windowConfig.popup.minSize.height).to.equal(12)
    })

    it('Should use .frame.minOpeningSize.* when .isFrameWindow is true',
    () => {
      const windowConfig = new WindowConfig({ screen })
      expect(windowConfig.isFrameWindow).to.be.true

      expect(windowConfig.minOpeningSize.width).to.equal(0)
      expect(windowConfig.minOpeningSize.height).to.equal(0)
      expect(windowConfig.frame.minOpeningSize.width).to.equal(0)
      expect(windowConfig.frame.minOpeningSize.height).to.equal(0)
      expect(windowConfig.popup.minOpeningSize.width).to.equal(0)
      expect(windowConfig.popup.minOpeningSize.height).to.equal(0)

      windowConfig.minOpeningSize.width = 5
      expect(windowConfig.minOpeningSize.width).to.equal(5)
      expect(windowConfig.frame.minOpeningSize.width).to.equal(5)
      expect(windowConfig.popup.minOpeningSize.width).to.equal(0)

      windowConfig.frame.minOpeningSize.width = 6
      expect(windowConfig.minOpeningSize.width).to.equal(6)
      expect(windowConfig.frame.minOpeningSize.width).to.equal(6)
      expect(windowConfig.popup.minOpeningSize.width).to.equal(0)

      windowConfig.popup.minOpeningSize.width = 16
      expect(windowConfig.minOpeningSize.width).to.equal(6)
      expect(windowConfig.frame.minOpeningSize.width).to.equal(6)
      expect(windowConfig.popup.minOpeningSize.width).to.equal(16)

      windowConfig.minOpeningSize.height = 7
      expect(windowConfig.minOpeningSize.height).to.equal(7)
      expect(windowConfig.frame.minOpeningSize.height).to.equal(7)
      expect(windowConfig.popup.minOpeningSize.height).to.equal(0)

      windowConfig.frame.minOpeningSize.height = 8
      expect(windowConfig.minOpeningSize.height).to.equal(8)
      expect(windowConfig.frame.minOpeningSize.height).to.equal(8)
      expect(windowConfig.popup.minOpeningSize.height).to.equal(0)

      windowConfig.popup.minOpeningSize.height = 18
      expect(windowConfig.minOpeningSize.height).to.equal(8)
      expect(windowConfig.frame.minOpeningSize.height).to.equal(8)
      expect(windowConfig.popup.minOpeningSize.height).to.equal(18)
    })

    it('Should use .frame.minResizableSize.* when .isFrameWindow is true',
    () => {
      const windowConfig = new WindowConfig({ screen })
      expect(windowConfig.isFrameWindow).to.be.true

      expect(windowConfig.minResizableSize.width).to.equal(0)
      expect(windowConfig.minResizableSize.height).to.equal(0)
      expect(windowConfig.frame.minResizableSize.width).to.equal(0)
      expect(windowConfig.frame.minResizableSize.height).to.equal(0)
      expect(windowConfig.popup.minResizableSize.width).to.equal(0)
      expect(windowConfig.popup.minResizableSize.height).to.equal(0)

      windowConfig.minResizableSize.width = 5
      expect(windowConfig.minResizableSize.width).to.equal(5)
      expect(windowConfig.frame.minResizableSize.width).to.equal(5)
      expect(windowConfig.popup.minResizableSize.width).to.equal(0)

      windowConfig.frame.minResizableSize.width = 6
      expect(windowConfig.minResizableSize.width).to.equal(6)
      expect(windowConfig.frame.minResizableSize.width).to.equal(6)
      expect(windowConfig.popup.minResizableSize.width).to.equal(0)

      windowConfig.popup.minResizableSize.width = 16
      expect(windowConfig.minResizableSize.width).to.equal(6)
      expect(windowConfig.frame.minResizableSize.width).to.equal(6)
      expect(windowConfig.popup.minResizableSize.width).to.equal(16)

      windowConfig.minResizableSize.height = 7
      expect(windowConfig.minResizableSize.height).to.equal(7)
      expect(windowConfig.frame.minResizableSize.height).to.equal(7)
      expect(windowConfig.popup.minResizableSize.height).to.equal(0)

      windowConfig.frame.minResizableSize.height = 8
      expect(windowConfig.minResizableSize.height).to.equal(8)
      expect(windowConfig.frame.minResizableSize.height).to.equal(8)
      expect(windowConfig.popup.minResizableSize.height).to.equal(0)

      windowConfig.popup.minResizableSize.height = 18
      expect(windowConfig.minResizableSize.height).to.equal(8)
      expect(windowConfig.frame.minResizableSize.height).to.equal(8)
      expect(windowConfig.popup.minResizableSize.height).to.equal(18)
    })

    it('Should use .frame.openingShift.* when .isFrameWindow is true', () => {
      const windowConfig = new WindowConfig({ screen })
      expect(windowConfig.isFrameWindow).to.be.true

      expect(windowConfig.openingShift.x).to.equal(0)
      expect(windowConfig.openingShift.y).to.equal(0)
      expect(windowConfig.frame.openingShift.x).to.equal(0)
      expect(windowConfig.frame.openingShift.y).to.equal(0)
      expect(windowConfig.popup.openingShift.x).to.equal(0)
      expect(windowConfig.popup.openingShift.y).to.equal(0)

      windowConfig.openingShift.x = 5
      expect(windowConfig.openingShift.x).to.equal(5)
      expect(windowConfig.frame.openingShift.x).to.equal(5)
      expect(windowConfig.popup.openingShift.x).to.equal(0)

      windowConfig.frame.openingShift.x = 6
      expect(windowConfig.openingShift.x).to.equal(6)
      expect(windowConfig.frame.openingShift.x).to.equal(6)
      expect(windowConfig.popup.openingShift.x).to.equal(0)

      windowConfig.popup.openingShift.x = 16
      expect(windowConfig.openingShift.x).to.equal(6)
      expect(windowConfig.frame.openingShift.x).to.equal(6)
      expect(windowConfig.popup.openingShift.x).to.equal(16)


      windowConfig.openingShift.y = 7
      expect(windowConfig.openingShift.y).to.equal(7)
      expect(windowConfig.frame.openingShift.y).to.equal(7)
      expect(windowConfig.popup.openingShift.y).to.equal(0)

      windowConfig.frame.openingShift.y = 8
      expect(windowConfig.openingShift.y).to.equal(8)
      expect(windowConfig.frame.openingShift.y).to.equal(8)
      expect(windowConfig.popup.openingShift.y).to.equal(0)

      windowConfig.popup.openingShift.y = 18
      expect(windowConfig.openingShift.y).to.equal(8)
      expect(windowConfig.frame.openingShift.y).to.equal(8)
      expect(windowConfig.popup.openingShift.y).to.equal(18)
    })

    it('Should use .popup.edgeSize.* when .isFrameWindow is true', () => {
      const windowConfig = new WindowConfig({ screen })
      windowConfig.isFrameWindow = false
      expect(windowConfig.isFrameWindow).to.be.false

      expect(windowConfig.edgeSize.width).to.equal(0)
      expect(windowConfig.edgeSize.height).to.equal(0)
      expect(windowConfig.frame.edgeSize.left).to.equal(0)
      expect(windowConfig.frame.edgeSize.right).to.equal(0)
      expect(windowConfig.frame.edgeSize.top).to.equal(0)
      expect(windowConfig.frame.edgeSize.bottom).to.equal(0)
      expect(windowConfig.popup.edgeSize.left).to.equal(0)
      expect(windowConfig.popup.edgeSize.right).to.equal(0)
      expect(windowConfig.popup.edgeSize.top).to.equal(0)
      expect(windowConfig.popup.edgeSize.bottom).to.equal(0)

      windowConfig.edgeSize.width = 10
      expect(windowConfig.edgeSize.width).to.equal(0)
      expect(windowConfig.frame.edgeSize.left).to.equal(0)
      expect(windowConfig.frame.edgeSize.right).to.equal(0)
      expect(windowConfig.popup.edgeSize.left).to.equal(0)
      expect(windowConfig.popup.edgeSize.right).to.equal(0)

      windowConfig.frame.edgeSize.left = 10
      expect(windowConfig.edgeSize.width).to.equal(0)
      expect(windowConfig.frame.edgeSize.left).to.equal(10)
      expect(windowConfig.frame.edgeSize.right).to.equal(0)
      expect(windowConfig.popup.edgeSize.left).to.equal(0)
      expect(windowConfig.popup.edgeSize.right).to.equal(0)

      windowConfig.popup.edgeSize.left = 50
      expect(windowConfig.edgeSize.width).to.equal(50)
      expect(windowConfig.frame.edgeSize.left).to.equal(10)
      expect(windowConfig.frame.edgeSize.right).to.equal(0)
      expect(windowConfig.popup.edgeSize.left).to.equal(50)
      expect(windowConfig.popup.edgeSize.right).to.equal(0)

      windowConfig.frame.edgeSize.right = 11
      expect(windowConfig.edgeSize.width).to.equal(50)
      expect(windowConfig.frame.edgeSize.left).to.equal(10)
      expect(windowConfig.frame.edgeSize.right).to.equal(11)
      expect(windowConfig.popup.edgeSize.left).to.equal(50)
      expect(windowConfig.popup.edgeSize.right).to.equal(0)

      windowConfig.popup.edgeSize.right = 51
      expect(windowConfig.edgeSize.width).to.equal(101)
      expect(windowConfig.frame.edgeSize.left).to.equal(10)
      expect(windowConfig.frame.edgeSize.right).to.equal(11)
      expect(windowConfig.popup.edgeSize.left).to.equal(50)
      expect(windowConfig.popup.edgeSize.right).to.equal(51)

      windowConfig.edgeSize.height = 10
      expect(windowConfig.edgeSize.height).to.equal(0)
      expect(windowConfig.frame.edgeSize.top).to.equal(0)
      expect(windowConfig.frame.edgeSize.bottom).to.equal(0)
      expect(windowConfig.popup.edgeSize.top).to.equal(0)
      expect(windowConfig.popup.edgeSize.bottom).to.equal(0)

      windowConfig.frame.edgeSize.top = 10
      expect(windowConfig.edgeSize.height).to.equal(0)
      expect(windowConfig.frame.edgeSize.top).to.equal(10)
      expect(windowConfig.frame.edgeSize.bottom).to.equal(0)
      expect(windowConfig.popup.edgeSize.top).to.equal(0)
      expect(windowConfig.popup.edgeSize.bottom).to.equal(0)

      windowConfig.popup.edgeSize.top = 50
      expect(windowConfig.edgeSize.height).to.equal(50)
      expect(windowConfig.frame.edgeSize.top).to.equal(10)
      expect(windowConfig.frame.edgeSize.bottom).to.equal(0)
      expect(windowConfig.popup.edgeSize.top).to.equal(50)
      expect(windowConfig.popup.edgeSize.bottom).to.equal(0)

      windowConfig.frame.edgeSize.bottom = 11
      expect(windowConfig.edgeSize.height).to.equal(50)
      expect(windowConfig.frame.edgeSize.top).to.equal(10)
      expect(windowConfig.frame.edgeSize.bottom).to.equal(11)
      expect(windowConfig.popup.edgeSize.top).to.equal(50)
      expect(windowConfig.popup.edgeSize.bottom).to.equal(0)

      windowConfig.popup.edgeSize.bottom = 51
      expect(windowConfig.edgeSize.height).to.equal(101)
      expect(windowConfig.frame.edgeSize.top).to.equal(10)
      expect(windowConfig.frame.edgeSize.bottom).to.equal(11)
      expect(windowConfig.popup.edgeSize.top).to.equal(50)
      expect(windowConfig.popup.edgeSize.bottom).to.equal(51)
    })

    it('Should use .popup.minSize.* when .isFrameWindow is true', () => {
      const windowConfig = new WindowConfig({ screen })
      windowConfig.isFrameWindow = false
      expect(windowConfig.isFrameWindow).to.be.false

      expect(windowConfig.minSize.width).to.equal(0)
      expect(windowConfig.minSize.height).to.equal(0)
      expect(windowConfig.frame.minSize.width).to.equal(0)
      expect(windowConfig.frame.minSize.height).to.equal(0)
      expect(windowConfig.popup.minSize.width).to.equal(0)
      expect(windowConfig.popup.minSize.height).to.equal(0)

      windowConfig.minSize.width = 5
      expect(windowConfig.minSize.width).to.equal(5)
      expect(windowConfig.frame.minSize.width).to.equal(0)
      expect(windowConfig.popup.minSize.width).to.equal(5)

      windowConfig.frame.minSize.width = 6
      expect(windowConfig.minSize.width).to.equal(5)
      expect(windowConfig.frame.minSize.width).to.equal(6)
      expect(windowConfig.popup.minSize.width).to.equal(5)

      windowConfig.popup.minSize.width = 11
      expect(windowConfig.minSize.width).to.equal(11)
      expect(windowConfig.frame.minSize.width).to.equal(6)
      expect(windowConfig.popup.minSize.width).to.equal(11)

      windowConfig.minSize.height = 7
      expect(windowConfig.minSize.height).to.equal(7)
      expect(windowConfig.frame.minSize.height).to.equal(0)
      expect(windowConfig.popup.minSize.height).to.equal(7)

      windowConfig.frame.minSize.height = 8
      expect(windowConfig.minSize.height).to.equal(7)
      expect(windowConfig.frame.minSize.height).to.equal(8)
      expect(windowConfig.popup.minSize.height).to.equal(7)

      windowConfig.popup.minSize.height = 12
      expect(windowConfig.minSize.height).to.equal(12)
      expect(windowConfig.frame.minSize.height).to.equal(8)
      expect(windowConfig.popup.minSize.height).to.equal(12)
    })

    it('Should use .popup.minOpeningSize.* when .isFrameWindow is true',
    () => {
      const windowConfig = new WindowConfig({ screen })
      windowConfig.isFrameWindow = false
      expect(windowConfig.isFrameWindow).to.be.false

      expect(windowConfig.minOpeningSize.width).to.equal(0)
      expect(windowConfig.minOpeningSize.height).to.equal(0)
      expect(windowConfig.frame.minOpeningSize.width).to.equal(0)
      expect(windowConfig.frame.minOpeningSize.height).to.equal(0)
      expect(windowConfig.popup.minOpeningSize.width).to.equal(0)
      expect(windowConfig.popup.minOpeningSize.height).to.equal(0)

      windowConfig.minOpeningSize.width = 5
      expect(windowConfig.minOpeningSize.width).to.equal(5)
      expect(windowConfig.frame.minOpeningSize.width).to.equal(0)
      expect(windowConfig.popup.minOpeningSize.width).to.equal(5)

      windowConfig.frame.minOpeningSize.width = 6
      expect(windowConfig.minOpeningSize.width).to.equal(5)
      expect(windowConfig.frame.minOpeningSize.width).to.equal(6)
      expect(windowConfig.popup.minOpeningSize.width).to.equal(5)

      windowConfig.popup.minOpeningSize.width = 16
      expect(windowConfig.minOpeningSize.width).to.equal(16)
      expect(windowConfig.frame.minOpeningSize.width).to.equal(6)
      expect(windowConfig.popup.minOpeningSize.width).to.equal(16)

      windowConfig.minOpeningSize.height = 7
      expect(windowConfig.minOpeningSize.height).to.equal(7)
      expect(windowConfig.frame.minOpeningSize.height).to.equal(0)
      expect(windowConfig.popup.minOpeningSize.height).to.equal(7)

      windowConfig.frame.minOpeningSize.height = 8
      expect(windowConfig.minOpeningSize.height).to.equal(7)
      expect(windowConfig.frame.minOpeningSize.height).to.equal(8)
      expect(windowConfig.popup.minOpeningSize.height).to.equal(7)

      windowConfig.popup.minOpeningSize.height = 18
      expect(windowConfig.minOpeningSize.height).to.equal(18)
      expect(windowConfig.frame.minOpeningSize.height).to.equal(8)
      expect(windowConfig.popup.minOpeningSize.height).to.equal(18)
    })

    it('Should use .popup.minResizableSize.* when .isFrameWindow is true',
    () => {
      const windowConfig = new WindowConfig({ screen })
      windowConfig.isFrameWindow = false
      expect(windowConfig.isFrameWindow).to.be.false

      expect(windowConfig.minResizableSize.width).to.equal(0)
      expect(windowConfig.minResizableSize.height).to.equal(0)
      expect(windowConfig.frame.minResizableSize.width).to.equal(0)
      expect(windowConfig.frame.minResizableSize.height).to.equal(0)
      expect(windowConfig.popup.minResizableSize.width).to.equal(0)
      expect(windowConfig.popup.minResizableSize.height).to.equal(0)

      windowConfig.minResizableSize.width = 5
      expect(windowConfig.minResizableSize.width).to.equal(5)
      expect(windowConfig.frame.minResizableSize.width).to.equal(0)
      expect(windowConfig.popup.minResizableSize.width).to.equal(5)

      windowConfig.frame.minResizableSize.width = 6
      expect(windowConfig.minResizableSize.width).to.equal(5)
      expect(windowConfig.frame.minResizableSize.width).to.equal(6)
      expect(windowConfig.popup.minResizableSize.width).to.equal(5)

      windowConfig.popup.minResizableSize.width = 16
      expect(windowConfig.minResizableSize.width).to.equal(16)
      expect(windowConfig.frame.minResizableSize.width).to.equal(6)
      expect(windowConfig.popup.minResizableSize.width).to.equal(16)

      windowConfig.minResizableSize.height = 7
      expect(windowConfig.minResizableSize.height).to.equal(7)
      expect(windowConfig.frame.minResizableSize.height).to.equal(0)
      expect(windowConfig.popup.minResizableSize.height).to.equal(7)

      windowConfig.frame.minResizableSize.height = 8
      expect(windowConfig.minResizableSize.height).to.equal(7)
      expect(windowConfig.frame.minResizableSize.height).to.equal(8)
      expect(windowConfig.popup.minResizableSize.height).to.equal(7)

      windowConfig.popup.minResizableSize.height = 18
      expect(windowConfig.minResizableSize.height).to.equal(18)
      expect(windowConfig.frame.minResizableSize.height).to.equal(8)
      expect(windowConfig.popup.minResizableSize.height).to.equal(18)
    })

    it('Should use .popup.openingShift.* when .isFrameWindow is true', () => {
      const windowConfig = new WindowConfig({ screen })
      windowConfig.isFrameWindow = false
      expect(windowConfig.isFrameWindow).to.be.false

      expect(windowConfig.openingShift.x).to.equal(0)
      expect(windowConfig.openingShift.y).to.equal(0)
      expect(windowConfig.frame.openingShift.x).to.equal(0)
      expect(windowConfig.frame.openingShift.y).to.equal(0)
      expect(windowConfig.popup.openingShift.x).to.equal(0)
      expect(windowConfig.popup.openingShift.y).to.equal(0)

      windowConfig.openingShift.x = 5
      expect(windowConfig.openingShift.x).to.equal(5)
      expect(windowConfig.frame.openingShift.x).to.equal(0)
      expect(windowConfig.popup.openingShift.x).to.equal(5)

      windowConfig.frame.openingShift.x = 6
      expect(windowConfig.openingShift.x).to.equal(5)
      expect(windowConfig.frame.openingShift.x).to.equal(6)
      expect(windowConfig.popup.openingShift.x).to.equal(5)

      windowConfig.popup.openingShift.x = 16
      expect(windowConfig.openingShift.x).to.equal(16)
      expect(windowConfig.frame.openingShift.x).to.equal(6)
      expect(windowConfig.popup.openingShift.x).to.equal(16)

      windowConfig.openingShift.y = 7
      expect(windowConfig.openingShift.y).to.equal(7)
      expect(windowConfig.frame.openingShift.y).to.equal(0)
      expect(windowConfig.popup.openingShift.y).to.equal(7)

      windowConfig.frame.openingShift.y = 8
      expect(windowConfig.openingShift.y).to.equal(7)
      expect(windowConfig.frame.openingShift.y).to.equal(8)
      expect(windowConfig.popup.openingShift.y).to.equal(7)

      windowConfig.popup.openingShift.y = 18
      expect(windowConfig.openingShift.y).to.equal(18)
      expect(windowConfig.frame.openingShift.y).to.equal(8)
      expect(windowConfig.popup.openingShift.y).to.equal(18)
    })

    it('Should limit .width/.height with .minSize', () => {
      const windowConfig = new WindowConfig({ screen })

      expect(windowConfig.minSize.width).to.equal(0)
      expect(windowConfig.minSize.height).to.equal(0)
      expect(windowConfig.width).to.equal(1024)
      expect(windowConfig.height).to.equal(768)

      windowConfig.minSize.width = 50
      windowConfig.minSize.height = 60

      expect(windowConfig.minSize.width).to.equal(50)
      expect(windowConfig.minSize.height).to.equal(60)
      expect(windowConfig.width).to.equal(1024)
      expect(windowConfig.height).to.equal(768)

      windowConfig.width = 10
      windowConfig.height = 20

      expect(windowConfig.minSize.width).to.equal(50)
      expect(windowConfig.minSize.height).to.equal(60)
      expect(windowConfig.width).to.equal(50)
      expect(windowConfig.height).to.equal(60)

      windowConfig.minSize.width = 150
      windowConfig.minSize.height = 160

      expect(windowConfig.minSize.width).to.equal(150)
      expect(windowConfig.minSize.height).to.equal(160)
      expect(windowConfig.width).to.equal(150)
      expect(windowConfig.height).to.equal(160)
    })

    it('Should limit .zoom with .minZoom and .maxZoom', () => {
      const windowConfig = new WindowConfig({ screen })

      expect(windowConfig.zoom).to.equal(1)
      expect(windowConfig.minZoom).to.equal(0.25)
      expect(windowConfig.maxZoom).to.equal(5)

      windowConfig.zoom = 0
      expect(windowConfig.zoom).to.equal(0.25)
      expect(windowConfig.minZoom).to.equal(0.25)
      expect(windowConfig.maxZoom).to.equal(5)

      windowConfig.zoom = 10
      expect(windowConfig.zoom).to.equal(5)
      expect(windowConfig.minZoom).to.equal(0.25)
      expect(windowConfig.maxZoom).to.equal(5)

      windowConfig.zoom = 0.3
      expect(windowConfig.zoom).to.equal(0.3)
      expect(windowConfig.minZoom).to.equal(0.25)
      expect(windowConfig.maxZoom).to.equal(5)

      windowConfig.minZoom = 0.4
      expect(windowConfig.zoom).to.equal(0.4)
      expect(windowConfig.minZoom).to.equal(0.4)
      expect(windowConfig.maxZoom).to.equal(5)

      windowConfig.minZoom = 0
      expect(windowConfig.zoom).to.equal(0.4)
      expect(windowConfig.minZoom).to.equal(0.01)
      expect(windowConfig.maxZoom).to.equal(5)

      windowConfig.zoom = 4
      expect(windowConfig.zoom).to.equal(4)
      expect(windowConfig.minZoom).to.equal(0.01)
      expect(windowConfig.maxZoom).to.equal(5)

      windowConfig.maxZoom = 2
      expect(windowConfig.zoom).to.equal(2)
      expect(windowConfig.minZoom).to.equal(0.01)
      expect(windowConfig.maxZoom).to.equal(2)

      windowConfig.maxZoom = 0
      expect(windowConfig.zoom).to.equal(1)
      expect(windowConfig.minZoom).to.equal(0.01)
      expect(windowConfig.maxZoom).to.equal(1)

      windowConfig.maxZoom = 200
      expect(windowConfig.zoom).to.equal(1)
      expect(windowConfig.minZoom).to.equal(0.01)
      expect(windowConfig.maxZoom).to.equal(100)

      windowConfig.$private.zoom = 0
      expect(windowConfig.zoom).to.equal(1)
      expect(windowConfig.minZoom).to.equal(0.01)
      expect(windowConfig.maxZoom).to.equal(100)
    })
  })

  describe('event emitting and handling', () => {
    const windowConfig = new WindowConfig()
    const callCount = { on: 0, once: 0 }

    windowConfig.on('event1', (a, b, c) => {
      expect(a).to.equal('A')
      expect(b).to.equal('B')
      expect(c).to.equal('C')
      callCount.on ++
    })
    windowConfig.once('event1', (a, b, c) => {
      expect(a).to.equal('A')
      expect(b).to.equal('B')
      expect(c).to.equal('C')
      callCount.once ++
    })

    windowConfig.$events.emit('event1', 'A', 'B', 'C')
    windowConfig.$events.emit('event1', 'A', 'B', 'C')
    windowConfig.$events.emit('event1', 'A', 'B', 'C')
    windowConfig.$events.emit('event1', 'A', 'B', 'C')

    expect(callCount.on).to.equal(4)
    expect(callCount.once).to.equal(1)
  })

})

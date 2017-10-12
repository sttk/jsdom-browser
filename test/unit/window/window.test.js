'use strict'

const expect = require('chai').expect
const WindowConfig = require('../../../src/window/config')
const ScreenConfig = require('../../../src/screen/config')
const Screen = require('../../../src/screen')
const { JSDOM } = require('jsdom')

describe('window', () => {

  describe('interface', () => {
    const screenConfig = new ScreenConfig()
    const screen = new Screen(screenConfig)
    const windowConfig = new WindowConfig({ screen })
    const window = new JSDOM().window
    windowConfig.configure(window)

    it('.screen', () => {
      expect(window.screen).to.equal(screen)

      const screen2 = new Screen(screenConfig)
      window.screen = screen2
      expect(window.screen).to.equal(screen2)

      delete window.screen
      expect(window.screen).to.be.undefined
    })

    it('.innerWidth', () => {
      expect(window.innerWidth).to.equal(1024)
      expect(windowConfig.edgeSize.width).to.equal(0)
      expect(windowConfig.isFrameWindow).to.be.true

      windowConfig.frame.edgeSize.left = 5

      expect(window.innerWidth).to.equal(1019)
      expect(windowConfig.edgeSize.width).to.equal(5)

      windowConfig.frame.edgeSize.right = 6

      expect(window.innerWidth).to.equal(1013)
      expect(windowConfig.edgeSize.width).to.equal(11)

      window.innerWidth = 1000

      expect(window.innerWidth).to.equal(1000)
      expect(windowConfig.edgeSize.width).to.equal(11)

      delete window.innerWidth
      expect(window.innerWidth).to.be.undefined
      expect(windowConfig.edgeSize.width).to.equal(11)
    })

    it('.innerHeight', () => {
      expect(window.innerHeight).to.equal(768)
      expect(windowConfig.edgeSize.height).to.equal(0)
      expect(windowConfig.isFrameWindow).to.be.true

      windowConfig.frame.edgeSize.top = 5

      expect(window.innerHeight).to.equal(763)
      expect(windowConfig.edgeSize.height).to.equal(5)

      windowConfig.frame.edgeSize.bottom = 40

      expect(window.innerHeight).to.equal(723)
      expect(windowConfig.edgeSize.height).to.equal(45)

      window.innerHeight = 1000

      expect(window.innerHeight).to.equal(1000)
      expect(windowConfig.edgeSize.height).to.equal(45)

      delete window.innerHeight
      expect(window.innerHeight).to.be.undefined
      expect(windowConfig.edgeSize.height).to.equal(45)
    })

    it('.scrollX/.pageXOffset', () => {
      expect(window.scrollX).to.equal(0)
      expect(window.pageXOffset).to.equal(0)
      expect(window.document.body.scrollLeft).to.equal(0)

      window.document.body.scrollLeft = 100

      expect(window.scrollX).to.equal(100)
      expect(window.pageXOffset).to.equal(100)
      expect(window.document.body.scrollLeft).to.equal(100)

      window.scrollX = 200

      expect(window.scrollX).to.equal(200)
      expect(window.pageXOffset).to.equal(100)
      expect(window.document.body.scrollLeft).to.equal(100)

      window.pageXOffset = 201

      expect(window.scrollX).to.equal(200)
      expect(window.pageXOffset).to.equal(201)
      expect(window.document.body.scrollLeft).to.equal(100)

      delete window.scrollX
      expect(window.scrollX).to.be.undefined
      expect(window.pageXOffset).to.equal(201)
      expect(window.document.body.scrollLeft).to.equal(100)

      delete window.pageXOffset
      expect(window.scrollX).to.be.undefined
      expect(window.pageXOffset).to.be.undefined
      expect(window.document.body.scrollLeft).to.equal(100)
    })

    it('.scrollY/.pageYOffset', () => {
      expect(window.scrollY).to.equal(0)
      expect(window.pageYOffset).to.equal(0)
      expect(window.document.body.scrollTop).to.equal(0)

      window.document.body.scrollTop = 100

      expect(window.scrollY).to.equal(100)
      expect(window.pageYOffset).to.equal(100)
      expect(window.document.body.scrollTop).to.equal(100)

      window.scrollY = 200

      expect(window.scrollY).to.equal(200)
      expect(window.pageYOffset).to.equal(100)
      expect(window.document.body.scrollTop).to.equal(100)

      window.pageYOffset = 201

      expect(window.scrollY).to.equal(200)
      expect(window.pageYOffset).to.equal(201)
      expect(window.document.body.scrollTop).to.equal(100)

      delete window.scrollY
      expect(window.scrollY).to.be.undefined
      expect(window.pageYOffset).to.equal(201)
      expect(window.document.body.scrollTop).to.equal(100)

      delete window.pageYOffset
      expect(window.scrollY).to.be.undefined
      expect(window.pageYOffset).to.be.undefined
      expect(window.document.body.scrollTop).to.equal(100)
    })

    it('.screenX', () => {
      expect(window.screenX).to.equal(0)
      expect(windowConfig.left).to.equal(0)

      windowConfig.left = 10

      expect(window.screenX).to.equal(10)
      expect(windowConfig.left).to.equal(10)

      window.screenX = 20

      expect(window.screenX).to.equal(20)
      expect(windowConfig.left).to.equal(10)

      delete window.screenX
      expect(window.screenX).to.be.undefined
      expect(windowConfig.left).to.equal(10)
    })

    it('.screenY', () => {
      expect(window.screenY).to.equal(0)
      expect(windowConfig.top).to.equal(0)

      windowConfig.top = 20

      expect(window.screenY).to.equal(20)
      expect(windowConfig.top).to.equal(20)

      window.screenY = 30

      expect(window.screenY).to.equal(30)
      expect(windowConfig.top).to.equal(20)

      delete window.screenY
      expect(window.screenY).to.be.undefined
      expect(windowConfig.top).to.equal(20)
    })

    it('.outerWidth', () => {
      expect(window.outerWidth).to.equal(1024)
      expect(windowConfig.width).to.equal(1024)

      windowConfig.width = 1280

      expect(window.outerWidth).to.equal(1280)
      expect(windowConfig.width).to.equal(1280)

      window.outerWidth = 1196

      expect(window.outerWidth).to.equal(1196)
      expect(windowConfig.width).to.equal(1280)

      delete window.outerWidth
      expect(window.outerWidth).to.be.undefined
      expect(windowConfig.width).to.equal(1280)
    })

    it('.outerHeight', () => {
      expect(window.outerHeight).to.equal(768)
      expect(windowConfig.height).to.equal(768)

      windowConfig.height = 1000

      expect(window.outerHeight).to.equal(1000)
      expect(windowConfig.height).to.equal(1000)

      window.outerHeight = 1024

      expect(window.outerHeight).to.equal(1024)
      expect(windowConfig.height).to.equal(1000)

      delete window.outerHeight
      expect(window.outerHeight).to.be.undefined
      expect(windowConfig.height).to.equal(1000)
    })

    it('.devicePixelRatio', () => {
      expect(window.devicePixelRatio).to.equal(1)
      expect(windowConfig.zoom).to.equal(1)

      windowConfig.zoom = 2

      expect(window.devicePixelRatio).to.equal(2)
      expect(windowConfig.zoom).to.equal(2)

      window.devicePixelRatio = 3

      expect(window.devicePixelRatio).to.equal(3)
      expect(windowConfig.zoom).to.equal(2)

      delete window.devicePixelRatio
      expect(window.devicePixelRatio).to.be.undefined
      expect(windowConfig.zoom).to.equal(2)
    })
  })

  describe('zooming', () => {
    const screenConfig = new ScreenConfig()
    const screen = new Screen(screenConfig)
    const windowConfig = new WindowConfig({ screen })
    const window = new JSDOM().window
    windowConfig.configure(window)

    windowConfig.frame.edgeSize.top = 74
    windowConfig.left = 114
    windowConfig.top = 58
    windowConfig.width = 750
    windowConfig.height = 500
    window.document.body.scrollLeft = 50
    window.document.body.scrollTop = 116

    it('.screen properties are not changed.', () => {
      expect(windowConfig.zoom).to.equal(1)
      expect(window.devicePixelRatio).to.equal(1)
      expect(window.screen.width).to.equal(1024)
      expect(window.screen.height).to.equal(768)
      expect(window.screen.availTop).to.equal(0)
      expect(window.screen.availLeft).to.equal(0)
      expect(window.screen.availWidth).to.equal(1024)
      expect(window.screen.availHeight).to.equal(768)
      expect(window.screen.pixelDepth).to.equal(24)
      expect(window.screen.colorDepth).to.equal(24)

      windowConfig.zoom = 1.25

      expect(windowConfig.zoom).to.equal(1.25)
      expect(window.devicePixelRatio).to.equal(1.25)
      expect(window.screen.width).to.equal(1024)
      expect(window.screen.height).to.equal(768)
      expect(window.screen.availTop).to.equal(0)
      expect(window.screen.availLeft).to.equal(0)
      expect(window.screen.availWidth).to.equal(1024)
      expect(window.screen.availHeight).to.equal(768)
      expect(window.screen.pixelDepth).to.equal(24)
      expect(window.screen.colorDepth).to.equal(24)

      windowConfig.zoom = 1
    })

    it('.innerWidth/.innerHeight are changed', () => {
      expect(windowConfig.zoom).to.equal(1)
      expect(window.devicePixelRatio).to.equal(1)
      expect(window.innerWidth).to.equal(750)
      expect(window.innerHeight).to.equal(426)

      windowConfig.zoom = 1.25

      expect(windowConfig.zoom).to.equal(1.25)
      expect(window.devicePixelRatio).to.equal(1.25)
      expect(window.innerWidth).to.equal(600)
      expect(window.innerHeight).to.equal(341)

      windowConfig.zoom = 1
    })

    it('.scrollX/.scrollY/.pageXOffset/.pageYOffset not changed', () => {
      expect(windowConfig.zoom).to.equal(1)
      expect(window.devicePixelRatio).to.equal(1)
      expect(window.scrollX).to.equal(50)
      expect(window.scrollY).to.equal(116)
      expect(window.pageXOffset).to.equal(50)
      expect(window.pageYOffset).to.equal(116)


      windowConfig.zoom = 1.25

      expect(windowConfig.zoom).to.equal(1.25)
      expect(window.devicePixelRatio).to.equal(1.25)
      expect(window.scrollX).to.equal(50)
      expect(window.scrollY).to.equal(116)
      expect(window.pageXOffset).to.equal(50)
      expect(window.pageYOffset).to.equal(116)

      windowConfig.zoom = 1
    })

    it('.screenX/.screenY are not changed', () => {
      expect(windowConfig.zoom).to.equal(1)
      expect(window.devicePixelRatio).to.equal(1)
      expect(window.screenX).to.equal(114)
      expect(window.screenY).to.equal(58)

      windowConfig.zoom = 1.25

      expect(windowConfig.zoom).to.equal(1.25)
      expect(window.devicePixelRatio).to.equal(1.25)
      expect(window.screenX).to.equal(114)
      expect(window.screenY).to.equal(58)

      windowConfig.zoom = 1
    })

    it('.outerWidth/.outerHeight are changed', () => {
      expect(windowConfig.zoom).to.equal(1)
      expect(window.devicePixelRatio).to.equal(1)
      expect(window.outerWidth).to.equal(750)
      expect(window.outerHeight).to.equal(500)

      windowConfig.zoom = 1.25

      expect(windowConfig.zoom).to.equal(1.25)
      expect(window.devicePixelRatio).to.equal(1.25)
      expect(window.outerWidth).to.equal(750)
      expect(window.outerHeight).to.equal(500)

      windowConfig.zoom = 1
    })
  })

  describe('methods', () => {

    describe('.moveTo', () => {
      const screenConfig = new ScreenConfig()
      const screen = new Screen(screenConfig)

      const windowConfig = new WindowConfig({ screen })
      const window = new JSDOM().window.document.defaultView
      windowConfig.configure(window)

      windowConfig.left = 150
      windowConfig.top = 100
      windowConfig.width = 400
      windowConfig.height = 251
      windowConfig.frame.edgeSize.top = 74
      windowConfig.popup.edgeSize.top = 51
      screenConfig.width = 1280
      screenConfig.height = 800
      screenConfig.availTop = 23
      screenConfig.availBottom = 4

      it('Should not move when .isFrameWindow is true', () => {
        expect(windowConfig.isFrameWindow).to.be.true
        expect(windowConfig.isMovableByScript).to.be.false
        expect(windowConfig.isResizableByScript).to.be.false

        expect(window.innerWidth).to.equal(400)
        expect(window.innerHeight).to.equal(177)
        expect(window.outerWidth).to.equal(400)
        expect(window.outerHeight).to.equal(251)
        expect(window.screenX).to.equal(150)
        expect(window.screenY).to.equal(100)
        expect(window.screen.availWidth).to.equal(1280)
        expect(window.screen.availHeight).to.equal(773)
        expect(window.screen.width).to.equal(1280)
        expect(window.screen.height).to.equal(800)
        expect(window.screen.availLeft).to.equal(0)
        expect(window.screen.availTop).to.equal(23)
        expect(window.devicePixelRatio).to.equal(1)

        window.moveTo(100, 100)

        expect(window.innerWidth).to.equal(400)
        expect(window.innerHeight).to.equal(177)
        expect(window.outerWidth).to.equal(400)
        expect(window.outerHeight).to.equal(251)
        expect(window.screenX).to.equal(150)
        expect(window.screenY).to.equal(100)
        expect(window.screen.availWidth).to.equal(1280)
        expect(window.screen.availHeight).to.equal(773)
        expect(window.screen.width).to.equal(1280)
        expect(window.screen.height).to.equal(800)
        expect(window.screen.availLeft).to.equal(0)
        expect(window.screen.availTop).to.equal(23)
        expect(window.devicePixelRatio).to.equal(1)
      })

      it('Should move to specified position', () => {
        windowConfig.isFrameWindow = false
        expect(windowConfig.isFrameWindow).to.be.false
        expect(windowConfig.isMovableByScript).to.be.true

        expect(window.innerWidth).to.equal(400)
        expect(window.innerHeight).to.equal(200)
        expect(window.outerWidth).to.equal(400)
        expect(window.outerHeight).to.equal(251)
        expect(window.screenX).to.equal(150)
        expect(window.screenY).to.equal(100)
        expect(window.screen.availWidth).to.equal(1280)
        expect(window.screen.availHeight).to.equal(773)
        expect(window.screen.width).to.equal(1280)
        expect(window.screen.height).to.equal(800)
        expect(window.screen.availLeft).to.equal(0)
        expect(window.screen.availTop).to.equal(23)
        expect(window.devicePixelRatio).to.equal(1)
        expect(windowConfig.isResizableByScript).to.be.true

        window.moveTo(123, 45)

        expect(window.innerWidth).to.equal(400)
        expect(window.innerHeight).to.equal(200)
        expect(window.outerWidth).to.equal(400)
        expect(window.outerHeight).to.equal(251)
        expect(window.screenX).to.equal(123)
        expect(window.screenY).to.equal(45)
        expect(window.screen.availWidth).to.equal(1280)
        expect(window.screen.availHeight).to.equal(773)
        expect(window.screen.width).to.equal(1280)
        expect(window.screen.height).to.equal(800)
        expect(window.screen.availLeft).to.equal(0)
        expect(window.screen.availTop).to.equal(23)
        expect(window.devicePixelRatio).to.equal(1)
      })

      it('Should move to left-top side if specified left and top are too ' +
      'small', () => {
        window.moveTo(0, 0)

        expect(window.innerWidth).to.equal(400)
        expect(window.innerHeight).to.equal(200)
        expect(window.outerWidth).to.equal(400)
        expect(window.outerHeight).to.equal(251)
        expect(window.screenX).to.equal(0)
        expect(window.screenY).to.equal(23)
        expect(window.screen.availWidth).to.equal(1280)
        expect(window.screen.availHeight).to.equal(773)
        expect(window.screen.width).to.equal(1280)
        expect(window.screen.height).to.equal(800)
        expect(window.screen.availLeft).to.equal(0)
        expect(window.screen.availTop).to.equal(23)
        expect(window.devicePixelRatio).to.equal(1)
      })

      it('Should move to right-bottom side if specified right and bottom ' +
      'are\n\ttoo large', () => {
        window.moveTo(881, 546)

        expect(window.innerWidth).to.equal(400)
        expect(window.innerHeight).to.equal(200)
        expect(window.outerWidth).to.equal(400)
        expect(window.outerHeight).to.equal(251)
        expect(window.screenX).to.equal(880)
        expect(window.screenY).to.equal(545)
        expect(window.screen.availWidth).to.equal(1280)
        expect(window.screen.availHeight).to.equal(773)
        expect(window.screen.width).to.equal(1280)
        expect(window.screen.height).to.equal(800)
        expect(window.screen.availLeft).to.equal(0)
        expect(window.screen.availTop).to.equal(23)
        expect(window.devicePixelRatio).to.equal(1)
      })

    })

    describe('.moveBy', () => {
      const screenConfig = new ScreenConfig()
      const screen = new Screen(screenConfig)
      const windowConfig = new WindowConfig({ screen })
      const window = new JSDOM().window
      windowConfig.configure(window)

      windowConfig.left = 150
      windowConfig.top = 100
      windowConfig.width = 400
      windowConfig.height = 251
      windowConfig.frame.edgeSize.top = 74
      windowConfig.popup.edgeSize.top = 51
      screenConfig.width = 1280
      screenConfig.height = 800
      screenConfig.availTop = 23
      screenConfig.availBottom = 4

      it('Should not move when .isFrameWindow is true', () => {
        expect(windowConfig.isFrameWindow).to.be.true
        expect(windowConfig.isMovableByScript).to.be.false
        expect(windowConfig.isResizableByScript).to.be.false

        expect(window.innerWidth).to.equal(400)
        expect(window.innerHeight).to.equal(177)
        expect(window.outerWidth).to.equal(400)
        expect(window.outerHeight).to.equal(251)
        expect(window.screenX).to.equal(150)
        expect(window.screenY).to.equal(100)
        expect(window.screen.availWidth).to.equal(1280)
        expect(window.screen.availHeight).to.equal(773)
        expect(window.screen.width).to.equal(1280)
        expect(window.screen.height).to.equal(800)
        expect(window.screen.availLeft).to.equal(0)
        expect(window.screen.availTop).to.equal(23)
        expect(window.devicePixelRatio).to.equal(1)

        window.moveBy(10, 20)

        expect(window.innerWidth).to.equal(400)
        expect(window.innerHeight).to.equal(177)
        expect(window.outerWidth).to.equal(400)
        expect(window.outerHeight).to.equal(251)
        expect(window.screenX).to.equal(150)
        expect(window.screenY).to.equal(100)
        expect(window.screen.availWidth).to.equal(1280)
        expect(window.screen.availHeight).to.equal(773)
        expect(window.screen.width).to.equal(1280)
        expect(window.screen.height).to.equal(800)
        expect(window.screen.availLeft).to.equal(0)
        expect(window.screen.availTop).to.equal(23)
        expect(window.devicePixelRatio).to.equal(1)
      })

      it('Should move by specified delta', () => {
        windowConfig.isFrameWindow = false
        expect(windowConfig.isFrameWindow).to.be.false
        expect(windowConfig.isMovableByScript).to.be.true

        expect(window.innerWidth).to.equal(400)
        expect(window.innerHeight).to.equal(200)
        expect(window.outerWidth).to.equal(400)
        expect(window.outerHeight).to.equal(251)
        expect(window.screenX).to.equal(150)
        expect(window.screenY).to.equal(100)
        expect(window.screen.availWidth).to.equal(1280)
        expect(window.screen.availHeight).to.equal(773)
        expect(window.screen.width).to.equal(1280)
        expect(window.screen.height).to.equal(800)
        expect(window.screen.availLeft).to.equal(0)
        expect(window.screen.availTop).to.equal(23)
        expect(window.devicePixelRatio).to.equal(1)
        expect(windowConfig.isResizableByScript).to.be.true

        window.moveBy(10, 20)

        expect(window.innerWidth).to.equal(400)
        expect(window.innerHeight).to.equal(200)
        expect(window.outerWidth).to.equal(400)
        expect(window.outerHeight).to.equal(251)
        expect(window.screenX).to.equal(160)
        expect(window.screenY).to.equal(120)
        expect(window.screen.availWidth).to.equal(1280)
        expect(window.screen.availHeight).to.equal(773)
        expect(window.screen.width).to.equal(1280)
        expect(window.screen.height).to.equal(800)
        expect(window.screen.availLeft).to.equal(0)
        expect(window.screen.availTop).to.equal(23)
        expect(window.devicePixelRatio).to.equal(1)
      })

      it('Should move to left-top side if specified delta is too small',
      () => {
        windowConfig.isFrameWindow = false
        expect(windowConfig.isFrameWindow).to.be.false
        expect(windowConfig.isMovableByScript).to.be.true

        expect(window.innerWidth).to.equal(400)
        expect(window.innerHeight).to.equal(200)
        expect(window.outerWidth).to.equal(400)
        expect(window.outerHeight).to.equal(251)
        expect(window.screenX).to.equal(160)
        expect(window.screenY).to.equal(120)
        expect(window.screen.availWidth).to.equal(1280)
        expect(window.screen.availHeight).to.equal(773)
        expect(window.screen.width).to.equal(1280)
        expect(window.screen.height).to.equal(800)
        expect(window.screen.availLeft).to.equal(0)
        expect(window.screen.availTop).to.equal(23)
        expect(window.devicePixelRatio).to.equal(1)
        expect(windowConfig.isResizableByScript).to.be.true

        window.moveBy(-161, -98)

        expect(window.innerWidth).to.equal(400)
        expect(window.innerHeight).to.equal(200)
        expect(window.outerWidth).to.equal(400)
        expect(window.outerHeight).to.equal(251)
        expect(window.screenX).to.equal(0)
        expect(window.screenY).to.equal(23)
        expect(window.screen.availWidth).to.equal(1280)
        expect(window.screen.availHeight).to.equal(773)
        expect(window.screen.width).to.equal(1280)
        expect(window.screen.height).to.equal(800)
        expect(window.screen.availLeft).to.equal(0)
        expect(window.screen.availTop).to.equal(23)
        expect(window.devicePixelRatio).to.equal(1)
      })

      it('Should move to right-bottom side if specified delta are too large',
      () => {
        windowConfig.isFrameWindow = false
        expect(windowConfig.isFrameWindow).to.be.false
        expect(windowConfig.isMovableByScript).to.be.true

        window.moveBy(500, 400)

        expect(window.innerWidth).to.equal(400)
        expect(window.innerHeight).to.equal(200)
        expect(window.outerWidth).to.equal(400)
        expect(window.outerHeight).to.equal(251)
        expect(window.screenX).to.equal(500)
        expect(window.screenY).to.equal(423)
        expect(window.screen.availWidth).to.equal(1280)
        expect(window.screen.availHeight).to.equal(773)
        expect(window.screen.width).to.equal(1280)
        expect(window.screen.height).to.equal(800)
        expect(window.screen.availLeft).to.equal(0)
        expect(window.screen.availTop).to.equal(23)
        expect(window.devicePixelRatio).to.equal(1)

        window.moveBy(381, 123)

        expect(window.innerWidth).to.equal(400)
        expect(window.innerHeight).to.equal(200)
        expect(window.outerWidth).to.equal(400)
        expect(window.outerHeight).to.equal(251)
        expect(window.screenX).to.equal(880)
        expect(window.screenY).to.equal(545)
        expect(window.screen.availWidth).to.equal(1280)
        expect(window.screen.availHeight).to.equal(773)
        expect(window.screen.width).to.equal(1280)
        expect(window.screen.height).to.equal(800)
        expect(window.screen.availLeft).to.equal(0)
        expect(window.screen.availTop).to.equal(23)
        expect(window.devicePixelRatio).to.equal(1)
      })

    })

    describe('.resizeTo', () => {
      const screenConfig = new ScreenConfig()
      const screen = new Screen(screenConfig)
      const windowConfig = new WindowConfig({ screen })
      const window = new JSDOM().window
      windowConfig.configure(window)

      windowConfig.left = 150
      windowConfig.top = 100
      windowConfig.width = 400
      windowConfig.height = 251
      windowConfig.frame.edgeSize.top = 74
      windowConfig.popup.edgeSize.top = 51
      windowConfig.popup.minResizableSize.width = 110
      windowConfig.popup.minResizableSize.height = 121
      screenConfig.width = 1280
      screenConfig.height = 800
      screenConfig.availTop = 23
      screenConfig.availBottom = 4

      it('Should not resize when .isFrameWindow is true', () => {
        windowConfig.isFrameWindow = true
        expect(windowConfig.isFrameWindow).to.be.true
        expect(windowConfig.isResizableByScript).to.be.false

        expect(window.innerWidth).to.equal(400)
        expect(window.innerHeight).to.equal(177)
        expect(window.outerWidth).to.equal(400)
        expect(window.outerHeight).to.equal(251)
        expect(window.screenX).to.equal(150)
        expect(window.screenY).to.equal(100)
        expect(window.screen.availWidth).to.equal(1280)
        expect(window.screen.availHeight).to.equal(773)
        expect(window.screen.width).to.equal(1280)
        expect(window.screen.height).to.equal(800)
        expect(window.screen.availLeft).to.equal(0)
        expect(window.screen.availTop).to.equal(23)
        expect(window.devicePixelRatio).to.equal(1)

        window.resizeTo(450, 350)

        expect(window.innerWidth).to.equal(400)
        expect(window.innerHeight).to.equal(177)
        expect(window.outerWidth).to.equal(400)
        expect(window.outerHeight).to.equal(251)
        expect(window.screenX).to.equal(150)
        expect(window.screenY).to.equal(100)
        expect(window.screen.availWidth).to.equal(1280)
        expect(window.screen.availHeight).to.equal(773)
        expect(window.screen.width).to.equal(1280)
        expect(window.screen.height).to.equal(800)
        expect(window.screen.availLeft).to.equal(0)
        expect(window.screen.availTop).to.equal(23)
        expect(window.devicePixelRatio).to.equal(1)
      })

      it('Should resize to specified size', () => {
        windowConfig.isFrameWindow = false
        expect(windowConfig.isFrameWindow).to.be.false
        expect(windowConfig.isResizableByScript).to.be.true

        window.resizeTo(450, 350)

        expect(window.innerWidth).to.equal(450)
        expect(window.innerHeight).to.equal(299)
        expect(window.outerWidth).to.equal(450)
        expect(window.outerHeight).to.equal(350)
        expect(window.screenX).to.equal(150)
        expect(window.screenY).to.equal(100)
        expect(window.screen.availWidth).to.equal(1280)
        expect(window.screen.availHeight).to.equal(773)
        expect(window.screen.width).to.equal(1280)
        expect(window.screen.height).to.equal(800)
        expect(window.screen.availLeft).to.equal(0)
        expect(window.screen.availTop).to.equal(23)
        expect(window.devicePixelRatio).to.equal(1)
      })

      it('Should resize to minimum size if specified size is too small',
      () => {
        windowConfig.isFrameWindow = false
        expect(windowConfig.isFrameWindow).to.be.false
        expect(windowConfig.isResizableByScript).to.be.true

        window.resizeTo(-1, 22)

        expect(window.innerWidth).to.equal(110)
        expect(window.innerHeight).to.equal(70)
        expect(window.outerWidth).to.equal(110)
        expect(window.outerHeight).to.equal(121)
        expect(window.screenX).to.equal(150)
        expect(window.screenY).to.equal(100)
        expect(window.screen.availWidth).to.equal(1280)
        expect(window.screen.availHeight).to.equal(773)
        expect(window.screen.width).to.equal(1280)
        expect(window.screen.height).to.equal(800)
        expect(window.screen.availLeft).to.equal(0)
        expect(window.screen.availTop).to.equal(23)
        expect(window.devicePixelRatio).to.equal(1)
      })

      it('Should resize to screen avail size if specified size is too large',
      () => {
        windowConfig.isFrameWindow = false
        expect(windowConfig.isFrameWindow).to.be.false
        expect(windowConfig.isResizableByScript).to.be.true

        window.resizeTo(1281, 774)

        expect(window.innerWidth).to.equal(1280)
        expect(window.innerHeight).to.equal(722)
        expect(window.outerWidth).to.equal(1280)
        expect(window.outerHeight).to.equal(773)
        expect(window.screenX).to.equal(0)
        expect(window.screenY).to.equal(23)
        expect(window.screen.availWidth).to.equal(1280)
        expect(window.screen.availHeight).to.equal(773)
        expect(window.screen.width).to.equal(1280)
        expect(window.screen.height).to.equal(800)
        expect(window.screen.availLeft).to.equal(0)
        expect(window.screen.availTop).to.equal(23)
        expect(window.devicePixelRatio).to.equal(1)
      })
    })

    describe('.resizeBy', () => {
      const screenConfig = new ScreenConfig()
      const screen = new Screen(screenConfig)
      const windowConfig = new WindowConfig({ screen })
      const window = new JSDOM().window
      windowConfig.configure(window)

      windowConfig.left = 150
      windowConfig.top = 100
      windowConfig.width = 400
      windowConfig.height = 251
      windowConfig.frame.edgeSize.top = 74
      windowConfig.popup.edgeSize.top = 51
      windowConfig.popup.minResizableSize.width = 110
      windowConfig.popup.minResizableSize.height = 121
      screenConfig.width = 1280
      screenConfig.height = 800
      screenConfig.availTop = 23
      screenConfig.availBottom = 4

      it('Should not resize when .isFrameWindow is true', () => {
        windowConfig.isFrameWindow = true
        expect(windowConfig.isFrameWindow).to.be.true
        expect(windowConfig.isResizableByScript).to.be.false

        expect(window.innerWidth).to.equal(400)
        expect(window.innerHeight).to.equal(177)
        expect(window.outerWidth).to.equal(400)
        expect(window.outerHeight).to.equal(251)
        expect(window.screenX).to.equal(150)
        expect(window.screenY).to.equal(100)
        expect(window.screen.availWidth).to.equal(1280)
        expect(window.screen.availHeight).to.equal(773)
        expect(window.screen.width).to.equal(1280)
        expect(window.screen.height).to.equal(800)
        expect(window.screen.availLeft).to.equal(0)
        expect(window.screen.availTop).to.equal(23)
        expect(window.devicePixelRatio).to.equal(1)

        window.resizeBy(50, 99)

        expect(window.innerWidth).to.equal(400)
        expect(window.innerHeight).to.equal(177)
        expect(window.outerWidth).to.equal(400)
        expect(window.outerHeight).to.equal(251)
        expect(window.screenX).to.equal(150)
        expect(window.screenY).to.equal(100)
        expect(window.screen.availWidth).to.equal(1280)
        expect(window.screen.availHeight).to.equal(773)
        expect(window.screen.width).to.equal(1280)
        expect(window.screen.height).to.equal(800)
        expect(window.screen.availLeft).to.equal(0)
        expect(window.screen.availTop).to.equal(23)
        expect(window.devicePixelRatio).to.equal(1)
      })

      it('Should resize by specified delta', () => {
        windowConfig.isFrameWindow = false
        expect(windowConfig.isFrameWindow).to.be.false
        expect(windowConfig.isResizableByScript).to.be.true

        window.resizeBy(50, 99)

        expect(window.innerWidth).to.equal(450)
        expect(window.innerHeight).to.equal(299)
        expect(window.outerWidth).to.equal(450)
        expect(window.outerHeight).to.equal(350)
        expect(window.screenX).to.equal(150)
        expect(window.screenY).to.equal(100)
        expect(window.screen.availWidth).to.equal(1280)
        expect(window.screen.availHeight).to.equal(773)
        expect(window.screen.width).to.equal(1280)
        expect(window.screen.height).to.equal(800)
        expect(window.screen.availLeft).to.equal(0)
        expect(window.screen.availTop).to.equal(23)
        expect(window.devicePixelRatio).to.equal(1)
      })

      it('Should resize to minimum size if specified delta is too small',
      () => {
        windowConfig.isFrameWindow = false
        expect(windowConfig.isFrameWindow).to.be.false
        expect(windowConfig.isResizableByScript).to.be.true

        window.resizeBy(-341, -230)

        expect(window.innerWidth).to.equal(110)
        expect(window.innerHeight).to.equal(121 - 51)
        expect(window.outerWidth).to.equal(110)
        expect(window.outerHeight).to.equal(121)
        expect(window.screenX).to.equal(150)
        expect(window.screenY).to.equal(100)
        expect(window.screen.availWidth).to.equal(1280)
        expect(window.screen.availHeight).to.equal(773)
        expect(window.screen.width).to.equal(1280)
        expect(window.screen.height).to.equal(800)
        expect(window.screen.availLeft).to.equal(0)
        expect(window.screen.availTop).to.equal(23)
        expect(window.devicePixelRatio).to.equal(1)
      })

      it('Should resize to screen avail size if specified delta is too large',
      () => {
        windowConfig.isFrameWindow = false
        expect(windowConfig.isFrameWindow).to.be.false
        expect(windowConfig.isResizableByScript).to.be.true

        window.resizeBy(1171, 895)

        expect(window.innerWidth).to.equal(1280)
        expect(window.innerHeight).to.equal(722)
        expect(window.outerWidth).to.equal(1280)
        expect(window.outerHeight).to.equal(773)
        expect(window.screenX).to.equal(0)
        expect(window.screenY).to.equal(23)
        expect(window.screen.availWidth).to.equal(1280)
        expect(window.screen.availHeight).to.equal(773)
        expect(window.screen.width).to.equal(1280)
        expect(window.screen.height).to.equal(800)
        expect(window.screen.availLeft).to.equal(0)
        expect(window.screen.availTop).to.equal(23)
        expect(window.devicePixelRatio).to.equal(1)
      })
    })

    describe('.scroll', () => {

      it('Should scroll to specified position', () => {
        const screenConfig = new ScreenConfig()
        const screen = new Screen(screenConfig)
        const windowConfig = new WindowConfig({ screen })
        const window = new JSDOM().window
        windowConfig.configure(window)

        expect(window.pageXOffset).to.equal(0)
        expect(window.pageYOffset).to.equal(0)
        expect(window.scrollX).to.equal(0)
        expect(window.scrollY).to.equal(0)
        expect(window.document.body.scrollLeft).to.equal(0)
        expect(window.document.body.scrollTop).to.equal(0)

        window.scroll(10, 20)

        expect(window.pageXOffset).to.equal(10)
        expect(window.pageYOffset).to.equal(20)
        expect(window.scrollX).to.equal(10)
        expect(window.scrollY).to.equal(20)
        expect(window.document.body.scrollLeft).to.equal(10)
        expect(window.document.body.scrollTop).to.equal(20)

        window.scroll(10, 20)

        expect(window.pageXOffset).to.equal(10)
        expect(window.pageYOffset).to.equal(20)
        expect(window.scrollX).to.equal(10)
        expect(window.scrollY).to.equal(20)
        expect(window.document.body.scrollLeft).to.equal(10)
        expect(window.document.body.scrollTop).to.equal(20)
      })
    })

    describe('.scrollTo', () => {
      it('Should scroll to specified position', () => {
        const screenConfig = new ScreenConfig()
        const screen = new Screen(screenConfig)
        const windowConfig = new WindowConfig({ screen })
        const window = new JSDOM().window
        windowConfig.configure(window)

        expect(window.pageXOffset).to.equal(0)
        expect(window.pageYOffset).to.equal(0)
        expect(window.scrollX).to.equal(0)
        expect(window.scrollY).to.equal(0)
        expect(window.document.body.scrollLeft).to.equal(0)
        expect(window.document.body.scrollTop).to.equal(0)

        window.scrollTo(10, 20)

        expect(window.pageXOffset).to.equal(10)
        expect(window.pageYOffset).to.equal(20)
        expect(window.scrollX).to.equal(10)
        expect(window.scrollY).to.equal(20)
        expect(window.document.body.scrollLeft).to.equal(10)
        expect(window.document.body.scrollTop).to.equal(20)

        window.scrollTo(10, 20)

        expect(window.pageXOffset).to.equal(10)
        expect(window.pageYOffset).to.equal(20)
        expect(window.scrollX).to.equal(10)
        expect(window.scrollY).to.equal(20)
        expect(window.document.body.scrollLeft).to.equal(10)
        expect(window.document.body.scrollTop).to.equal(20)
      })
    })

    describe('.scrollBy', () => {
      it('Should scroll by specified delta', () => {
        const screenConfig = new ScreenConfig()
        const screen = new Screen(screenConfig)
        const windowConfig = new WindowConfig({ screen })
        const window = new JSDOM().window
        windowConfig.configure(window)

        expect(window.pageXOffset).to.equal(0)
        expect(window.pageYOffset).to.equal(0)
        expect(window.scrollX).to.equal(0)
        expect(window.scrollY).to.equal(0)
        expect(window.document.body.scrollLeft).to.equal(0)
        expect(window.document.body.scrollTop).to.equal(0)

        window.scrollBy(10, 20)

        expect(window.pageXOffset).to.equal(10)
        expect(window.pageYOffset).to.equal(20)
        expect(window.scrollX).to.equal(10)
        expect(window.scrollY).to.equal(20)
        expect(window.document.body.scrollLeft).to.equal(10)
        expect(window.document.body.scrollTop).to.equal(20)

        window.scrollBy(10, 20)

        expect(window.pageXOffset).to.equal(20)
        expect(window.pageYOffset).to.equal(40)
        expect(window.scrollX).to.equal(20)
        expect(window.scrollY).to.equal(40)
        expect(window.document.body.scrollLeft).to.equal(20)
        expect(window.document.body.scrollTop).to.equal(40)
      })

    })

  })
})


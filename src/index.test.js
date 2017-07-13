'use strict'

const expect = require('chai').expect
const Browser = require('.')

const WindowManager = require('./window/manager')
const ContentManager = require('./window/content')
const WindowConfig = require('./window/config')
const ScreenConfig = require('./screen/config')
const Screen = require('./screen')
const defaultConfig = require('./default')

describe('browser', () => {

  describe('constructor', () => {

    it('Should create a browser with no argument', () => {
      const browser = new Browser()
      expect(browser.windowManager).to.be.instanceof(WindowManager)
      expect(browser.contentManager).to.be.instanceof(ContentManager)
      expect(browser.screenConfig).to.be.instanceof(ScreenConfig)
      expect(browser.windowConfig).to.be.instanceof(WindowConfig)
      expect(browser.windowConfig.screen).to.be.instanceof(Screen)

      expect(browser.screenConfig.width).to.equal(1280)
      expect(browser.screenConfig.height).to.equal(800)
      expect(browser.windowConfig.top).to.equal(80)
      expect(browser.windowConfig.left).to.equal(100)
      expect(browser.windowConfig.width).to.equal(800)
      expect(browser.windowConfig.height).to.equal(600)
    })

    it('Should create a browser with no argument', () => {
      const browser0 = new Browser()
      browser0.screenConfig.width = 2000
      browser0.screenConfig.height = 1600
      browser0.windowConfig.top = 200
      browser0.windowConfig.left = 600
      browser0.windowConfig.width = 1280
      browser0.windowConfig.height = 800

      const browser = new Browser(browser0)
      expect(browser.windowManager).to.be.instanceof(WindowManager)
      expect(browser.contentManager).to.be.instanceof(ContentManager)
      expect(browser.screenConfig).to.be.instanceof(ScreenConfig)
      expect(browser.windowConfig).to.be.instanceof(WindowConfig)
      expect(browser.windowConfig.screen).to.be.instanceof(Screen)

      expect(browser.screenConfig.width).to.equal(2000)
      expect(browser.screenConfig.height).to.equal(1600)
      expect(browser.windowConfig.top).to.equal(200)
      expect(browser.windowConfig.left).to.equal(600)
      expect(browser.windowConfig.width).to.equal(1280)
      expect(browser.windowConfig.height).to.equal(800)
    })

  })

  describe('newWindow/openWindow/addContent', () => {

    it('Should load a page content', done => {
      const content0 = '<div>Hello</div>'
      const content1 = {
        contentData: `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<title>Sample</title>
</head>
<body>
<p>This is a sample page</p>
</body>
</html>
`,
        lastModified: '07/11/2017 11:22:33',
        contentType: 'text/html',
        encoding: 'UTF-8',
      }
      const userAgent = defaultConfig.options.userAgent

      const browser = new Browser()
      browser.addContent('http://hello.com', content0)
      browser.addContent('http://sample.com', content1)

      let counter = 2
      const end = err => {
        if (err || (--counter) <= 0) {
          done(err)
        }
      }

      const window0 = browser.openWindow('http://hello.com')
      const config0 = browser.getConfig(window0)
      config0.on('load', err => {
        expect(window0.readyState, 'complete')
        expect(window0.document.body.innerHTML).to.equal('<div>Hello</div>')
        expect(window0.document.URL).to.equal('http://hello.com/')
        expect(window0.document.charset).to.equal('UTF-8')
        expect(window0.document.lastModified).to.equal(undefined)
        expect(window0.document.referrer).to.equal('')
        expect(window0.location.href).to.equal('http://hello.com/')
        expect(window0.navigator.userAgent).to.equal(userAgent)
        end(err)
      })

      const window1 = browser.openWindow('http://sample.com')
      const config1 = browser.getConfig(window1)
      config1.on('load', err => {
        expect(window1.readyState, 'complete')
        expect(window1.document.body.innerHTML).to.equal(
          '\n<p>This is a sample page</p>\n\n\n')
        expect(window1.document.URL).to.equal('http://sample.com/')
        expect(window1.document.charset).to.equal('UTF-8')
        expect(window1.document.lastModified).to.equal('07/11/2017 11:22:33')
        end(err)
      })
    })

  })

  describe('getWindow', () => {
    const browser = new Browser()
    const win0 = browser.newWindow()
    const win1 = browser.newWindow()
    const win2 = browser.newWindow()

    win0.name = 'w0'
    win1.name = 'w1'
    win2.name = 'w1'

    it('Should get a Window object by index', () => {
      expect(browser.getWindow(0)).to.equal(win0)
      expect(browser.getWindow(1)).to.equal(win1)
      expect(browser.getWindow(2)).to.equal(win2)
    })

    it('Should get a Window object by name', () => {
      expect(browser.getWindow('w0')).to.equal(win0)
      expect(browser.getWindow('w1')).to.equal(win1)

      win1.close()
      expect(browser.getWindow('w0')).to.equal(win0)
      expect(browser.getWindow('w1')).to.equal(win2)
    })

    it('Should get a Window object by a WindowConfig object', () => {
      const cfg0 = browser.getConfig(win0)
      const cfg1 = browser.getConfig(win1)
      const cfg2 = browser.getConfig(win2)

      expect(browser.getWindow(cfg0)).to.equal(win0)
      expect(browser.getWindow(cfg1)).to.equal(win1)
      expect(browser.getWindow(cfg2)).to.equal(win2)
    })
  })

  describe('getConfig', () => {
    it('Should get config objects', () => {
      const browser = new Browser()
      const window0 = browser.newWindow()
      const window1 = browser.newWindow()
      const screen0 = window0.screen
      const screen1 = window1.screen

      expect(window0).not.equal(window1)
      expect(screen0).to.equal(screen1)

      const windowConfig0 = browser.getConfig(window0)
      const windowConfig1 = browser.getConfig(window1)
      const screenConfig0 = browser.getConfig(screen0)
      const screenConfig1 = browser.getConfig(screen1)

      expect(windowConfig0).not.equal(windowConfig1)
      expect(screenConfig0).to.equal(screenConfig1)

      windowConfig0.width = 2000
      expect(window0.outerWidth).to.equal(2000)

      windowConfig1.width = 1500
      expect(window1.outerWidth).to.equal(1500)

      screenConfig0.width = 3000
      expect(screenConfig1.width).to.equal(3000)
      expect(screen0.width).to.equal(3000)
      expect(screen1.width).to.equal(3000)
    })

  })

})

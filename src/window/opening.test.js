'use strict'

/* eslint max-nested-callbacks: ['error', 5],
          max-statements: ['error', 50], max-len: ['error', 100]*/

const expect = require('chai').expect
const { JSDOM } = require('jsdom')
const { configureOpening, newWindow, openWindow } = require('./opening')
const WindowConfig = require('./config')
const WindowManager = require('./manager')
const ContentManager = require('./content')

const windowManager = new WindowManager()
const contentManager = new ContentManager()
const browser = { windowManager, contentManager }

function createWindow () {
  const window = new JSDOM().window
  window.name = 'win-self'
  const config = new WindowConfig()
  config.configure(window)
  windowManager.set(window, config)
  configureOpening(window, browser)

  const parent = new JSDOM().window
  parent.name = 'win-parent'
  window._parent = parent

  const top = new JSDOM().window
  top.name = 'win-top'
  window._top = top

  return window
}

describe('window/opening', () => {

  describe('configureOpening', () => {

    it('Should configure window for open/close', () => {
      const win = createWindow()
      expect(win.closed).to.be.false
      expect(win.close).to.be.a('function')
      expect(win.open).to.be.a('function')
    })

  })

  describe('window.close', () => {

    it('Should close flag is true when closed', () => {
      const win = createWindow()
      expect(win.closed).to.be.false

      win.close()
      expect(win.closed).to.be.true
    })

    it('Should open no window when closed', () => {
      const win = createWindow()
      win.close()
      expect(win.open('about:blank', 'notopened')).to.equal(undefined)
    })

  })

  describe('window.open', () => {

    it('Should open a window : target is "_blank"', done => {
      const win0 = createWindow()
      const win1 = win0.open('about:blank', '_blank')
      expect(win1).to.not.equal(win0)
      expect(win1).to.not.equal(win0.parent)
      expect(win1).to.not.equal(win0.top)
      expect(win1.name).to.equal('')
      expect(win1.closed).to.equal(false)
      expect(win1.document.URL).to.equal('about:blank')
      expect(win1.document.readyState).to.equal('loading')

      const cfg1 = windowManager.getConfig(win1)
      expect(cfg1).to.exist

      cfg1.once('load', (err, win, cfg) => {
        expect(err).not.exist
        expect(win).to.equal(win1)
        expect(cfg).to.equal(cfg)
        expect(win.document.URL).to.equal('about:blank')
        expect(win.document.readyState).to.equal('complete')
        done(err)
      })
    })

    it('Should open a window : target is "_self"', done => {
      const win0 = createWindow()
      const win1 = win0.open('about:blank', '_self')
      expect(win1).to.equal(win0)
      expect(win1).to.not.equal(win0.parent)
      expect(win1).to.not.equal(win0.top)
      expect(win1.name).to.equal('win-self')
      expect(win1.closed).to.equal(false)
      expect(win1.document.URL).to.equal('about:blank')
      expect(win1.document.readyState).to.equal('loading')

      const cfg1 = windowManager.getConfig(win1)
      expect(cfg1).to.exist

      cfg1.once('load', (err, win, cfg) => {
        expect(err).not.exist
        expect(win).to.equal(win1)
        expect(cfg).to.equal(cfg)
        expect(win.document.URL).to.equal('about:blank')
        expect(win.document.readyState).to.equal('complete')
        done(err)
      })
    })

    it('Should open a window : target is "_parent"', done => {
      const win0 = createWindow()
      const win1 = win0.open('about:blank', '_parent')
      expect(win1).to.not.equal(win0)
      expect(win1).to.equal(win0.parent)
      expect(win1).to.not.equal(win0.top)
      expect(win1.name).to.equal('win-parent')
      expect(win1.closed).to.equal(false)
      expect(win1.document.URL).to.equal('about:blank')
      expect(win1.document.readyState).to.equal('loading')

      const cfg1 = windowManager.getConfig(win1)
      expect(cfg1).to.exist

      cfg1.once('load', (err, win, cfg) => {
        expect(err).not.exist
        expect(win).to.equal(win1)
        expect(cfg).to.equal(cfg)
        expect(win.document.URL).to.equal('about:blank')
        expect(win.document.readyState).to.equal('complete')
        done(err)
      })
    })

    it('Should open a window : target is "_top"', done => {
      const win0 = createWindow()
      const win1 = win0.open('about:blank', '_top')
      expect(win1).to.not.equal(win0)
      expect(win1).to.not.equal(win0.parent)
      expect(win1).to.equal(win0.top)
      expect(win1.name).to.equal('win-top')
      expect(win1.closed).to.equal(false)
      expect(win1.document.URL).to.equal('about:blank')
      expect(win1.document.readyState).to.equal('loading')

      const cfg1 = windowManager.getConfig(win1)
      expect(cfg1).to.exist

      cfg1.once('load', (err, win, cfg) => {
        expect(err).not.exist
        expect(win).to.equal(win1)
        expect(cfg).to.equal(cfg)
        expect(win.document.URL).to.equal('about:blank')
        expect(win.document.readyState).to.equal('complete')
        done(err)
      })
    })

    it('Should open a window : target is a window name', done => {
      const win0 = createWindow()
      const win1 = win0.open('about:blank', 'aaa')
      expect(win1).to.not.equal(win0)
      expect(win1).to.not.equal(win0.parent)
      expect(win1).to.not.equal(win0.top)
      expect(win1.name).to.equal('aaa')
      expect(win1.closed).to.equal(false)
      expect(win1.document.URL).to.equal('about:blank')
      expect(win1.document.readyState).to.equal('loading')

      const cfg1 = windowManager.getConfig(win1)
      expect(cfg1).to.exist

      cfg1.on('load', (err, win, cfg) => {
        expect(err).not.exist
        expect(win).to.equal(win1)
        expect(cfg).to.equal(cfg)
        expect(win.document.URL).to.equal('about:blank')
        expect(win.document.readyState).to.equal('complete')

        const win2 = win0.open('', 'aaa')
        expect(win2).to.equal(win1)

        const win3 = win1.open('', 'aaa')
        expect(win3).to.equal(win1)
        done(err)
      })
    })

    it('Should open a window : target is nullish', done => {
      const win0 = createWindow()
      const win1 = win0.open('about:blank', null)
      expect(win1).to.not.equal(win0)
      expect(win1).to.not.equal(win0.parent)
      expect(win1).to.not.equal(win0.top)
      expect(win1.name).to.equal('')
      expect(win1.closed).to.equal(false)
      expect(win1.document.URL).to.equal('about:blank')
      expect(win1.document.readyState).to.equal('loading')

      const cfg1 = windowManager.getConfig(win1)
      expect(cfg1).to.exist

      cfg1.on('load', (err, win, cfg) => {
        expect(err).not.exist
        expect(win).to.equal(win1)
        expect(cfg).to.equal(cfg)
        expect(win.document.URL).to.equal('about:blank')
        expect(win.document.readyState).to.equal('complete')
        done(err)
      })
    })

    it('Should open a window : target is an empty string', done => {
      const win0 = createWindow()
      const win1 = win0.open('about:blank', '')
      expect(win1).to.not.equal(win0)
      expect(win1).to.not.equal(win0.parent)
      expect(win1).to.not.equal(win0.top)
      expect(win1.name).to.equal('')
      expect(win1.closed).to.equal(false)
      expect(win1.document.URL).to.equal('about:blank')
      expect(win1.document.readyState).to.equal('loading')

      const cfg1 = windowManager.getConfig(win1)
      expect(cfg1).to.exist

      cfg1.on('load', (err, win, cfg) => {
        expect(err).not.exist
        expect(win).to.equal(win1)
        expect(cfg).to.equal(cfg)
        expect(win.document.URL).to.equal('about:blank')
        expect(win.document.readyState).to.equal('complete')
        done(err)
      })
    })

    it('Should open a window : url is nullish and target is "_blank"',
    done => {
      const win0 = createWindow()
      const win1 = win0.open(null, '_blank')
      expect(win1).to.not.equal(win0)
      expect(win1).to.not.equal(win0.parent)
      expect(win1).to.not.equal(win0.top)
      expect(win1.name).to.equal('')
      expect(win1.closed).to.equal(false)
      expect(win1.document.URL).to.equal('about:blank')
      expect(win1.document.readyState).to.equal('complete')

      const cfg1 = windowManager.getConfig(win1)
      expect(cfg1).to.exist

      cfg1.on('load', (err, win, cfg) => {
        expect(err).not.exist
        expect(win).to.equal(win1)
        expect(cfg).to.equal(cfg)
        expect(win.document.URL).to.equal('about:blank')
        expect(win.document.readyState).to.equal('complete')
        done(err)
      })

      done()
    })

    it('Should open a window : url is nullish and target is the name\n\t' +
    'of which thw window exists', done => {
      const winA = windowManager.get('aaa')

      const win0 = createWindow()
      const win1 = win0.open(null, 'aaa')
      expect(win1).to.equal(winA)
      expect(win1).to.not.equal(win0)
      expect(win1).to.not.equal(win0.parent)
      expect(win1).to.not.equal(win0.top)
      expect(win1.name).to.equal('aaa')
      expect(win1.closed).to.equal(false)
      expect(win1.document.URL).to.equal('about:blank')
      expect(win1.document.readyState).to.equal('complete')

      const cfg1 = windowManager.getConfig(win1)
      expect(cfg1).to.exist

      cfg1.on('load', err => {
        done(err)
      })

      done()
    })

    it('Should open a window : url is nullish and target is a name\n\t' +
    'of which the window does not exist', done => {
      expect(windowManager.get('abc')).not.exist

      const win0 = createWindow()
      const win1 = win0.open(null, 'abc')
      expect(win1).to.not.equal(win0)
      expect(win1).to.not.equal(win0.parent)
      expect(win1).to.not.equal(win0.top)
      expect(win1.name).to.equal('abc')
      expect(win1.closed).to.equal(false)
      expect(win1.document.URL).to.equal('about:blank')
      expect(win1.document.readyState).to.equal('complete')

      const cfg1 = windowManager.getConfig(win1)
      expect(cfg1).to.exist

      cfg1.on('load', err => {
        done(err)
      })

      done()
    })

    it('Should open a frame window with loading a page content', done => {
      browser.contentManager.add('http://sample.com', '<p>Sample</p>')

      const win0 = new JSDOM().window
      const cfg0 = new WindowConfig()
      cfg0.configure(win0)
      windowManager.set(win0, cfg0)
      configureOpening(win0, browser)

      cfg0.top = 30
      cfg0.left = 40
      cfg0.width = 500
      cfg0.height = 300
      cfg0.frame.edgeSize.top = 70
      cfg0.frame.edgeSize.bottom = 5
      cfg0.frame.edgeSize.left = 4
      cfg0.frame.edgeSize.right = 4
      cfg0.frame.edgeSize.bottom = 5
      cfg0.frame.edgeSize.bottom = 5

      expect(win0.screenX).to.equal(40)
      expect(win0.screenY).to.equal(30)
      expect(win0.outerWidth).to.equal(500)
      expect(win0.outerHeight).to.equal(300)
      expect(win0.innerWidth).to.equal(492)
      expect(win0.innerHeight).to.equal(225)

      const win1 = win0.open('http://sample.com', 'f1')

      expect(win1.name).to.equal('f1')
      expect(win1.screenX).to.equal(40)
      expect(win1.screenY).to.equal(30)
      expect(win1.outerWidth).to.equal(500)
      expect(win1.outerHeight).to.equal(300)
      expect(win1.innerWidth).to.equal(492)
      expect(win1.innerHeight).to.equal(225)

      const cfg1 = windowManager.getConfig(win1)
      expect(cfg1.isFrameWindow).to.equal(true)

      done()
    })

    it('Should open a popup window with resizing and shift position', done => {
      browser.contentManager.add('http://sample.com', '<p>Sample</p>')

      const win0 = new JSDOM().window
      const cfg0 = new WindowConfig()
      cfg0.configure(win0)
      windowManager.set(win0, cfg0)
      configureOpening(win0, browser)

      cfg0.top = 30
      cfg0.left = 40
      cfg0.width = 500
      cfg0.height = 300
      cfg0.frame.edgeSize.top = 60
      cfg0.frame.edgeSize.bottom = 6
      cfg0.frame.edgeSize.left = 3
      cfg0.frame.edgeSize.right = 3
      cfg0.frame.openingShift.x = 2
      cfg0.frame.openingShift.y = 2
      cfg0.popup.edgeSize.top = 70
      cfg0.popup.edgeSize.bottom = 5
      cfg0.popup.edgeSize.left = 4
      cfg0.popup.edgeSize.right = 4
      cfg0.popup.openingShift.x = 5
      cfg0.popup.openingShift.y = 5

      expect(win0.screenX).to.equal(40)
      expect(win0.screenY).to.equal(30)
      expect(win0.outerWidth).to.equal(500)
      expect(win0.outerHeight).to.equal(300)
      expect(win0.innerWidth).to.equal(494)
      expect(win0.innerHeight).to.equal(234)

      const win1 = win0.open('http://sample.com/aaa', 'p1',
        'width=100,height=150')

      const cfg1 = windowManager.getConfig(win1)
      expect(cfg1.isFrameWindow).to.equal(false)

      expect(win1.name).to.equal('p1')
      expect(win1.screenX).to.equal(45)
      expect(win1.screenY).to.equal(35)
      expect(win1.outerWidth).to.equal(108)
      expect(win1.outerHeight).to.equal(225)
      expect(win1.innerWidth).to.equal(100)
      expect(win1.innerHeight).to.equal(150)

      done()
    })

    it('Should open a popup window with moving', done => {
      browser.contentManager.add('http://sample.com/aaa', '<p>Sample</p>')

      const win0 = new JSDOM().window
      const cfg0 = new WindowConfig()
      cfg0.configure(win0)
      windowManager.set(win0, cfg0)
      configureOpening(win0, browser)

      cfg0.top = 30
      cfg0.left = 40
      cfg0.width = 500
      cfg0.height = 300
      cfg0.frame.edgeSize.top = 70
      cfg0.frame.edgeSize.bottom = 5
      cfg0.frame.edgeSize.left = 4
      cfg0.frame.edgeSize.right = 4
      cfg0.frame.edgeSize.bottom = 5
      cfg0.frame.edgeSize.bottom = 5

      expect(win0.screenX).to.equal(40)
      expect(win0.screenY).to.equal(30)
      expect(win0.outerWidth).to.equal(500)
      expect(win0.outerHeight).to.equal(300)
      expect(win0.innerWidth).to.equal(492)
      expect(win0.innerHeight).to.equal(225)

      const win1 = win0.open('http://sample.com/aaa', 'p1', 'left=140,top=130')

      const cfg1 = windowManager.getConfig(win1)
      expect(cfg1.isFrameWindow).to.equal(false)

      expect(win1.name).to.equal('p1')
      expect(win1.screenX).to.equal(140)
      expect(win1.screenY).to.equal(130)
      expect(win1.outerWidth).to.equal(108)
      expect(win1.outerHeight).to.equal(225)
      expect(win1.innerWidth).to.equal(100)
      expect(win1.innerHeight).to.equal(150)

      done()
    })

    it('Should open a named frame window even if features is not empty ',
    done => {
      browser.contentManager.add('http://sample.com/aaa', '<p>Sample</p>')

      const win0 = new JSDOM().window
      const cfg0 = new WindowConfig()
      cfg0.configure(win0)
      windowManager.set(win0, cfg0)
      configureOpening(win0, browser)

      cfg0.top = 33
      cfg0.left = 44
      cfg0.width = 505
      cfg0.height = 303
      cfg0.frame.edgeSize.top = 60
      cfg0.frame.edgeSize.bottom = 6
      cfg0.frame.edgeSize.left = 3
      cfg0.frame.edgeSize.right = 3
      cfg0.frame.openingShift.x = 2
      cfg0.frame.openingShift.y = 2
      cfg0.popup.edgeSize.top = 70
      cfg0.popup.edgeSize.bottom = 5
      cfg0.popup.edgeSize.left = 4
      cfg0.popup.edgeSize.right = 4
      cfg0.popup.openingShift.x = 5
      cfg0.popup.openingShift.y = 5

      expect(win0.screenX).to.equal(44)
      expect(win0.screenY).to.equal(33)
      expect(win0.outerWidth).to.equal(505)
      expect(win0.outerHeight).to.equal(303)
      expect(win0.innerWidth).to.equal(499)
      expect(win0.innerHeight).to.equal(237)

      const win1 = win0.open('http://sample.com/aaa', 'f1',
        'width=100,height=150')

      const cfg1 = windowManager.getConfig(win1)
      expect(cfg1.isFrameWindow).to.equal(true)

      expect(win1.name).to.equal('f1')
      expect(win1.screenX).to.equal(40)
      expect(win1.screenY).to.equal(30)
      expect(win1.outerWidth).to.equal(500)
      expect(win1.outerHeight).to.equal(300)
      expect(win1.innerWidth).to.equal(492)
      expect(win1.innerHeight).to.equal(225)

      done()
    })

    it('Should open a named popup window even if features is empty', done => {
      browser.contentManager.add('http://sample.com/aaa', '<p>Sample</p>')

      const win0 = new JSDOM().window
      const cfg0 = new WindowConfig()
      cfg0.configure(win0)
      windowManager.set(win0, cfg0)
      configureOpening(win0, browser)

      cfg0.top = 30
      cfg0.left = 40
      cfg0.width = 500
      cfg0.height = 300
      cfg0.frame.edgeSize.top = 70
      cfg0.frame.edgeSize.bottom = 5
      cfg0.frame.edgeSize.left = 4
      cfg0.frame.edgeSize.right = 4
      cfg0.frame.edgeSize.bottom = 5
      cfg0.frame.edgeSize.bottom = 5

      expect(win0.screenX).to.equal(40)
      expect(win0.screenY).to.equal(30)
      expect(win0.outerWidth).to.equal(500)
      expect(win0.outerHeight).to.equal(300)
      expect(win0.innerWidth).to.equal(492)
      expect(win0.innerHeight).to.equal(225)

      const win1 = win0.open('http://sample.com/aaa', 'p1')

      const cfg1 = windowManager.getConfig(win1)
      expect(cfg1.isFrameWindow).to.equal(false)

      expect(win1.name).to.equal('p1')
      expect(win1.screenX).to.equal(145)
      expect(win1.screenY).to.equal(135)
      expect(win1.outerWidth).to.equal(108)
      expect(win1.outerHeight).to.equal(225)
      expect(win1.innerWidth).to.equal(100)
      expect(win1.innerHeight).to.equal(150)

      cfg1.on('load', (err, w) => {
        if (err) {
          done(err)
          return
        }
        expect(w.document.readyState).to.equal('complete')
        expect(w.document.body.innerHTML).to.equal('<p>Sample</p>')
        done()
      })

    })

    it('Should open a new window but the content is bad', done => {
      browser.contentManager.add('http://sample.com/bad', '<p')

      const win0 = new JSDOM().window
      const cfg0 = new WindowConfig()
      cfg0.configure(win0)
      windowManager.set(win0, cfg0)
      configureOpening(win0, browser)

      const win1 = win0.open('http://sample.com/bad')
      const cfg1 = windowManager.getConfig(win1)

      cfg1.on('load', (err, w) => {
        if (err) {
          expect(err).to.exist
          expect(w.document).to.exist
          expect(w.document.body).to.exist
          expect(w.document.body.innerHTML).to.equal('')
          done()
          return
        }
        expect.fail()
      })
    })
  })

  describe('newWindow', () => {
    it('Should create a new window', () => {
      const windowConfig = new WindowConfig()
      const browser = { windowConfig, windowManager, contentManager }
      const win = newWindow(browser)
      const cfg = browser.windowManager.getConfig(win)
      expect(win).to.exist
      expect(cfg).to.exist
      expect(win.history.length).to.equal(1)
    })
  })

  describe('openWindow', () => {
    it('Should create a new window and load a content', done => {
      const windowConfig = new WindowConfig()
      const browser = { windowConfig, windowManager, contentManager }
      const win = openWindow('http://sample.com', browser)
      const cfg = browser.windowManager.getConfig(win)
      expect(win).to.exist
      expect(cfg).to.exist
      expect(win.history.length).to.equal(0)

      cfg.on('load', err => {
        expect(win.document.body.innerHTML).to.equal('<p>Sample</p>')
        expect(win.document.URL).to.equal('http://sample.com/')
        expect(win.document.charset).to.equal('UTF-8')
        expect(win.location.href).to.equal('http://sample.com/')
        expect(win.history.length).to.equal(1)
        done(err)
      })
    })

    it('Should create a new window and not loading', done => {
      const windowConfig = new WindowConfig()
      const browser = { windowConfig, windowManager, contentManager }
      const win = openWindow(null, browser)
      const cfg = browser.windowManager.getConfig(win)
      expect(win).to.exist
      expect(cfg).to.exist
      expect(win.history.length).to.equal(1)

      expect(win.document.body.innerHTML).to.equal('')
      expect(win.document.URL).to.equal('about:blank')
      expect(win.document.charset).to.equal('UTF-8')
      expect(win.location.href).to.equal('about:blank')

      cfg.on('load', err => {
        done(err)
      })
      done()
    })
  })
})

'use strict'

const expect = require('chai').expect
const { createBlankWindow } = require('.')
const { JSDOM } = require('jsdom')

describe('jsdom/create-blank-window', () => {

  it('Should create a window with opener', () => {
    const opts = {
      referrer: 'http://aaa/bbb/ccc',
      userAgent: 'Mozilla/5.0 AAA BBB',
    }

    const window = createBlankWindow('w0', opts)
    expect(window.name).to.equal('w0')
    expect(window.location.href).to.equal('about:blank')
    expect(window.navigator.userAgent).to.equal('Mozilla/5.0 AAA BBB')
    expect(window.history.length).to.equal(1)
    expect(window.opener).to.equal(null)
    expect(window.document.toString()).to.equal('[object Document]')
    expect(window.document.referrer).to.equal('http://aaa/bbb/ccc')

    window.addEventListener('load', () => {
      expect.fail()
    })
  })

  it('Should create a window with opener', () => {
    const opener = new JSDOM('', {
      url: 'http://aaa/bbb/ccc',
      userAgent: 'Mozilla/5.0 AAA BBB',
    }).window

    const window = createBlankWindow('w0', opener)
    expect(window.name).to.equal('w0')
    expect(window.location.href).to.equal('about:blank')
    expect(window.navigator.userAgent).to.equal('Mozilla/5.0 AAA BBB')
    expect(window.history.length).to.equal(1)
    expect(window.opener).to.equal(opener)
    expect(window.document.toString()).to.equal('[object Document]')
    expect(window.document.referrer).to.equal('http://aaa/bbb/ccc')

    window.addEventListener('load', () => {
      expect.fail()
    })
  })

  it('Should create a window with no arguments', () => {
    const window = createBlankWindow()
    expect(window.name).to.equal('')
    expect(window.location.href).to.equal('about:blank')
    expect(window.navigator.userAgent).to.equal('')
    expect(window.document).to.not.be.undefined
    expect(window.history.length).to.equal(1)
    expect(window.opener).to.equal(null)
    expect(window.document.referrer).to.equal('')

    window.addEventListener('load', () => {
      expect.fail()
    })
  })
})


'use strict'

const expect = require('chai').expect
const { createBlankWindow, promiseToLoadContent, clearHistory } = require('.')

describe('jsdom/promise-to-load-content', () => {

  const option = { userAgent: 'Mozilla/5.0 AAA BBB' }
  const window = createBlankWindow('', option)
  clearHistory(window)

  let historyCount = 0
  let referrer
  let origin
  let url
  let encoding
  let lastModified
  let contentType
  let contentData

  window.addEventListener('load', event => {
    expect(event).to.exist
    expect(window.navigator.userAgent).to.equal('Mozilla/5.0 AAA BBB')
    expect(window.history.length).to.equal(historyCount)
    expect(window.document.referrer).to.equal(referrer)
    expect(window.document.contentType).to.equal(contentType)
    expect(window.document.charset).to.equal(encoding)
    expect(window.document.lastModified).to.equal(lastModified)
    expect(window.document.URL).to.equal(url)
    expect(window.location.href).to.equal(url)
    expect(window.document.origin).to.equal(origin)
    expect(window.document.readyState).to.equal('complete')
  })

  it('Should load content of "about:blank"', done => {
    historyCount++
    referrer = ''
    contentType = 'text/html'
    encoding = 'windows-1252'
    lastModified = undefined
    url = 'about:blank'
    origin = 'null'

    promiseToLoadContent(window, 'about:blank')
      .then(done)
      .catch(done)

    expect(window.document.readyState).to.equal('loading')
  })

  it('Should load content of "about:blank" if url is null', done => {
    historyCount++
    referrer = ''
    contentType = 'text/html'
    encoding = 'windows-1252'
    lastModified = undefined
    url = 'about:blank'
    origin = 'null'

    promiseToLoadContent(window, null)
      .then(done)
      .catch(done)

    expect(window.document.readyState).to.equal('loading')
  })

  it('Should load content of "about:blank" if url is ""', done => {
    historyCount++
    referrer = ''
    contentType = 'text/html'
    encoding = 'windows-1252'
    lastModified = undefined
    url = 'about:blank'
    origin = 'null'

    promiseToLoadContent(window, '')
      .then(done)
      .catch(done)

    expect(window.document.readyState).to.equal('loading')
  })

  it('Should load content of an url', done => {
    historyCount++
    referrer = ''
    contentType = 'text/html'
    encoding = 'UTF-8'
    lastModified = undefined
    url = 'http://aaa/bbb/ccc'
    origin = 'http://aaa'

    promiseToLoadContent(window, 'http://aaa/bbb/ccc')
      .then(done)
      .catch(done)

    expect(window.document.readyState).to.equal('loading')
  })

  it('Shold load content with html data', done => {
    historyCount++
    referrer = ''
    encoding = 'Shift_JIS'
    lastModified = '06/14/2017 21:12:25'
    url = 'http://d/e/f'
    origin = 'http://d'
    contentType = 'text/xml'
    contentData = '<p>Hello</p>'

    promiseToLoadContent(window, url, {
      contentData,
      lastModified,
      contentType,
      encoding,
    }).then(() => {
      expect(window.document.body.innerHTML).to.equal(contentData)
      done()
    }).catch(done)

    expect(window.document.readyState).to.equal('loading')
  })

  it('Should fail to load content by bad url', done => {
    //historyCount++
    referrer = ''
    encoding = 'UTF-8'
    lastModified = '06/14/2017 21:12:25'
    url = 'aaa'
    origin = 'http://d'
    contentType = 'text/html'

    promiseToLoadContent(window, url, {
      contentData: '',
      lastModified,
      contentType,
      encoding,
    }).then(() => {
      expect.fail()
      done()
    }).catch(e => {
      expect(e).to.exist
      done()
    })
  })

  it('Should fail to load content by bad content', done => {
    historyCount++
    referrer = ''
    encoding = 'UTF-8'
    lastModified = '06/14/2017 21:12:25'
    url = 'http://a/b/c'
    origin = 'http://a'
    contentType = 'text/html'

    promiseToLoadContent(window, url, {
      contentData: '<',
      lastModified,
      contentType,
      encoding,
    }).then(() => {
      expect.fail()
      done()
    }).catch(e => {
      expect(e).to.exist
      done()
    })

    expect(window.document.readyState).to.equal('loading')
  })
})


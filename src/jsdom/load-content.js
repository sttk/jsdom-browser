'use strict'

const idlUtils = require('jsdom/lib/jsdom/living/generated/utils.js')
const whatwgURL = require('whatwg-url')

function promiseToLoadContent (window, url, { contentData = '', lastModified,
  contentType = 'text/html', encoding = 'UTF-8',
} = {}) {

  url = url || 'about:blank'

  const urlObj = whatwgURL.parseURL(url)
  if (!urlObj) {
    return Promise.reject(new URIError(url))
  }

  const docImpl = idlUtils.implForWrapper(window._document)
  docImpl._URL = urlObj
  docImpl._origin = whatwgURL.serializeURLOrigin(urlObj)
  docImpl._lastFocusedElement = null

  if (whatwgURL.serializeURL(urlObj) === 'about:blank') {
    contentData = ''
    contentType = 'text/html'
    encoding = 'windows-1252'
  }

  docImpl.readyState = 'loading'

  return Promise.resolve().then(() => {
    docImpl._contentType = contentType
    docImpl._encoding = encoding
    docImpl._lastModified = lastModified

    docImpl.open()
    docImpl.write(contentData)
    docImpl._history.pushState(null, docImpl.title, url)
    docImpl.close()

    const event = window._document.createEvent('HTMLEvents')
    event.initEvent('load', false, false)
    window.dispatchEvent(event)
  })
}

module.exports = promiseToLoadContent

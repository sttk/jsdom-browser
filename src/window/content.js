'use strict'

class ContentManager {

  constructor () {
    this._urlToContentMap = {}
  }

  add (url, content = {}) {
    if (Object.prototype.toString.call(content) === '[object String]') {
      content = { contentData: content }
    }
    this._urlToContentMap[url] = content
  }

  get (url) {
    return this._urlToContentMap[url]
  }
}

module.exports = ContentManager

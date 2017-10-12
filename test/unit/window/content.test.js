'use strict'

const expect = require('chai').expect
const ContentManager = require('../../../src/window/content')

describe('window/content', () => {

  const contentManager = new ContentManager()

  it('Should construct an instance', () => {
    expect(contentManager.get(null)).to.equal(undefined)
    expect(contentManager.get('')).to.equal(undefined)
    expect(contentManager.get('http://aa/bb/cc')).to.equal(undefined)
    expect(contentManager.get('http://d/e/f')).to.equal(undefined)
  })

  it('Should register contents', () => {
    const content = {
      contentData: '<p>Hello</p>',
      lastModified: '06/12/2017 11:22:33',
      contentType: 'text/html',
      encoding: 'UTF-8',
    }

    contentManager.add('http://aa/bb/cc', content)

    expect(contentManager.get(null)).to.equal(undefined)
    expect(contentManager.get('')).to.equal(undefined)
    expect(contentManager.get('http://aa/bb/cc')).to.deep.equal(content)
    expect(contentManager.get('http://d/e/f')).to.equal(undefined)
  })
})


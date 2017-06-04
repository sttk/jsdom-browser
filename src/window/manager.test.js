'use strict'

const expect = require('chai').expect
const WindowManager = require('../../src/window/manager')
const WindowConfig = require('../../src/window/config')

describe('window/manager', () => {

  const config0 = new WindowConfig()
  const config1 = new WindowConfig()
  const config2 = new WindowConfig()
  const window0 = { name: 'win0' }
  const window1 = { name: 'win1' }
  const window2 = { name: 'win2' }

  describe('constructor', () => {
    const manager = new WindowManager()

    it('Should return zero with .count', () => {
      expect(manager.count).to.equal(0)
    })

    it('Should return undefined with .get', () => {
      expect(manager.get(0)).to.be.undefined
      expect(manager.get(1)).to.be.undefined
      expect(manager.get(2)).to.be.undefined
      expect(manager.get('win0')).to.be.undefined
      expect(manager.get('win1')).to.be.undefined
      expect(manager.get('win2')).to.be.undefined
      expect(manager.get(config0)).to.be.undefined
      expect(manager.get(config1)).to.be.undefined
      expect(manager.get(config2)).to.be.undefined
    })

    it('Should return undefined with .getConfig', () => {
      expect(manager.getConfig(window0)).to.be.undefined
      expect(manager.getConfig(window1)).to.be.undefined
      expect(manager.getConfig(window2)).to.be.undefined
    })
  })

  describe('.set', () => {
    const manager = new WindowManager()

    it('Should return count of windows with .count', () => {
      manager.set(window0, config0)
      expect(manager.count).to.equal(1)
      manager.set(window1, config1)
      expect(manager.count).to.equal(2)
      manager.set(window2, config2)
      expect(manager.count).to.equal(3)
    })

    it('Should return a window with .get', () => {
      expect(manager.get(0)).to.equal(window0)
      expect(manager.get(1)).to.equal(window1)
      expect(manager.get(2)).to.equal(window2)

      expect(manager.get('win0')).to.equal(window0)
      expect(manager.get('win1')).to.equal(window1)
      expect(manager.get('win2')).to.equal(window2)

      expect(manager.get(config0)).to.equal(window0)
      expect(manager.get(config1)).to.equal(window1)
      expect(manager.get(config2)).to.equal(window2)
    })

    it('Should return a config with .getConfig', () => {
      expect(manager.getConfig(window0)).to.equal(config0)
      expect(manager.getConfig(window1)).to.equal(config1)
      expect(manager.getConfig(window2)).to.equal(config2)
    })

    it('Should not add windows which are already set', () => {
      manager.set(window0, config0)
      expect(manager.count).to.equal(3)
      manager.set(window1, config1)
      expect(manager.count).to.equal(3)
      manager.set(window2, config2)
      expect(manager.count).to.equal(3)
    })

    it('Should rename a window', () => {
      expect(window0.name).to.equal('win0')
      expect(window1.name).to.equal('win1')
      expect(window2.name).to.equal('win2')

      expect(manager.get('win0')).to.equal(window0)
      expect(manager.get('win1')).to.equal(window1)
      expect(manager.get('win2')).to.equal(window2)

      window0.name = 'abc'

      expect(manager.get('win0')).to.be.undefined
      expect(manager.get('win1')).to.equal(window1)
      expect(manager.get('win2')).to.equal(window2)
      expect(manager.get('abc')).to.equal(window0)
    })

    it('Should rename to a duplicated name', () => {
      window0.name = 'win1'
      expect(manager.get('win0')).to.be.undefined
      expect(manager.get('win1')).to.equal(window1)
      expect(manager.get('win2')).to.equal(window2)
      expect(manager.get('abc')).to.be.undefined
    })

    it('Should rename to nullish', () => {
      window1.name = null
      expect(manager.get('win0')).to.be.undefined
      expect(manager.get('win1')).to.equal(window0)
      expect(manager.get('win2')).to.equal(window2)
      expect(manager.get('abc')).to.be.undefined

      window0.name = undefined
      expect(manager.get('win0')).to.be.undefined
      expect(manager.get('win1')).to.be.undefined
      expect(manager.get('win2')).to.equal(window2)
      expect(manager.get('abc')).to.be.undefined
    })

    it('Should rename to a duplicated name', () => {
      window1.name = 'win1'
      expect(manager.get('win0')).to.be.undefined
      expect(manager.get('win1')).to.equal(window1)
      expect(manager.get('win2')).to.equal(window2)
      expect(manager.get('abc')).to.be.undefined

      window0.name = 'win1'
      expect(manager.get('win0')).to.be.undefined
      expect(manager.get('win1')).to.equal(window1)
      expect(manager.get('win2')).to.equal(window2)
      expect(manager.get('abc')).to.be.undefined
    })

    it('Should ignore closed windows', () => {
      window1.closed = true
      expect(manager.get('win0')).to.be.undefined
      expect(manager.get('win1')).to.equal(window0)
      expect(manager.get('win2')).to.equal(window2)
      expect(manager.get('abc')).to.be.undefined

      window0.closed = true
      expect(manager.get('win0')).to.be.undefined
      expect(manager.get('win1')).to.be.undefined
      expect(manager.get('win2')).to.equal(window2)
      expect(manager.get('abc')).to.be.undefined

      window0.closed = false
      window1.closed = false
    })

    it('Should not rename to invalid name', () => {
      window1.name = {}
      expect(manager.get('win0')).to.be.undefined
      expect(manager.get('win1')).to.equal(window0)
      expect(manager.get('win2')).to.equal(window2)
      expect(manager.get('abc')).to.be.undefined
      expect(window1.name).to.equal('')

      window1.name = ''
      expect(manager.get('win0')).to.be.undefined
      expect(manager.get('win1')).to.equal(window0)
      expect(manager.get('win2')).to.equal(window2)
      expect(manager.get('abc')).to.be.undefined
      expect(window1.name).to.equal('')
    })

    it('Should rename to valid name again', () => {
      window1.name = 'w1'
      expect(manager.get('win0')).to.be.undefined
      expect(manager.get('win1')).to.equal(window0)
      expect(manager.get('win2')).to.equal(window2)
      expect(manager.get('abc')).to.be.undefined
      expect(manager.get('w1')).to.equal(window1)
    })

    it('Should delete .name', () => {
      delete window0.name
      delete window1.name
      delete window2.name

      expect(window0.name).to.be.undefined
      expect(window1.name).to.be.undefined
      expect(window2.name).to.be.undefined

      expect(manager.get('win0')).to.be.undefined
      expect(manager.get('win1')).to.equal(window0)
      expect(manager.get('win2')).to.equal(window2)
      expect(manager.get('abc')).to.be.undefined
      expect(manager.get('w1')).to.equal(window1)
    })

  })
})


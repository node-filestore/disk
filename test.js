/* eslint-env mocha */

'use strict'

const assert = require('assert')
const fs = require('fs')
const path = require('path')

const getStream = require('get-stream')
const rimraf = require('rimraf')
const temp = require('fs-temp')

const FileStoreDisk = require('./')

describe('FileStore - Disk', () => {
  let directory, filestore

  before(() => {
    directory = temp.mkdirSync()
    filestore = new FileStoreDisk({ path: directory })
  })

  after((done) => {
    rimraf(directory, done)
  })

  describe('.put()', () => {
    const name = 'a'
    const expected = 'test1'

    it('should create a file', () => {
      return filestore.put(name, expected).then(() => {
        assert.strictEqual(fs.readFileSync(path.join(directory, name), 'utf-8'), expected)
      })
    })
  })

  describe('.get()', () => {
    const name = 'b'
    const expected = 'test2'

    before(() => {
      return filestore.put(name, expected)
    })

    it('should stream a file', () => {
      return getStream(filestore.get(name)).then((actual) => {
        assert.strictEqual(actual, expected)
      })
    })
  })

  describe('.has()', () => {
    const name = 'c'

    before(() => {
      return filestore.put(name, 'test')
    })

    it('should report that file exists', () => {
      return filestore.has(name).then((actual) => {
        assert.strictEqual(actual, true)
      })
    })

    it('should report that file does not exists', () => {
      return filestore.has('nope').then((actual) => {
        assert.strictEqual(actual, false)
      })
    })
  })
})

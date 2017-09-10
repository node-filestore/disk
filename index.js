'use strict'

const fs = require('fs')
const path = require('path')

const intoStream = require('into-stream')
const isStream = require('is-stream')
const pathExists = require('path-exists')

const kMode = Symbol('mode')
const kPath = Symbol('path')
const kPrefix = Symbol('prefix')

module.exports = class FileStoreDisk {
  constructor (options) {
    if (typeof options !== 'object' || options === null) {
      throw new TypeError('Expected options object to be provided')
    }

    if (typeof options.path !== 'string') {
      throw new TypeError('Expected "path" option to be present and a string')
    }

    this[kMode] = options.mode
    this[kPath] = options.path
    this[kPrefix] = (options.prefix || '')
  }

  put (id, data, options) {
    if (typeof id !== 'string') {
      throw new TypeError('Expected "id" to be a string')
    }

    if (!isStream(data)) {
      data = intoStream(data)
    }

    options = options || {}

    if (typeof options !== 'object') {
      throw new TypeError('Expected "options" to be an object')
    }

    const pathname = path.join(this[kPath], `${this[kPrefix]}${id}`)
    const output = fs.createWriteStream(pathname, { mode: this[kMode] })

    return new Promise((resolve, reject) => {
      data.pipe(output)

      data.on('error', reject)
      output.on('error', reject)

      output.on('close', () => resolve())
    })
  }

  get (id) {
    if (typeof id !== 'string') {
      throw new TypeError('Expected "id" to be a string')
    }

    const pathname = path.join(this[kPath], `${this[kPrefix]}${id}`)

    return fs.createReadStream(pathname)
  }

  has (id) {
    if (typeof id !== 'string') {
      throw new TypeError('Expected "id" to be a string')
    }

    const pathname = path.join(this[kPath], `${this[kPrefix]}${id}`)

    return pathExists(pathname)
  }
}

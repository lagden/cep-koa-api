'use strict'

const {join} = require('path')
const levelup = require('levelup')
const leveldown = require('leveldown')
const mkdirp = require('mkdirp')

const {NODE_ENV} = process.env
const location = join(__dirname, '..', '..', 'data', `cep.${NODE_ENV}.db`)
mkdirp.sync(location, {mode: 0o755})
const db = levelup(leveldown(location))

module.exports = db

'use strict'

const {join} = require('path')
const level = require('level')

const dbPath = join(__dirname, '..', '..', 'data')
const db = level(dbPath, {valueEncoding: 'json'})

module.exports = db

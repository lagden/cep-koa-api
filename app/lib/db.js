'use strict'

const {join} = require('path')
const levelup = require('levelup')
const leveldown = require('leveldown')

const location = join(__dirname, '..', '..', 'db', 'cep.db')
const db = levelup(leveldown(location))

module.exports = db

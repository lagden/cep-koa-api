'use strict'

const debug = require('debug')

const PREFIX = 'cep-api'
const log = debug(`${PREFIX}:log`)
const error = debug(`${PREFIX}:error`)

log.log = console.log.bind(console)

exports.log = log
exports.error = error

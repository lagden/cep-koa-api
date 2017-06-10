'use strict'

const debug = require('debug')

const log = debug('cep-api:log')
const error = debug('cep-api:error')

log.log = console.log.bind(console)

exports.log = log
exports.error = error

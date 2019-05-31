'use strict'

const debug = require('debug')

const error = debug('cepkoa:error')
const log = debug('cepkoa:log')

log.color = debug.colors[3]
error.color = debug.colors[5]

module.exports = {
	log,
	error
}

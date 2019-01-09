'use strict'

const debug = require('debug')

const error = debug('cepkoa:error')
const log = debug('cepkoa:log')

module.exports = {
	error,
	log
}

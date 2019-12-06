'use strict'

const debug = require('debug')

const {DEBUG_PREFIX = '_app_default_debug'} = process.env

const log = debug(`${DEBUG_PREFIX}:log`)
const info = debug(`${DEBUG_PREFIX}:info`)
const error = debug(`${DEBUG_PREFIX}:error`)

module.exports = {
	error,
	log,
	info
}

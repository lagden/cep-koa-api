'use strict'

const supportsColor = require('supports-color')
const debug = require('debug')

/* istanbul ignore next */
const {DEBUG_PREFIX = '_app_default_debug'} = process.env

const log = debug(`${DEBUG_PREFIX}:log`)
const info = debug(`${DEBUG_PREFIX}:info`)
const error = debug(`${DEBUG_PREFIX}:error`)

/* istanbul ignore next */
const colors = supportsColor.stdout.has256 ? [7, 54, 58] : [0, 2, 5]

log.color = debug.colors[colors[0]]
info.color = debug.colors[colors[1]]
error.color = debug.colors[colors[2]]

module.exports = {
	error,
	log,
	info
}

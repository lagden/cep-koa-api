import process from 'node:process'
import debug from 'debug'

const {DEBUG_PREFIX = 'boilerplate'} = process.env

const error = debug(`${DEBUG_PREFIX}:error`)
const warn = debug(`${DEBUG_PREFIX}:warn`)
const info = debug(`${DEBUG_PREFIX}:info`)
const log = debug(`${DEBUG_PREFIX}:log`)

const colors = [0, 2, 4, 5]

log.color = debug.colors[colors[0]]
info.color = debug.colors[colors[1]]
warn.color = debug.colors[colors[2]]
error.color = debug.colors[colors[3]]

export {
	log,
	info,
	warn,
	error,
}

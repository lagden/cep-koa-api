'use strict'

const Redis = require('ioredis')

/* istanbul ignore next */
const {
	RPORT: port = 6379,
	RHOST: host = 'localhost',
	RPASS: password = '',
	RDB: db = 0
} = process.env

const _opts = {
	port,
	host,
	password,
	db
}

function redis(opts) {
	const options = Object.assign({}, _opts, opts)
	return new Redis(options)
}

module.exports = redis

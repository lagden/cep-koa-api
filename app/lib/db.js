'use strict'

const Redis = require('ioredis')

const {RPORT = 6379, RHOST = 'localhost', RPASS = ''} = process.env
const opts = {
	port: RPORT,
	host: RHOST,
	password: RPASS
}

const redis = new Redis(opts)

module.exports = redis

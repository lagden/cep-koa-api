'use strict'

const Cache = require('@tadashi/cache-redis')

/* istanbul ignore next */
const {
	RPORT: port = 6379,
	RHOST: host = 'localhost',
	RPASS: password = '',
	RDB: db = 1
} = process.env

const cache = new Cache({
	redis: {
		keyPrefix: 'cepkoa',
		port,
		host,
		password,
		db
	},
	namespace: 'cepkoa_api'
})

module.exports = cache

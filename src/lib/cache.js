'use strict'

const Cache = require('@tadashi/cache-redis')

/* istanbul ignore next */
const {
	RPORT: port = 6379,
	RHOST: host = 'localhost',
	RPASS: password = '',
	RDB: db = 0,
	RNAMESPACE: namespace = 'cepkoa_api',
	RKEYPREFIX: keyPrefix = 'cepkoa'
} = process.env

const cache = new Cache({
	redis: {
		keyPrefix,
		port,
		host,
		password,
		db
	},
	namespace
})

module.exports = cache

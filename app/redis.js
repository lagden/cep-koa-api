/* eslint import/no-dynamic-require: 0 */

'use strict'

const Redis = require('ioredis')

const env = process.env.NODE_ENV || /* istanbul ignore next: tired of writing tests */ 'develop'

const config = require(`./config/redis.${env}.json`)
const redisOpts = {
	port: process.env.RPORT || config.port,
	host: process.env.RHOST || config.host,
	password: process.env.RPASS || config.passwd
}
const redis = new Redis(redisOpts)

module.exports = redis

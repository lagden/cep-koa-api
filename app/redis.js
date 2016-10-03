'use strict';

const Redis = require('ioredis');

const env = process.env.NODE_ENV || 'development';

const config = require(`./config/redis.${env}.json`);
const redisOpts = {
	port: process.env.RPORT || config.port,
	host: process.env.RHOST || config.host,
	password: process.env.RPASS || config.passwd
};
const redis = new Redis(redisOpts);

module.exports = redis;

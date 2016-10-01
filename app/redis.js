'use strict';

const Redis = require('ioredis');

const env = process.env.NODE_ENV || 'development';
let redisOpts;
let config;

if (env === 'production') {
	redisOpts = {
		port: process.env.RPORT,
		host: process.env.RHOST,
		password: process.env.RPASS
	};
} else if (env === 'env') {
	config = require('./redis.json');

	redisOpts = {
		port: config.port,
		host: config.host,
		password: config.passwd
	};
} else {
	redisOpts = {};
}

const redis = new Redis(redisOpts);

module.exports = redis;

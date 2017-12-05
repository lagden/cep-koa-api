'use strict'

const JSONB = require('json-buffer')
const redis = require('./redis')

class Cache {
	constructor(opts = {}) {
		this.namespace = `namespace:${opts.namespace || 'cache'}`
		this.redis = redis(opts)
	}

	get(key) {
		return this.redis.get(key)
			.then(value => {
				value = JSONB.parse(value)
				if (value === undefined || value === null) {
					return undefined
				}
				return value
			})
	}

	set(key, value, ttl = null) {
		if (typeof value === 'undefined') {
			return Promise.resolve(undefined)
		}
		let args = [key, JSONB.stringify(value)]
		if (typeof ttl === 'number') {
			args = [...args, 'PX', ttl]
		}
		return this.redis.set(...args)
			.then(() => this.redis.sadd(this.namespace, key))
	}

	delete(key) {
		return Promise.all([
			this.redis.del(key),
			this.redis.srem(this.namespace, key)
		])
		.then(([item]) => Boolean(item))
	}

	clear() {
		return this.redis.smembers(this.namespace)
			.then(keys => {
				const args = [...keys, this.namespace]
				return this.redis.del(...args)
			})
			.then(() => undefined)
	}
}

module.exports = Cache

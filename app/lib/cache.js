'use strict'

const EventEmitter = require('events')
const JSONB = require('json-buffer')
const redis = require('./redis')

class Cache extends EventEmitter {
	constructor(opts = {}) {
		super()
		this.ttlSupport = true
		this.namespace = `namespace:_${opts.keyPrefix || 'cache'}`
		this.redis = redis(opts)
		this.redis.on('error', err => this.emit('error', err))
	}

	get(key) {
		return this.redis.get(key)
			.then(value => {
				if (value === null) {
					return undefined
				}
				return JSONB.parse(value)
			})
	}

	set(key, value, ttl) {
		value = JSONB.stringify(value)

		if (typeof value === 'undefined') {
			return Promise.resolve(undefined)
		}

		return Promise.resolve()
			.then(() => {
				if (typeof ttl === 'number') {
					return this.redis.set(key, value, 'PX', ttl)
				}
				return this.redis.set(key, value)
			})
			.then(() => this.redis.sadd(this.namespace, key))
	}

	delete(key) {
		return this.redis.del(key)
			.then(items => {
				return this.redis.srem(this.namespace, key)
					.then(() => items > 0)
			})
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

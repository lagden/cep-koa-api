'use strict'

const Cache = require('@tadashi/cache-redis')

const cache = new Cache({
	namespace: 'cepkoa_api'
})

module.exports = cache

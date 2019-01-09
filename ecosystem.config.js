'use strict'

module.exports = {
	apps: [{
		name: 'micro-cep-v1',
		script: 'index.js',
		instances: 3,
		autorestart: true,
		watch: false,
		max_memory_restart: '1G',
		env: {
			NODE_ENV: 'production',
			PORT: 3017,
			DEBUG: 'cepkoa:*',
			DEBUG_COLORS: 1,
			RPORT: 6379,
			RDB: 1
		}
	}]
}

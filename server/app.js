'use strict'

const base = require('@tadashi/koa-base')
const routes = require('./routes')
const debug = require('./lib/debug')

const app = base({
	error: true,
	cors: {
		credentials: true
	}
})

app
	.use(routes)
	.on('error', debug.error)

app.proxy = true

module.exports = app

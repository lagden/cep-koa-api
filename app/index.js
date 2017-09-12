'use strict'

const base = require('koa-app-base')
const debug = require('./lib/debug')
const router = require('./router')

const app = base({errorHandler: {emit: true}})
	.use(router.routes())
	.use(router.allowedMethods({
		throw: true
	}))
	.on('error', debug.error)

app.proxy = true

module.exports = app

'use strict'

const zlib = require('zlib')
const responseTime = require('koa-response-time')
const compress = require('koa-compress')
const cors = require('kcors')
const conditional = require('koa-conditional-get')
const etag = require('koa-etag')
const Koa = require('koa')
const {errorHandler} = require('./lib/common')
const router = require('./router')
const debug = require('./lib/debug')

const app = new Koa()

app.proxy = true
app
	.use(errorHandler)
	.use(cors())
	.use(responseTime())
	.use(compress({
		threshold: 2048,
		flush: zlib.Z_SYNC_FLUSH
	}))
	.use(conditional())
	.use(etag())
	.use(router.routes())
	.use(router.allowedMethods({
		throw: true
	}))

app.on('error', err => {
	debug.error(err.status, err.message)
})

module.exports = app

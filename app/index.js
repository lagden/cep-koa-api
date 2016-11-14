'use strict'

const zlib = require('zlib')
const responseTime = require('koa-response-time')
const compress = require('koa-compress')
const cors = require('kcors')
const Koa = require('koa')
const router = require('./router')

const app = new Koa()

app
	.use(cors())
	.use(responseTime())
	.use(compress({
		threshold: 2048,
		flush: zlib.Z_SYNC_FLUSH
	}))
	.use(router.routes())

module.exports = app

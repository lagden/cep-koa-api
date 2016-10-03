'use strict';

const join = require('path').join;
const zlib = require('zlib');
const responseTime = require('koa-response-time');
const compress = require('koa-compress');
const cors = require('kcors');
const favicon = require('koa-favicon');
const Koa = require('koa');
const router = require('./router');

const app = new Koa();

app
	.use(responseTime())
	.use(compress({
		threshold: 2048,
		flush: zlib.Z_SYNC_FLUSH
	}))
	.use(cors())
	.use(favicon(join(__dirname, '/public/favicon.ico')))
	.use(router.routes());

module.exports = app;

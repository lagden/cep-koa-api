'use strict';

const join = require('path').join;
const zlib = require('zlib');
const responseTime = require('koa-response-time');
const compress = require('koa-compress');
const favicon = require('koa-favicon');
const _ = require('koa-route');
const cors = require('kcors');
const Koa = require('koa');
const methods = require('./methods');

const app = new Koa();

app
	.use(responseTime())
	.use(compress({
		threshold: 2048,
		flush: zlib.Z_SYNC_FLUSH
	}))
	.use(cors())
	.use(favicon(join(__dirname, '/public/favicon.ico')))
	.use(_.get('/', methods.home))
	.use(_.get('/cep/:cep', methods.findOnRedis))
	.use(_.get('/cep/:cep', methods.findOnCorreios));

module.exports = app;

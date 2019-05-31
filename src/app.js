'use strict'

const base = require('koa-app-base')
const routes = require('./routes')
const debug = require('./lib/debug')

const app = base({error: true})
	.use(routes)
	.on('error', debug.error)

app.proxy = true

module.exports = app

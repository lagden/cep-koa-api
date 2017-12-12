'use strict'

const debug = require('@tadashi/debug')('cep-api')
const base = require('koa-app-base')
const routes = require('./routes')

const app = base({error: {emit: true}})
	.use(routes)
	.on('error', debug.error)

app.proxy = true

module.exports = app

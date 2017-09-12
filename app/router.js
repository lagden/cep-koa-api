'use strict'

const Router = require('koa-router')
const bodyparser = require('koa-bodyparser')
const {graphql} = require('graphql')
const find = require('./lib/find')
const debug = require('./lib/debug')
const schema = require('./schema')

function onerror(err, ctx) {
	debug.error(`bodyparser: ${err.message}`)
	ctx.throw(422, 'body parse error')
}

function _home(ctx, next) {
	ctx.body = {
		usage: '/cep/04080012'
	}
	return next()
}

async function _find(ctx, next) {
	const {cep} = ctx.params
	try {
		const dados = await find(cep)
		ctx.status = 200
		ctx.body = dados
		return next()
	} catch (err) {
		ctx.throw(err.status, err.message)
	}
}

async function _graphql(ctx) {
	const {query, variables, operationName} = ctx.request.body
	ctx.body = await graphql(schema, query, null, ctx, variables, operationName)
}

const router = new Router()

router
	.get('/', _home)
	.get('/cep/:cep', _find)
	.post('/gql', bodyparser({onerror}), _graphql)

module.exports = router

'use strict'

const Router = require('koa-router')
const bodyparser = require('koa-bodyparser')
const {graphql} = require('graphql')
const schema = require('../schemas')
const debug = require('../lib/debug')

const router = new Router()

async function gql(ctx) {
	const {query, variables, operationName} = ctx.request.body
	const res = await graphql(schema, query, null, ctx, variables, operationName)
	if (res.errors) {
		debug.error('gql ---> ', res.errors)
		const [error] = res.errors
		const {originalError} = error
		const {status, code, message} = originalError || error
		ctx.status = status || code || 500
		ctx.throw(ctx.status, message, {graphql: res.errors})
	}

	ctx.body = res
}

router
	.post('/gql', bodyparser(), gql)

module.exports = router

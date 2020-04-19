'use strict'

const Router = require('@koa/router')
const bodyparser = require('koa-bodyparser')
const {graphql} = require('graphql')
const schema = require('../make-schema')
const debug = require('../lib/debug')

const router = new Router()

async function gql(ctx) {
	const {query, variables, operationName} = ctx.request.body
	const result = await graphql(schema, query, null, ctx, variables, operationName)
	if (result.errors) {
		debug.error('gql ---> ', result.errors)
		const [error] = result.errors
		const {originalError} = error
		const {status, code, message} = originalError || error
		ctx.status = status || code || 500
		ctx.throw(ctx.status, message, {graphql: result.errors})
	}

	ctx.body = result
}

router
	.post('/gql', bodyparser(), gql)

module.exports = router

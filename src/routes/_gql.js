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
		ctx.status = 500
		for (const error of res.errors) {
			const {originalError} = error
			if (originalError) {
				/* istanbul ignore next */
				ctx.status = originalError.status || originalError.code || ctx.status
				ctx.throw(ctx.status, originalError.message, originalError)
			}
			ctx.throw(ctx.status, error.message, error)
		}
	}
	ctx.body = res
}

router
	.post('/gql', bodyparser(), gql)

module.exports = router

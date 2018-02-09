'use strict'

const Router = require('koa-router')
const bodyparser = require('koa-bodyparser')
const {graphql} = require('graphql')
const schema = require('../schemas')

const router = new Router()

async function gql(ctx) {
	const {query, variables, operationName} = ctx.request.body
	const res = await graphql(schema, query, null, ctx, variables, operationName)
	if (res.errors) {
		ctx.status = 500
		for (const err of res.errors) {
			const {originalError} = err
			if (originalError) {
				/* istanbul ignore next */
				ctx.status = originalError.status || originalError.code || ctx.status
			} else {
				throw err
			}
		}
	}
	ctx.body = res
}

router
	.post('/gql', bodyparser(), gql)

module.exports = router

'use strict'

const debug = require('@tadashi/debug')('cep-api')
const KoaRouter = require('koa-router')
const koaBodyParser = require('koa-bodyparser')
const {graphql} = require('graphql')
const schema = require('../schemas')

const router = new KoaRouter()

function onerror(err, ctx) {
	debug.error(`bodyparser: ${err.message}`)
	ctx.throw(422, 'body parse error')
}

async function _graphql(ctx) {
	try {
		const {query, variables, operationName} = ctx.request.body
		const res = await graphql(schema, query, null, ctx, variables, operationName)
		if (res && res.errors) {
			const [err] = res.errors
			throw err
		}
		ctx.body = res
	} catch (err) {
		ctx.status = err.status || ctx.state.status || 500
		ctx.throw(ctx.status, err.message)
	}
}

router
	.post('/gql', koaBodyParser({onerror}), _graphql)

module.exports = router

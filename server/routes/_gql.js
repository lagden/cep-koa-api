import {graphql} from 'graphql'
import bodyparser from 'koa-bodyparser'
import Router from '@koa/router'
import schema from '../schema/index.js'
// import * as debug from '../lib/debug.js'

const router = new Router()

async function gql(ctx) {
	const {query, variables, operationName} = ctx.request.body
	const result = await graphql(schema, query, undefined, ctx, variables, operationName)
	if (result.errors) {
		const [error] = result.errors
		const {originalError} = error
		const {status, code, message} = originalError ?? error
		ctx.throw(status ?? code ?? 500, message, {
			graphql: result,
		})
	}

	ctx.set('Cache-Control', 's-maxage=120, stale-while-revalidate=300')
	ctx.body = result
}

router
	.post('/gql', bodyparser(), gql)

export default router

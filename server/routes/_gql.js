import {graphql} from 'graphql'
import bodyparser from 'koa-bodyparser'
import Router from '@koa/router'
import schema from '../schema/index.js'
// import * as debug from '../lib/debug.js'

const router = new Router()

async function gql(ctx) {
	let {
		query,
		variables,
		//
		source,
		variableValues,
		operationName,
	} = ctx.request.body

	source = source ?? query
	variableValues = variableValues ?? variables

	const result = await graphql({
		schema,
		source,
		variableValues,
		operationName,
		contextValue: ctx,
	})

	if (result.errors) {
		const [error] = result.errors
		const {originalError} = error
		const {status, code, message} = originalError ?? error
		ctx.throw(status ?? code ?? 500, message, {
			graphql: result,
		})
	}

	ctx.body = result
}

router
	.post('/gql', bodyparser(), gql)

export default router

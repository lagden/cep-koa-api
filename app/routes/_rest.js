'use strict'

const Router = require('koa-router')
const find = require('../lib/find')

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

const router = new Router()

router
	.get('/', _home)
	.get('/cep/:cep', _find)

module.exports = router

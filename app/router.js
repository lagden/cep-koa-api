'use strict'

const consulta = require('lagden-cep')
const Router = require('koa-router')
const {cleanup} = require('./lib/common')
const debug = require('./lib/debug')
const redis = require('./redis')

const router = new Router()

function home(ctx, next) {
	ctx.body = {
		usage: '/cep/04080012'
	}
	return next()
}

async function find(ctx, next) {
	const cep = cleanup(ctx.params.cep)
	try {
		const cached = await redis.get(cep)
		if (cached) {
			const r = JSON.parse(cached)
			ctx.status = 200
			ctx.body = r
			return next()
		}

		const correios = await consulta(cep)
		redis.set(cep, JSON.stringify(correios))
		ctx.status = 200
		ctx.body = correios
		return next()
	} catch (err) {
		debug.error('find', cep)
		ctx.throw(err.status, err.message)
	}
}

router.get('/', home)
router.get('/cep/:cep', find)

module.exports = router

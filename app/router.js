'use strict'

const consulta = require('lagden-cep')
const Router = require('koa-router')
const debug = require('./lib/debug')
const db = require('./lib/db')

const router = new Router()

function _cleanup(cep) {
	return cep.replace(/[^\d]/g, '')
}

function home(ctx, next) {
	ctx.body = {
		usage: '/cep/04080012'
	}
	return next()
}

async function findDB(cep) {
	try {
		const cache = await db.get(cep)
		return JSON.parse(cache.toString())
	} catch (err) {
		debug.error(`findDB: ${err.message}`)
		return false
	}
}

async function find(ctx, next) {
	const cep = _cleanup(ctx.params.cep)
	try {
		const cache = await findDB(cep)
		if (cache) {
			ctx.status = 200
			ctx.body = cache
			return next()
		}
		const correios = await consulta(cep)
		await db.put(cep, JSON.stringify(correios))
		ctx.status = 200
		ctx.body = correios
		return next()
	} catch (err) {
		ctx.throw(err.status, err.message)
	}
}

router.get('/', home)
router.get('/cep/:cep', find)

module.exports = router

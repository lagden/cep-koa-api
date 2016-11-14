'use strict'

const crypto = require('crypto')
const debug = require('debug')
const consulta = require('lagden-cep')
const Router = require('koa-router')
const redis = require('./redis')

const log = debug('cep:log')
const error = debug('cep:error')
const router = new Router()

function cleanup(cep) {
	return cep.replace(/[^\d]/g, '')
}

function home(ctx) {
	ctx.body = {
		usage: '/cep/04080012'
	}
}

async function findOnRedis(ctx, next) {
	const cep = cleanup(ctx.params.cep)
	log('consulta via redis', cep)
	let r = await redis.get(cep)
	r = JSON.parse(r)
	log('parse redis', r)
	if (r && r.success) {
		ctx.body = r
	} else {
		log('não encontrou nada no redis, então chama o next')
		ctx.cep = cep
		return next()
	}
}

async function findOnCorreios(ctx) {
	log('consulta via correios', ctx.cep)
	try {
		const r = await consulta(ctx.cep)
		log('consulta body', ctx.cep, r)
		const rs = JSON.stringify(r)
		await redis.set(ctx.cep, rs)
		ctx.response.etag = crypto.createHash('md5').update(rs).digest('hex')
		ctx.body = r
	} catch (err) {
		error('consulta correios catch', ctx.cep, err)
		ctx.status = err.status
		ctx.body = err
	}
}

router.get('/', home)
router.get('/cep/:cep', findOnRedis, findOnCorreios)

module.exports = router

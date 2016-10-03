'use strict';

const debug = require('debug');
const consulta = require('lagden-cep');
const Router = require('koa-router');
const redis = require('./redis');

const logApi = debug('cepApp');
const router = new Router();

function cleanup(cep) {
	return cep.replace(/[^\d]/g, '');
}

function home(ctx) {
	ctx.body = 'usage: /cep/04080012';
}

async function findOnRedis(ctx, next) {
	const cep = cleanup(ctx.params.cep);
	//
	logApi('consulta via redis', cep);
	//
	let r = await redis.get(cep);
	r = JSON.parse(r);
	//
	logApi('parse redis', r);
	//
	if (r && r.success) {
		ctx.body = r;
	} else {
		//
		logApi('não encontrou nada no redis então vai pro next');
		//
		ctx.cep = cep;
		return next();
	}
}

async function findOnCorreios(ctx) {
	//
	logApi('consulta api correios', ctx.cep);
	//
	let r;
	try {
		r = await consulta(ctx.cep);
		await redis.set(ctx.cep, JSON.stringify(r));
	} catch (err) {
		//
		logApi('consulta api CATCH!!', ctx.cep);
		//
		r = err;
	}
	//
	logApi('consulta body', r);
	//
	ctx.body = r;
}

router.get('/', home);
router.get('/cep/:cep', findOnRedis, findOnCorreios);

module.exports = router;

'use strict';

const debug = require('debug');
const consulta = require('lagden-cep');
const redis = require('./redis');

const logApi = debug('api');
const methods = {
	home(ctx) {
		ctx.body = 'usage: /cep/04080012';
	},
	async findOnRedis(ctx, cep, next) {
		//
		logApi('consulta via redis');
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
			await next();
		}
	},
	async findOnCorreios(ctx, cep) {
		//
		logApi('consulta api correios', cep);
		//
		let r;
		try {
			r = await consulta(cep);
			redis.set(cep, JSON.stringify(r));
		} catch (err) {
			//
			logApi('consulta api CATCH!!', cep);
			//
			r = err;
		}
		//
		logApi('consulta body', r);
		//
		ctx.body = r;
	}
};

module.exports = methods;

'use strict'

import test from 'ava'
import request from 'supertest'
import app from '../app'
import redis from '../app/redis'

const koa = request.agent(app.listen(3009))

test('home', async t => {
	const r = await koa.get('/')
	t.is(r.status, 200)
	t.is(r.body.usage, '/cep/04080012')
})

test('consulta + redis', async t => {
	// remove do redis
	redis.del('01310200')

	// Consulta
	const c = await koa.get('/cep/01310200')
	t.is(c.status, 200)
	t.true(c.body.success)
	t.is(c.body.end, 'Avenida Paulista')

	// Redis
	const r = await koa.get('/cep/01310200')
	t.is(r.status, 200)
	t.true(r.body.success)
	t.is(r.body.end, 'Avenida Paulista')
})

test('dash', async t => {
	const r = await koa.get('/cep/01310-200')
	t.is(r.status, 200)
	t.true(r.body.success)
	t.is(r.body.end, 'Avenida Paulista')
})

test('not found', async t => {
	const r = await koa.get('/cep/00000-000')
	t.is(r.status, 404)
	t.false(r.body.success)
	t.is(r.body.message, 'CEP não encontrado')
})

test('invalid', async t => {
	const r = await koa.get('/cep/1234567')
	t.is(r.status, 400)
	t.false(r.body.success)
	t.is(r.body.message, 'CEP deve conter 8 dígitos')
})

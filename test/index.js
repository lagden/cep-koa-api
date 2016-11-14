'use strict'

import {resolve} from 'path'
import test from 'ava'
import redis from '../app/redis'
import superkoa from './helpers/superkoa'

const app = resolve('../app/.')

test('home', async t => {
	const r = await superkoa(app).get('/')
	t.is(r.status, 200)
	t.is(r.body.usage, '/cep/04080012')
})

test('consulta + redis', async t => {
	redis.del('01310200')
	// Consulta
	const c = await superkoa(app).get('/cep/01310200')
	t.is(c.status, 200)
	t.true(c.body.success)
	t.is(c.body.end, 'Avenida Paulista')
	// Redis
	const r = await superkoa(app).get('/cep/01310200')
	t.is(r.status, 200)
	t.true(r.body.success)
	t.is(r.body.end, 'Avenida Paulista')
})

test('dash', async t => {
	const r = await superkoa(app).get('/cep/01310-200')
	t.is(r.status, 200)
	t.true(r.body.success)
	t.is(r.body.end, 'Avenida Paulista')
})

test('not found', async t => {
	const r = await superkoa(app).get('/cep/00000-000')
	t.is(r.status, 404)
	t.false(r.body.success)
	t.is(r.body.message, 'CEP não encontrado')
})

test('invalid', async t => {
	const r = await superkoa(app).get('/cep/1234567')
	t.is(r.status, 400)
	t.false(r.body.success)
	t.is(r.body.message, 'CEP deve conter 8 dígitos')
})

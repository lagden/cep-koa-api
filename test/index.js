'use strict'

import test from 'ava'
import db from '../app/lib/db'
import koa from './helpers/server'

test('home', async t => {
	const r = await koa.get('/')
	t.is(r.status, 200)
	t.is(r.body.usage, '/cep/04080012')
})

test('consulta + cached', async t => {
	// Remove
	await db.del('01310200')

	// Consulta
	const c = await koa.get('/cep/01310200')
	t.is(c.status, 200)
	t.true(c.body.success)
	t.is(c.body.end, 'Avenida Paulista')

	// Cache
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
	const [{message}] = r.body.errors
	t.is(r.status, 404)
	t.is(message, 'CEP não encontrado')
})

test('invalid', async t => {
	const r = await koa.get('/cep/1234567')
	const [{message}] = r.body.errors
	t.is(r.status, 400)
	t.is(message, 'CEP deve conter 8 dígitos')
})

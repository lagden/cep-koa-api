'use strict'

import test from 'ava'
import Cache from '../app/lib/cache'
import koa from './helpers/server'

const query = `
query Consulta($cep: String!) {
  consulta(cep: $cep) {
    endereco: end
    cidade
    uf
  }
}`

async function _cleanup() {
	const _cache = new Cache({
		keyPrefix: 'cepkoa',
		namespace: 'api'
	})
	await _cache.clear()
}

test.before(_cleanup)
test.after(_cleanup)

test('home', async t => {
	const r = await koa.get('/')
	t.is(r.status, 200)
	t.is(r.body.usage, '/cep/04080012')
})

test('consulta + cache', async t => {
	const c = await koa.get('/cep/01310200')
	t.is(c.status, 200)
	t.true(c.body.success)
	t.is(c.body.end, 'Avenida Paulista')

	const r = await koa.get('/cep/01310200')
	t.is(r.status, 200)
	t.true(r.body.success)
	t.is(r.body.end, 'Avenida Paulista')
})

test('dash', async t => {
	const r = await koa.get('/cep/04080-012')
	t.is(r.status, 200)
	t.true(r.body.success)
	t.is(r.body.end, 'Avenida Jurucê')
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

test('bodyparser', async t => {
	const r = await koa
		.post('/gql')
		.set('content-type', 'application/json')
		.send('apenas um show...')
	const [{message}] = r.body.errors
	t.is(r.status, 422)
	t.is(message, 'body parse error')
})

test('gql', async t => {
	const data = Object.create(null)
	data.query = query
	data.variables = {cep: '04653055'}
	data.operationName = 'Consulta'
	const r = await koa
		.post('/gql')
		.set('content-type', 'application/json')
		.send(data)
	const {endereco} = r.body.data.consulta
	t.is(r.status, 200)
	t.is(endereco, 'Rua Amália Cerelo Godespoti')
})

test('gql 404', async t => {
	const data = Object.create(null)
	data.query = query
	data.variables = {cep: '00000000'}
	data.operationName = 'Consulta'
	const r = await koa
		.post('/gql')
		.set('content-type', 'application/json')
		.send(data)
	const [{message}] = r.body.errors
	t.is(r.status, 404)
	t.is(message, 'CEP não encontrado')
})

test('gql 500', async t => {
	const r = await koa
		.post('/gql')
		.set('content-type', 'application/json')
		.send({})
	const [{message}] = r.body.errors
	t.is(r.status, 500)
	t.is(message, 'Must provide Source. Received: undefined')
})

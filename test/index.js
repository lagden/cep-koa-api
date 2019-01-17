'use strict'

import test from 'ava'
import cache from '../src/lib/cache'
import app from './helpers/server'

const query = `
query Consulta($cep: String!) {
  consulta(cep: $cep) {
    endereco: end
    cidade
    uf
  }
}`

async function _cleanup() {
	await cache.clear()
}

test.before(_cleanup)
test.after(_cleanup)

test('bodyparser', async t => {
	let r
	try {
		r = await app
			.post('/gql')
			.set('content-type', 'application/json')
			.send('apenas um show...')
	} catch (error) {
		r = error
	}

	const [{message}] = r.body.errors
	t.is(r.status, 400)
	t.is(message, 'invalid JSON, only supports object and array')
})

test('200', async t => {
	const data = Object.create(null)
	data.query = query
	data.variables = {cep: '04653055'}
	data.operationName = 'Consulta'
	const r = await app
		.post('/gql')
		.set('content-type', 'application/json')
		.send(data)
	const {endereco} = r.body.data.consulta
	t.is(r.status, 200)
	t.is(endereco, 'Rua Amália Cerelo Godespoti')
})

test('cache', async t => {
	const data = Object.create(null)
	data.query = query
	data.variables = {cep: '04653055'}
	data.operationName = 'Consulta'
	const r = await app
		.post('/gql')
		.set('content-type', 'application/json')
		.send(data)
	const {endereco} = r.body.data.consulta
	t.is(r.status, 200)
	t.is(endereco, 'Rua Amália Cerelo Godespoti')
})

test('404', async t => {
	const data = Object.create(null)
	data.query = query
	data.variables = {cep: '00000000'}
	data.operationName = 'Consulta'
	let r
	try {
		r = await app
			.post('/gql')
			.set('content-type', 'application/json')
			.send(data)
	} catch (error) {
		r = error
	}

	const [{message}] = r.body.errors
	t.is(r.status, 404)
	t.is(message, 'CEP não encontrado')
})

test('400', async t => {
	const data = Object.create(null)
	data.query = query
	data.variables = {cep: '1234567'}
	data.operationName = 'Consulta'
	let r
	try {
		r = await app
			.post('/gql')
			.set('content-type', 'application/json')
			.send(data)
	} catch (error) {
		r = error
	}

	const [{message}] = r.body.errors
	t.is(r.status, 400)
	t.is(message, 'CEP deve conter 8 dígitos')
})

test('500', async t => {
	let r
	try {
		r = await app
			.post('/gql')
			.set('content-type', 'application/json')
			.send({})
	} catch (error) {
		r = error
	}

	const [{message}] = r.body.errors
	t.is(r.status, 500)
	t.is(message, 'Must provide Source. Received: undefined')
})

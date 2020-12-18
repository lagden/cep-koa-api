'use strict'

const test = require('ava')
const db = require('../server/lib/db')
const app = require('./helpers/server')

const query = `
query Consulta($cep: String!) {
  consulta(cep: $cep) {
    bairro
    endereco: end
    cidade
    uf
  }
}`

async function _cleanup() {
	await db.clear()
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

test('404 -> 400', async t => {
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

	// const [{message}] = r.body.errors
	t.is(r.status, 400)
	// t.is(message, 'CEP não encontrado')
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

	// const [{message}] = r.body.errors
	t.is(r.status, 400)
	// t.is(message, 'CEP deve conter 8 dígitos')
})

test('500', async t => {
	const result = await app
		.post('/gql')
		.set('content-type', 'application/json')
		.send({})

	const [{message}] = result.body.errors
	t.is(result.status, 500)
	t.is(message, 'Body must be a string. Received: undefined.')
})

test('200 Bairro', async t => {
	const data = Object.create(null)
	data.query = query
	data.variables = {cep: '02226-040'}
	data.operationName = 'Consulta'
	const r = await app
		.post('/gql')
		.set('content-type', 'application/json')
		.send(data)
	const {bairro} = r.body.data.consulta
	t.is(r.status, 200)
	t.is(bairro, 'Jardim Brasil (Zona Norte)')
})

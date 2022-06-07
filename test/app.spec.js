import test from 'ava'
import got from 'got'
import server from './helper/server.js'

const query = `
query Consulta($cep: String!) {
  consulta(cep: $cep) {
    bairro
    cep
    cidade
    complemento
    complemento2
    end
    endereco
    id
    status
    success
    uf
  }
}`

test.before(async t => {
	t.context.baseUrl = await server()
})

test('04653055', async t => {
	const json = {}
	json.query = query
	json.variables = {cep: '04653055'}
	json.operationName = 'Consulta'
	const r = await got.post(`${t.context.baseUrl}/gql`, {
		throwHttpErrors: false,
		responseType: 'json',
		json,
	})

	const {consulta} = r.body.data
	t.is(r.statusCode, 200)
	t.snapshot(consulta)
})

test('cache', async t => {
	const json = {}
	json.query = query
	json.variables = {cep: '04653055'}
	json.operationName = 'Consulta'
	const r = await got.post(`${t.context.baseUrl}/gql`, {
		throwHttpErrors: false,
		responseType: 'json',
		json,
	})

	const {consulta} = r.body.data
	t.is(r.statusCode, 200)
	t.snapshot(consulta)
})

test('400', async t => {
	const json = {}
	json.query = query
	json.variables = {cep: '00000000'}
	json.operationName = 'Consulta'
	const r = await got.post(`${t.context.baseUrl}/gql`, {
		throwHttpErrors: false,
		responseType: 'json',
		json,
	})

	t.is(r.statusCode, 400)
	t.snapshot(r.body.errors)
})

test('error', async t => {
	const json = {}
	json.query = query
	json.variables = {}
	json.operationName = 'Nope'
	const r = await got.post(`${t.context.baseUrl}/gql`, {
		throwHttpErrors: false,
		responseType: 'json',
		json,
	})

	t.is(r.statusCode, 500)
	t.snapshot(r.body)
})

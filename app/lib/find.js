'use strict'

const consulta = require('@tadashi/cep')
const Cache = require('./cache')

const _cache = new Cache({
	keyPrefix: 'cepkoa',
	namespace: 'api'
})

function _cleanup(cep) {
	return cep.replace(/[^\d]/g, '')
}

async function find(_cep) {
	const cep = _cleanup(_cep)
	try {
		const cache = await _cache.get(cep)
		if (cache) {
			return cache
		}
		const res = await consulta(cep)
		await _cache.set(cep, res, 2592000000000)
		return res
	} catch (err) {
		throw err
	}
}

module.exports = find

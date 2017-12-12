'use strict'

const consulta = require('@tadashi/cep')
const cache = require('./cache')

function _cleanup(cep) {
	return cep.replace(/[^\d]/g, '')
}

async function find(_cep) {
	try {
		const cep = _cleanup(_cep)
		const fromCache = await cache.get(cep)
		if (fromCache) {
			return fromCache
		}
		const res = await consulta(cep)
		await cache.set(cep, res)
		return res
	} catch (err) {
		throw err
	}
}

module.exports = find

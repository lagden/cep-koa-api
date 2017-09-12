'use strict'

const consulta = require('lagden-cep')
const debug = require('./debug')
const db = require('./db')

function _cleanup(cep) {
	return cep.replace(/[^\d]/g, '')
}

async function _findDB(cep) {
	try {
		const cache = await db.get(cep)
		return JSON.parse(cache.toString())
	} catch (err) {
		debug.error(`findDB: ${err.message}`)
		return false
	}
}

async function find(_cep) {
	const cep = _cleanup(_cep)
	try {
		const cache = await _findDB(cep)
		if (cache) {
			return cache
		}
		const correios = await consulta(cep)
		await db.put(cep, JSON.stringify(correios))
		return correios
	} catch (err) {
		throw err
	}
}

module.exports = find

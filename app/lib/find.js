'use strict'

const consulta = require('lagden-cep')
const debug = require('./debug')
const db = require('./db')

function _cleanup(cep) {
	return cep.replace(/[^\d]/g, '')
}

async function _findDB(cep) {
	try {
		const value = await db.get(cep)
		if (value) {
			return JSON.parse(value)
		}
	} catch (err) {
		debug.error(`_findDB: ${err.message}`)
	}
	return false
}

async function find(_cep) {
	const cep = _cleanup(_cep)
	try {
		const cache = await _findDB(cep)
		if (cache) {
			return cache
		}
		const value = await consulta(cep)
		await db.set(cep, JSON.stringify(value))
		return value
	} catch (err) {
		throw err
	}
}

module.exports = find

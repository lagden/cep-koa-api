'use strict'

const consulta = require('@tadashi/cep')
const debug = require('./debug')
const db = require('./db')

function _cleanup(cep) {
	return cep.replace(/[^\d]/g, '')
}

async function find(_cep) {
	const cep = _cleanup(_cep)
	const cepBuf = Buffer.from(cep)

	debug.log('level --> db.isOpen()', db.isOpen())

	if (db.isOpen() === false) {
		await db.open()
	}

	let fromCache
	try {
		fromCache = await db.get(cepBuf)
	} catch (error) {
		debug.error('level -->', error)
	}

	if (fromCache) {
		return fromCache
	}

	const res = await consulta(cep)
	await db.put(cepBuf, res)
	return res
}

module.exports = find
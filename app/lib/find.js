'use strict'

const consulta = require('lagden-cep')
const debug = require('./debug')
const db = require('./db')

const _get = k => new Promise((resolve, reject) => {
	db.get(k, (err, nodes) => {
		if (err) {
			reject(err)
		} else {
			resolve(nodes)
		}
	})
})

const _put = (k, v) => new Promise((resolve, reject) => {
	db.put(k, v, err => {
		if (err) {
			reject(err)
		} else {
			resolve()
		}
	})
})

function _cleanup(cep) {
	return cep.replace(/[^\d]/g, '')
}

async function _findDB(cep) {
	try {
		const [{value}] = await _get(cep)
		return JSON.parse(value)
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
		await _put(cep, JSON.stringify(correios))
		return correios
	} catch (err) {
		throw err
	}
}

module.exports = find

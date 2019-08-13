'use strict'

const names = require('../../lib/find')

function consulta(_root, {cep}) {
	return find(cep)
}

module.exports = {
	Query: {
		consulta
	}
}

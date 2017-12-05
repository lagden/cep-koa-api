'use strict'

const {GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLNonNull, GraphQLInt} = require('graphql')
const find = require('../lib/find')

const dados = new GraphQLObjectType({
	name: 'dados',
	description: 'Payload de retorno da consulta',
	fields: {
		cep: {type: GraphQLString},
		end: {type: GraphQLString},
		complemento: {type: GraphQLString},
		complemento2: {type: GraphQLString},
		bairro: {type: GraphQLString},
		cidade: {type: GraphQLString},
		uf: {type: GraphQLString},
		id: {type: GraphQLString},
		success: {type: GraphQLBoolean},
		status: {type: GraphQLInt}
	}
})

const Query = new GraphQLObjectType({
	name: 'Query',
	description: 'Métodos de consulta',
	fields: {
		consulta: {
			description: 'Consulta o número do CEP',
			type: dados,
			args: {
				cep: {type: new GraphQLNonNull(GraphQLString)}
			},
			async resolve(_root, {cep}, ctx) {
				try {
					const dados = await find(cep)
					return dados
				} catch (err) {
					ctx.state.status = err.status
					throw err
				}
			}
		}
	}
})

module.exports = Query

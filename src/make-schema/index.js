'use strict'

const {join} = require('path')
const {readFileSync} = require('fs')
const {makeExecutableSchema} = require('graphql-tools')
const resolvers = require('./resolvers')

const typeDefs = readFileSync(join(__dirname, 'schema.graphql'), {encoding: 'utf8'})
const schema = makeExecutableSchema({
	typeDefs,
	resolvers
})

module.exports = schema


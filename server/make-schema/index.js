'use strict'

const {resolve} = require('path')
const {loadSchemaSync} = require('@graphql-tools/load')
const {GraphQLFileLoader} = require('@graphql-tools/graphql-file-loader')
const {addResolversToSchema} = require('@graphql-tools/schema')

const resolvers = require('./resolvers')
const schema = loadSchemaSync(resolve(__dirname, 'schema.graphql'), {loaders: [new GraphQLFileLoader()]})

const schemaWithResolvers = addResolversToSchema({
	schema,
	resolvers
})

module.exports = schemaWithResolvers

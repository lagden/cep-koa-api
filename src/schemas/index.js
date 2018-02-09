'use strict'

const {GraphQLSchema} = require('graphql')
const Query = require('./query')

const schema = new GraphQLSchema({
	query: Query
})

module.exports = schema

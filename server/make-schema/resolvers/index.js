'use strict'

const {readdirSync} = require('fs')
const {join} = require('path')
const merge = require('lodash.merge')

const pattern = /^_[\w-_]+\.js/
const files = readdirSync(__dirname).filter(f => pattern.test(f)).map(f => join(__dirname, f))
const resolvers = Object.create(null)

for (const file of files) {
	merge(resolvers, require(file))
}

module.exports = resolvers

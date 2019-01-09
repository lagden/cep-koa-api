'use strict'

const {readdirSync} = require('fs')
const {join} = require('path')
const compose = require('koa-compose')

function _nodeV() {
	const {node} = process.versions
	return Number(node.replace(/[^\d]/g, ''))
}

function getFiles() {
	const nodev = _nodeV()
	const pattern = /^_[\w-_]+\.js/
	if (nodev >= 10110) {
		return readdirSync(__dirname, {withFileTypes: true}).filter(f => pattern.test(f.name)).map(f => join(__dirname, f.name))
	}
	return readdirSync(__dirname, {withFileTypes: false}).filter(f => pattern.test(f)).map(f => join(__dirname, f))
}

const files = getFiles()
const middleware = []

for (const file of files) {
	const router = require(file)
	middleware.push(router.routes())
	middleware.push(router.allowedMethods({throw: true}))
}

module.exports = compose(middleware)

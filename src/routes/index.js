'use strict'

const {join} = require('path')
const globby = require('globby')
const compose = require('koa-compose')

const pattern = join(__dirname, '_*.js')
const files = globby.sync(pattern)
const rotas = new Array(files.length)

for (const file of files) {
	rotas.push(require(file))
}

const middleware = []

rotas.forEach(router => {
	middleware.push(router.routes())
	middleware.push(router.allowedMethods({throw: true}))
})

module.exports = compose(middleware)

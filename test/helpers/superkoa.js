/* eslint import/no-dynamic-require: 0 */

'use strict'

require('babel-register')({
	plugins: ['transform-async-to-generator']
})

const sap = require('supertest-as-promised')

module.exports = appPath => {
	const koa = require(appPath)
	return sap.agent(koa.listen())
}

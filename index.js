'use strict'

const http = require('http')
const got = require('got')
const debug = require('./app/lib/debug')
const app = require('./app/.')

const port = process.env.PORT || 5000
http
	.createServer(app.callback())
	.listen(port, () => {
		debug.log(`on ${port}`)
		// Avoid Idling
		setInterval(() => {
			got('https://api-cep.herokuapp.com/cep/09771001')
				.then(response => {
					debug.log(response.body)
				})
				.catch(err => {
					debug.error(err.response.body)
				})
		}, 60 * 1000)
	})

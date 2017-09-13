'use strict'

const http = require('http')
const got = require('got')
const debug = require('./app/lib/debug')
const app = require('./app/.')

const {RUN_HEROKU, NODE_ENV, PORT = 3000} = process.env
http
	.createServer(app.callback())
	.listen(PORT, () => {
		debug.log(`on ${PORT}`)
		if (NODE_ENV === 'production' && Number(RUN_HEROKU) === 1) {
			setInterval(() => {
				got('https://api-cep.herokuapp.com/cep/09771001')
					.then(response => {
						debug.log(response.body)
					})
					.catch(err => {
						debug.error(err.response.body)
					})
			}, 60 * 1000)
		}
	})

'use strict'

const http = require('http')
const debug = require('@tadashi/debug')
const app = require('./app/.')

const {PORT = 3000} = process.env

const server = http.createServer(app.callback())
server.listen(PORT, () => {
	debug.log(`Server listening on port ${server.address().port}`)
})

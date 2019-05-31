'use strict'

const app = require('./app')
const debug = require('./lib/debug')

const {PORT = 3000} = process.env

app.listen(PORT, () => {
	debug.log(`Server listening on port ${PORT}`)
})

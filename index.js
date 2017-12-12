'use strict'

const debug = require('@tadashi/debug')('cep-api')
const app = require('./app/.')

const {PORT = 3000} = process.env

app.listen(PORT, () => {
	debug.log(`Server listening on port ${PORT}`)
})

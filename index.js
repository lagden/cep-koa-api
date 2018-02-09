'use strict'

const debug = require('@tadashi/debug')('cep-api')
const app = require('./src/.')

const {PORT = 3000} = process.env

app.listen(PORT, () => {
	debug.log(`Server listening on port ${PORT}`)
})

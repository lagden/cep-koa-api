'use strict'

const app = require('./app')
const debug = require('./lib/debug')

const {
	PORT = 3000,
	PORT_PUBLISHED = 3000
} = process.env

app.listen(PORT, () => {
	debug.info('Server listening...')
	debug.info('-------------------')
	debug.info(`Local:    http://[::1]:${PORT}`)
	debug.info(`External: http://[::1]:${PORT_PUBLISHED}`)
})

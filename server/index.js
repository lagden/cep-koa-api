'use strict'

const {stdout} = process
const app = require('./app')

const {
	PORT = 3000,
	PORT_PUBLISHED = 3000
} = process.env

const PAD = '  '

app.listen(PORT, () => {
	stdout.write('Server is running!\n')
	stdout.write('------------------\n\n')
	stdout.write(PAD + `- Local:      http://127.0.0.1:${PORT}\n`)
	stdout.write(PAD + `- Network:    http://127.0.0.1:${PORT_PUBLISHED}\n`)
})

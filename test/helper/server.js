import hexId from '@tadashi/hex-id'
import toPort from 'hash-to-port'
import app from '../../server/app.js'

const port = toPort(hexId())

function server(p = port) {
	return new Promise(resolve => {
		app.listen(p, () => {
			resolve(`http://127.0.0.1:${p}`)
		})
	})
}

export default server

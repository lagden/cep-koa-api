import base from '@tadashi/koa-base'
import routes from './routes/index.js'
import * as debug from './lib/debug.js'

const app = base({
	error: true,
	cors: {
		credentials: true,
	},
})

app
	.use(routes)
	.on('error', debug.error)

app.proxy = true

export default app

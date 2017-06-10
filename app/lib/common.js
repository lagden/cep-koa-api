'use strict'

async function errorHandler(ctx, next) {
	try {
		await next()
	} catch (err) {
		/* istanbul ignore next */
		ctx.status = err.status || err.statusCode || 500
		ctx.body = {
			success: false,
			message: err.message
		}
		ctx.app.emit('error', err)
	}
}

function cleanup(cep) {
	return cep.replace(/[^\d]/g, '')
}

exports.errorHandler = errorHandler
exports.cleanup = cleanup

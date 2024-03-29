import cep from '@tadashi/cep'
import {find, caching} from '@tadashi/find-in-cache'

async function consulta(_root, {cep: code}) {
	code = code.replace(/\D/, '')

	const fromCache = await find(code)
	if (fromCache) {
		return fromCache
	}

	const response = await cep(code)
	await caching(code, response)

	return response
}

const Query = {
	consulta,
}

export {Query}

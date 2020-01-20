'use strict'

const test = require('ava')
const db = require('../server/lib/db')
const find = require('../server/lib/find')

async function _cleanup() {
	await db.clear()
}

test.before(_cleanup)
test.after(_cleanup)

test('db', async t => {
	await db.close()
	const r = await find('01311000')
	t.is(r.end, 'Avenida Paulista')
})

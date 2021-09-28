import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {readdirSync} from 'node:fs'
import merge from 'lodash.merge'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const pattern = /^_[\w-_]+\.js/
const files = readdirSync(__dirname).filter(f => pattern.test(f)).map(f => path.join(__dirname, f))
const resolvers = {}

const imports = []
for (const file of files) {
	imports.push(import(file))
}

for await (const mod of imports) {
	merge(resolvers, mod)
}

export default resolvers

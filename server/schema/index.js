import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {loadSchema} from '@graphql-tools/load'
import {GraphQLFileLoader} from '@graphql-tools/graphql-file-loader'
import {addResolversToSchema} from '@graphql-tools/schema'
import resolvers from './resolvers/index.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const schema = await loadSchema(path.resolve(__dirname, 'schema.graphql'), {
	loaders: [
		new GraphQLFileLoader(),
	],
})

const schemaWithResolvers = addResolversToSchema({
	schema,
	resolvers,
})

export default schemaWithResolvers

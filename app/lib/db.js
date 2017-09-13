'use strict'

// const {join} = require('path')
// const level = require('level')
// const mkdirp = require('mkdirp')

// const {NODE_ENV} = process.env
// const location = join(__dirname, '..', '..', 'data', `cep.${NODE_ENV}.db`)
// mkdirp.sync(location, {mode: 0o755})

// class Level {
// 	static get db() {
// 		return this._db
// 	}

// 	static set db(db) {
// 		this._db = db
// 	}

// 	static async conn() {
// 		if (this.db) {
// 			return this.db
// 		}
// 		try {
// 			this.db = level(location)
// 			return this.db
// 		} catch (err) {
// 			err.status = 500
// 			return Promise.reject(err)
// 		}
// 	}
// }

// module.exports = Level

const {join} = require('path')
const hyperdb = require('hyperdb')
const mkdirp = require('mkdirp')

const {NODE_ENV} = process.env
const location = join(__dirname, '..', '..', 'data', `cep.${NODE_ENV}.db`)
mkdirp.sync(location, {mode: 0o755})

const db = hyperdb(location, {valueEncoding: 'utf-8'})

module.exports = db

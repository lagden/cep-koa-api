'use strict'

const request = require('supertest')
const toPort = require('hash-to-port')
const hexID = require('@tadashi/hex-id')
const _app = require('../../server/app')

const app = request.agent(_app.listen(toPort(hexID())))

module.exports = app

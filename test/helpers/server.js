'use strict'

import request from 'supertest'
import toPort from 'hash-to-port'
import app from '../../app'

const hash = (Number(String(Math.random()).split('.')[1]) + Date.now()).toString(26)
const koa = request.agent(app.listen(toPort(hash)))

export default koa

'use strict'

import request from 'supertest'
import toPort from 'hash-to-port'
import app from '../../app'

const koa = request.agent(app.listen(toPort(Math.random())))

export default koa

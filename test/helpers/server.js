'use strict'

import request from 'supertest'
import toPort from 'hash-to-port'
import _app from '../../src/app'

const hash = (Number(String(Math.random()).split('.')[1]) + Date.now()).toString(26)
const app = request.agent(_app.listen(toPort(hash)))

export default app

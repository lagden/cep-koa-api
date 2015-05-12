/* global require, process */

'use strict';

var env = process.env.NODE_ENV || 'development';
var config, rHost, rPort, rPasswd, redisClient;

console.log(process.env);

if ('test' !== env) {
  if ('production' === env) {
    rHost   = process.env.RHOST;
    rPort   = process.env.RPORT;
    rPasswd = process.env.RPASS;
  } else {
    config  = require('./.redis.json');
    rHost   = config.host;
    rPort   = config.port;
    rPasswd = config.passwd;
  }
  redisClient = require('redis').createClient(
    rPort,
    rHost, {
      no_ready_check: true,
      auth_pass: rPasswd
    });
} else {
  redisClient = require('redis').createClient();
}

var app          = require('koa')();
var responseTime = require('koa-response-time');
var compress     = require('koa-compress');
var logger       = require('koa-logger');
var Router       = require('koa-router');
var router       = new Router(app);
var wrapper      = require('co-redis');
var redisCo      = wrapper(redisClient);
var genify       = require('thunkify-wrap').genify;
var correio      = require('io-cep');
var consulta     = genify(correio);

module.exports = app;

if ('test' !== env) {
  app.use(logger());
}

app
  .use(compress())
  .use(responseTime())
  .use(router.middleware())
  .get('/', function *() {
    this.redirect('/cep');
  })
  .get('/cep', function *() {
    this.body = 'usage: /cep/04080012';
  })
  .get(
    '/cep/:code',
    function *(next) {
      this.params.code = this.params.code.split('-').join('');
      this.cep = yield redisCo.get(this.params.code);
      yield next;
    },
    function *(next) {
      if(this.cep === null) {
        this.cep = yield consulta(this.params.code);
        yield next;
      } else {
        this.body = JSON.parse(this.cep);
      }
    },
    function *() {
      if(this.cep.success) {
        yield redisCo.set(this.params.code, JSON.stringify(this.cep));
      }
      this.body = this.cep;
    }
  );

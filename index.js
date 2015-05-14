/* global require, process */

'use strict';

var env = process.env.NODE_ENV || 'development';
var config, rHost, rPort, rPasswd, redisClient;

if ('test' === env || 'development' === env) {
  redisClient = require('redis').createClient();
} else {
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
}

var responseTime = require('koa-response-time');
var compress     = require('koa-compress');
var logger       = require('koa-logger');
var Router       = require('koa-router');
var favicon      = require('koa-favicon');
var cors         = require('koa-cors');
var app          = require('koa')();
var wrapper      = require('co-redis');
var redisCo      = wrapper(redisClient);
var consulta     = require('io-cep');
var router       = new Router(app);

module.exports = app;

if ('test' !== env) {
  app.use(logger());
}

app
  .use(favicon(__dirname + '/public/favicon.ico'))
  .use(cors())
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
    '/cep/:zipcode',
    function *(next) {
      this.params.zipcode = this.params.zipcode.split('-').join('');
      this.cep = yield redisCo.get(this.params.zipcode);
      yield next;
    },
    function *(next) {
      if(this.cep === null) {
        this.cep = yield consulta(this.params.zipcode);
        yield next;
      } else {
        this.body = JSON.parse(this.cep);
      }
    },
    function *() {
      if(this.cep.success) {
        yield redisCo.set(this.params.zipcode, JSON.stringify(this.cep));
      }
      this.body = this.cep;
    }
  );

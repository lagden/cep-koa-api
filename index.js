/* global require, process */

'use strict';

var env = process.env.NODE_ENV || 'development';
var config, redisOpts;

if ('production' === env) {
  redisOpts = {
    port: process.env.RPORT,
    host: process.env.RHOST,
    password: process.env.RPASS
  };
} else if ('development' === env) {
  config = require('./.redis.json');
  redisOpts = {
    port: config.port,
    host: config.host,
    password: config.passwd
  };
} else {
  redisOpts = {};
}

var Redis        = require('ioredis');
var consulta     = require('io-cep');
var responseTime = require('koa-response-time');
var compress     = require('koa-compress');
var logger       = require('koa-logger');
var Router       = require('koa-router');
var favicon      = require('koa-favicon');
var cors         = require('koa-cors');
var app          = require('koa')();
var router       = new Router(app);
var redis        = new Redis(redisOpts);

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
      this.cep = yield redis.get(this.params.zipcode);
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
        yield redis.set(this.params.zipcode, JSON.stringify(this.cep));
      }
      this.body = this.cep;
    }
  );

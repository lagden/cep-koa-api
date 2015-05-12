#!/usr/bin/env node --harmony

var api   = require('..');
var porta = 3000;

api.listen(porta);
console.log('Listening on %s', porta);

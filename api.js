/* global console */

'use strict';

var api   = require('./');
var porta = process.env.PORT || 5000;

api.listen(porta);
console.log('Listening on %s', porta);

'use strict';

require('babel-register')({
	plugins: ['transform-async-to-generator']
});

const api = require('./app/.');

api.listen(process.env.PORT || 3000);

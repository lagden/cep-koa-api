'use strict';

import test from 'ava';
import request from 'supertest-as-promised';
import api from '../api';

api.listen(3000);

test('cep', async t => {
	t.plan(1);
	const r = await request(api).get('/');
	console.log(r);
	t.is(r, 'usage: /cep/04080012');
});

// var app = require('../.');
// var request = require('supertest').agent(app.listen(3001));

// describe('GET /cep', function () {
// 	this.timeout(5000);
// 	it('should respond with cep/:code valid', function(done) {
// 		request
// 			.get('/cep/04653055')
// 			.end(function(err, res) {
// 				if (err) {
// 					return done(err);
// 				}
// 				res.body.success.should.be.True;
// 				res.body.logradouro.should.be.equal('Rua Amália Cerelo Godespoti');
// 				Object.keys(res.body).should.eql([
// 					'logradouro',
// 					'bairro',
// 					'localidade',
// 					'uf',
// 					'cep',
// 					'success',
// 				]);
// 				done();
// 			});
// 	});

// 	it('should respond with cep/:code invalid', function(done) {
// 		request
// 			.get('/cep/00000000')
// 			.end(function(err, res) {
// 				if (err) {
// 					return done(err);
// 				}
// 				res.body.success.should.be.False;
// 				res.body.message.should.be.equal('CEP not found or parse error');
// 				Object.keys(res.body).should.eql([
// 					'success',
// 					'message',
// 				]);
// 				done();
// 			});
// 	});
// });

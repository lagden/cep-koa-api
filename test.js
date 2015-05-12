/* global describe, it */

'use strict';

var app = require('./index.js');
var request = require('supertest').agent(app.listen(3001));

describe('GET /cep', function() {
  it('should respond with cep/:code valid', function(done) {
    request
      .get('/cep/04080001')
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        Object.keys(res.body).should.eql([
          'logradouro',
          'bairro',
          'localidade',
          'uf',
          'cep',
          'success'
        ]);
        done();
      });
  });

  it('should respond with cep/:code invalid', function(done) {
    request
      .get('/cep/00000000')
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        Object.keys(res.body).should.eql([
          'success',
          'message'
        ]);
        done();
      });
  });
});

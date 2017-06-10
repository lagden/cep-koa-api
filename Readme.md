# CEP API Koa

[![Build Status][ci-img]][ci]
[![Coverage Status][coveralls-img]][coveralls]
[![Dependency Status][dep-img]][dep]
[![devDependency Status][devDep-img]][devDep]

[ci-img]:        https://travis-ci.org/lagden/cep-koa-api.svg
[ci]:            https://travis-ci.org/lagden/cep-koa-api
[coveralls-img]: https://coveralls.io/repos/github/lagden/cep-koa-api/badge.svg?branch=master
[coveralls]:     https://coveralls.io/github/lagden/cep-koa-api?branch=master
[dep-img]:       https://david-dm.org/lagden/cep-koa-api.svg
[dep]:           https://david-dm.org/lagden/cep-koa-api
[devDep-img]:    https://david-dm.org/lagden/cep-koa-api/dev-status.svg
[devDep]:        https://david-dm.org/lagden/cep-koa-api#info=devDependencies

Encontre os endereços através de busca por CEP


## Uso

Faça um request para:

`/cep/01310200` or `/cep/01310-200`


### API

#### `GET` /cep/:cep

Nome        | Tipo                 | Requerido | Descrição
----------- | -------------------- |:---------:| ------------
cep         | `string`             | sim       | Número para a consulta


## License

MIT © [Thiago Lagden](http://lagden.in)

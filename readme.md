# CEP API

[![Build Status][ci-img]][ci]
[![Coverage Status][coveralls-img]][coveralls]
[![XO code style][xo-img]][xo]
[![Greenkeeper badge][greenkeeper-img]][greenkeeper]

[ci-img]:          https://travis-ci.org/lagden/cep-koa-api.svg
[ci]:              https://travis-ci.org/lagden/cep-koa-api
[coveralls-img]:   https://coveralls.io/repos/github/lagden/cep-koa-api/badge.svg?branch=master
[coveralls]:       https://coveralls.io/github/lagden/cep-koa-api?branch=master
[xo-img]:          https://img.shields.io/badge/code_style-XO-5ed9c7.svg
[xo]:              https://github.com/sindresorhus/xo
[greenkeeper-img]: https://badges.greenkeeper.io/lagden/koa-error.svg
[greenkeeper]:     https://greenkeeper.io/


Encontre os endereços através do CEP


## Uso

Exemplo de uma consulta simples


**[POST] /gql**


```graphql
{
  consulta(cep: "01310200") {
    endereco: end
    cidade
    uf
  }
}
```


```shell
curl 'https://api.nimble.com.br/cep/v1/gql' \
-H 'content-type: application/json' \
-d '{
  "query": "{consulta(cep: \"01310200\") { success, endereco: end, cidade, uf }}",
  "variables": "",
  "operationName": ""
}' --compressed
```


## License

MIT © [Thiago Lagden](http://lagden.in)

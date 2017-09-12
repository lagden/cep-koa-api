# CEP API Koa

[![NPM version][npm-img]][npm]
[![Build Status][ci-img]][ci]
[![Coverage Status][coveralls-img]][coveralls]
[![Dependency Status][dep-img]][dep]
[![devDependency Status][devDep-img]][devDep]

[![XO code style][xo-img]][xo]
[![Greenkeeper badge][greenkeeper-img]][greenkeeper]

[ci-img]:          https://travis-ci.org/lagden/cep-koa-api.svg
[ci]:              https://travis-ci.org/lagden/cep-koa-api
[coveralls-img]:   https://coveralls.io/repos/github/lagden/cep-koa-api/badge.svg?branch=master
[coveralls]:       https://coveralls.io/github/lagden/cep-koa-api?branch=master
[dep-img]:         https://david-dm.org/lagden/cep-koa-api.svg
[dep]:             https://david-dm.org/lagden/cep-koa-api
[devDep-img]:      https://david-dm.org/lagden/cep-koa-api/dev-status.svg
[devDep]:          https://david-dm.org/lagden/cep-koa-api#info=devDependencies
[xo-img]:          https://img.shields.io/badge/code_style-XO-5ed9c7.svg
[xo]:              https://github.com/sindresorhus/xo
[greenkeeper-img]: https://badges.greenkeeper.io/lagden/koa-error.svg
[greenkeeper]:     https://greenkeeper.io/

Encontre os endereços através do CEP


## Endpoint

https://api-cep.herokuapp.com


## Uso

Você pode utilizar com GraphQL ou REST

---

[POST] /gql

### query

```graphql
{
  consulta(cep: "01310200") {
    endereco: end
    cidade
    uf
  }
}`

#### Response 200

```json
{
  "data": {
    "consulta": {
      "endereco": "Avenida Paulista",
      "cidade": "São Paulo",
      "uf": "SP"
    }
  }
}

---

[GET] /cep/:cep

Exemplo: https://api-cep.herokuapp.com/cep/01310200

#### Response 200

```json
{
  bairro: 'Bela Vista',
  cep: '01310200',
  cidade: 'São Paulo',
  complemento: '',
  complemento2: '- de 1512 a 2132 - lado par',
  end: 'Avenida Paulista',
  id: '0',
  uf: 'SP',
  success: true,
  status: 200
}

---

Exemplo: https://api-cep.herokuapp.com/cep/00000000

#### Response 404

```json
{
  data: null,
  errors: [{
    message: 'CEP não encontrado'
  }]
}
```

---

Exemplo: https://api-cep.herokuapp.com/cep/1234567

#### Response 400

```json
{
  data: null,
  errors: [{
    message: 'CEP deve conter 8 dígitos'
  }]
}
```


## License

MIT © [Thiago Lagden](http://lagden.in)

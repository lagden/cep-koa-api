# CEP API

[![Docker Size][docker-img]][docker]
[![Docker Status][dockerv-img]][dockerv]

[![Build Status][ci-img]][ci]
[![Coverage Status][coveralls-img]][coveralls]
[![Greenkeeper badge][greenkeeper-img]][greenkeeper]
[![XO code style][xo-img]][xo]

[docker-img]:          https://images.microbadger.com/badges/image/lagden/cep_consulta:release-6.3.0.svg
[docker]:              https://microbadger.com/images/lagden/cep_consulta:release-6.3.0
[dockerv-img]:         https://images.microbadger.com/badges/version/lagden/cep_consulta:release-6.3.0.svg
[dockerv]:             https://microbadger.com/images/lagden/cep_consulta:release-6.3.0
[ci-img]:              https://travis-ci.org/lagden/cep-koa-api.svg
[ci]:                  https://travis-ci.org/lagden/cep-koa-api
[coveralls-img]:       https://coveralls.io/repos/github/lagden/cep-koa-api/badge.svg?branch=master
[coveralls]:           https://coveralls.io/github/lagden/cep-koa-api?branch=master
[xo-img]:              https://img.shields.io/badge/code_style-XO-5ed9c7.svg
[xo]:                  https://github.com/sindresorhus/xo
[greenkeeper-img]:     https://badges.greenkeeper.io/lagden/koa-error.svg
[greenkeeper]:         https://greenkeeper.io/


Encontre os endereços através do CEP.


## Desenvolvimento

Existem duas maneiras de trabalhar no desenvolvimento desse projeto:

- Via Docker
- Local


### Via Docker

```
$ bin/start -bd
```

- `-b` para construir (build) a imagem
- `-d` para rodar em background (daemon)


```
$ bin/stop
```

Termina todos os containers que estão rodando.


### Local

Precisa do [Redis Server](https://redis.io/download) instalado e rodando.

```
$ npm i
$ npm start
```


## Docker

Essa API está disponível Docker Hub: https://hub.docker.com/r/lagden/cep_consulta/

```shell
docker pull lagden/cep_consulta
```


## Uso

Endpoint: https://api.nimble.com.br/cep/v1/gql

---

Exemplo de uma consulta: https://graphqlbin.com/Q1X0iB


```graphql
query ConsultaCEP($cep: String!) {
  consulta(cep: $cep) {
    endereco: end
    bairro
    cidade
    uf
  }
}
```


```shell
curl 'https://api.nimble.com.br/cep/v1/gql' \
-H 'content-type: application/json' \
-d '{
  "query": "query ConsultaCEP($cep: String!) { consulta(cep: $cep) { endereco: end, bairro, cidade, uf } }",
  "variables": {"cep": "09715-295"},
  "operationName": "ConsultaCEP"
}' --compressed
```


```json
{
  "data": {
    "consulta": {
      "endereco": "Rua Primo Modolin",
      "bairro": "Centro",
      "cidade": "São Bernardo do Campo",
      "uf": "SP"
    }
  }
}
```


## License

MIT © [Thiago Lagden](http://lagden.in)

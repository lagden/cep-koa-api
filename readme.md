# CEP API

[![Docker Size][docker-img]][docker]
[![Docker Status][dockerv-img]][dockerv]
[![Docker Release][dockerelease-img]][dockerelease]

[![Build Status][ci-img]][ci]
[![Coverage Status][coveralls-img]][coveralls]
[![XO code style][xo-img]][xo]
[![Snyk badge][snyk-img]][snyk]

[docker-img]:          https://images.microbadger.com/badges/image/lagden/cep_consulta:latest.svg
[docker]:              https://microbadger.com/images/lagden/cep_consulta:latest
[dockerv-img]:         https://images.microbadger.com/badges/version/lagden/cep_consulta:latest.svg
[dockerv]:             https://microbadger.com/images/lagden/cep_consulta:latest
[dockerelease-img]:    https://img.shields.io/docker/v/lagden/cep_consulta/release-7.1.0
[dockerelease]:        https://hub.docker.com/r/lagden/cep_consulta
[ci-img]:              https://travis-ci.org/lagden/cep-koa-api.svg
[ci]:                  https://travis-ci.org/lagden/cep-koa-api
[coveralls-img]:       https://coveralls.io/repos/github/lagden/cep-koa-api/badge.svg?branch=master
[coveralls]:           https://coveralls.io/github/lagden/cep-koa-api?branch=master
[xo-img]:              https://img.shields.io/badge/code_style-XO-5ed9c7.svg
[xo]:                  https://github.com/sindresorhus/xo
[snyk-img]:            https://snyk.io/test/github/lagden/cep-koa-api/badge.svg
[snyk]:                https://snyk.io/test/github/lagden/cep-koa-api


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

```
$ npm i
$ npm start
```


## Docker

Essa API está disponível Docker Hub: https://hub.docker.com/r/lagden/cep_consulta/

```shell
docker pull lagden/cep_consulta
```


### Docker Compose

Exemplo de um `docker-compose.yml`

```yaml
version: '3.7'

services:
  api:
    image: lagden/cep_consulta:latest
    command: ["node", "server"]
    environment:
      NODE_ENV: production
      PORT: 3000
      DEBUG: cepkoa:error,cepkoa:info
      DEBUG_PREFIX: cepkoa
      DEBUG_COLORS: 1
      DEBUG_HIDE_DATE: 0
    ports:
      - 30008:3000
    volumes:
      - data:/home/node/app/data
    deploy:
      replicas: 1
      restart_policy:
        condition: on-failure

volumes:
  data:
    name: cep_consulta_node_data
```


## Uso

Endpoint: https://service.exemplo.com.br/cep/v1/gql


```graphql
query Consulta($cep: String!) {
  consulta(cep: $cep) {
    endereco: end
    bairro
    cidade
    uf
  }
}
```


```shell
curl 'https://service.exemplo.com.br/cep/v1/gql' \
-H 'content-type: application/json' \
-d '{
  "query": "query Consulta($cep: String!) { consulta(cep: $cep) { endereco: end, bairro, cidade, uf } }",
  "variables": {"cep": "01311-000"},
  "operationName": "Consulta"
}' --compressed
```


```json
{
  "data": {
    "consulta": {
      "endereco": "Avenida Paulista",
      "bairro": "Bela Vista",
      "cidade": "São Paulo",
      "uf": "SP"
    }
  }
}
```


## License

MIT © [Thiago Lagden](http://lagden.in)

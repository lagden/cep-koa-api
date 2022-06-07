# CEP API

[![Docker Release][dockerelease-img]][dockerelease]
[![Node.js CI][ci-img]][ci]
[![Coverage Status][coveralls-img]][coveralls]
[![Snyk badge][snyk-img]][snyk]

[dockerelease-img]:    https://img.shields.io/docker/v/lagden/cep_consulta/release-8.1.0
[dockerelease]:        https://hub.docker.com/r/lagden/cep_consulta
[ci-img]:              https://github.com/lagden/cep-koa-api/actions/workflows/nodejs.yml/badge.svg
[ci]:                  https://github.com/lagden/cep-koa-api/actions/workflows/nodejs.yml
[coveralls-img]:       https://coveralls.io/repos/github/lagden/cep-koa-api/badge.svg?branch=master
[coveralls]:           https://coveralls.io/github/lagden/cep-koa-api?branch=master
[snyk-img]:            https://snyk.io/test/github/lagden/cep-koa-api/badge.svg
[snyk]:                https://snyk.io/test/github/lagden/cep-koa-api


Encontre os endereços através do CEP.

---

Essa API está disponível Docker Hub: https://hub.docker.com/r/lagden/cep_consulta/

```shell
docker pull lagden/cep_consulta
```

⚠️ **Importante**

[Redis](https://redis.io/) é requirido.


## Via Docker

Exemplo via Docker.

```
docker run --name cep-redis --network cep-network -d redis:6-alpine
docker run --name cep --network cep-network --host cep-redis -d lagden/cep_consulta:latest
```


## Via Compose

Exemplo de um `docker-compose.yml`

```yaml
version: "3.7"
services:
  redis:
    image: redis:6-alpine
    command: >
      --appendonly yes
    networks:
      - net
    volumes:
      - db:/data
    deploy:
      restart_policy:
        condition: on-failure

  app:
    image: docker.io/lagden/cep_consulta:release-8.1.0
    command: >
      /bin/ash -c "
        bin/helper/wait redis:6379;
        node server
      "
    environment:
      DEBUG_HIDE_DATE: 0
      DEBUG_COLORS: 1
      DEBUG_PREFIX: lagden_cep_consulta
      DEBUG: lagden_cep_consulta:error
      NODE_ENV: production
      APP_ENV: production
      APP_NS: lagden_cep_consulta
      PORT: 30008
      PORT_PUBLISHED: 30008
      VERSION: release-8.1.0
      #
      CACHE_REDIS_NAMESPACE: lagden_cep_consulta
      CACHE_REDIS_DB: 0
      CLEAR_CACHE_FIRST_RUN: 0
      #
      REDIS: redis:6379
      REDIS_HOST: redis
      REDIS_PORT: 6379
    ports:
      - 30008:30008
    networks:
      - net
    deploy:
      resources:
        limits:
          cpus: '0.50'
          memory: 200M
      restart_policy:
        condition: on-failure

networks:
  net:
    name: lagden_cep_consulta_net_production

volumes:
  db:
    name: lagden_cep_consulta_vol_production_db
```


## Uso

Endpoint: https://service.exemplo.com.br/cep/v1/gql


```graphql
query Consulta($cep: String!) {
  consulta(cep: $cep) {
    endereco
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
  "source": "query Consulta($cep: String!) { consulta(cep: $cep) { endereco, bairro, cidade, uf } }",
  "variableValues": {"cep": "01311-000"},
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

MIT © [Thiago Lagden](https://github.com/lagden)

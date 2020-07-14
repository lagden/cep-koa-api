FROM node:14.5-alpine3.12

LABEL maintainer="docker@lagden.in"

ARG NODE_ENV="development"
ARG APP_ENV="development"
ARG PORT=3000
ARG VERSION="dev"
ARG BASE="/home/node"

ENV NODE_ENV=$NODE_ENV
ENV APP_ENV=$APP_ENV
ENV PORT=$PORT
ENV VERSION=$VERSION
ENV BASE=$BASE
ENV BASE_APP=$BASE/app

WORKDIR $BASE
USER node

WORKDIR $BASE
USER node

RUN mkdir -p $BASE_APP/data
COPY . $BASE_APP

WORKDIR $BASE_APP
RUN npm ci --ignore-scripts

CMD ["node", "server"]

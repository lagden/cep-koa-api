FROM node:12.16-alpine3.11

LABEL maintainer="docker@lagden.in"

ARG PORT=3000
ARG NODE_ENV="development"
ARG VERSION="dev"
ARG BASE="/home/node"

ENV PORT=$PORT
ENV NODE_ENV=$NODE_ENV
ENV VERSION=$VERSION
ENV BASE=$BASE
ENV APP=$BASE/app

WORKDIR $BASE
USER node

RUN mkdir -p $APP/data
COPY . $APP

WORKDIR $APP
RUN npm ci --ignore-scripts

CMD ["node", "server"]

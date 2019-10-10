FROM node:12.10-alpine

LABEL maintainer="docker@lagden.in"

ARG PORT=3000
ARG NODE_ENV=development
ARG BASE=/home/node
ARG VERSION=dev

ENV NODE_ENV=$NODE_ENV
ENV PORT=$PORT
ENV BASE=$BASE
ENV VERSION=$VERSION
ENV APP=$BASE/app

USER node
WORKDIR $BASE

RUN mkdir -p $APP
COPY . $APP

WORKDIR $APP
RUN npm ci --ignore-scripts

EXPOSE $PORT

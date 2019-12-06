FROM node:12.13-alpine
LABEL maintainer="docker@lagden.in"

ARG PORT=3000
ARG NODE_ENV="development"
ARG BASE="/home/node"
ARG VERSION="dev"

ENV PORT=$PORT
ENV NODE_ENV=$NODE_ENV
ENV BASE=$BASE
ENV VERSION=$VERSION
ENV APP=$BASE/app

USER node
WORKDIR $BASE

RUN mkdir -p $APP
COPY . $APP

WORKDIR $APP
RUN npm ci --ignore-scripts
# RUN npm rb

EXPOSE $PORT

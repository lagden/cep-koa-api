FROM node:12.6-alpine
LABEL maintainer="docker@lagden.in"

ARG PORT=3000
ARG NODE_ENV=development
ARG BASE=/home/node

ENV NODE_ENV=$NODE_ENV
ENV PORT=$PORT
ENV BASE=$BASE
ENV APP=$BASE/app
ENV TZ=America/Sao_Paulo

USER node
WORKDIR $BASE

RUN mkdir -p $APP
COPY . $APP

WORKDIR $APP
RUN npm ci --ignore-scripts

EXPOSE $PORT

FROM node:12.9-alpine
LABEL maintainer="docker@lagden.in"

RUN apk --no-cache update && \
		apk --no-cache upgrade && \
		apk --no-cache add tzdata

ARG PORT=3000
ARG NODE_ENV=development
ARG BASE=/home/node
ARG TZ=America/Sao_Paulo

ENV NODE_ENV=$NODE_ENV
ENV PORT=$PORT
ENV BASE=$BASE
ENV APP=$BASE/app
ENV TZ=$TZ

RUN cp /usr/share/zoneinfo/$TZ /etc/localtime && \
		echo $TZ > /etc/timezone

USER node
WORKDIR $BASE

RUN mkdir -p $APP
COPY . $APP

WORKDIR $APP
RUN npm ci --ignore-scripts

EXPOSE $PORT

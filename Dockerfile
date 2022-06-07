# Development
# --------------------
# --------------------
FROM node:16.13-alpine3.14 as dev
LABEL maintainer="lagden@gmail.com"

# If Docker Host is Mac or Windows
ENV ENTR_INOTIFY_WORKAROUND=1
COPY --from=lagden/entr:5.0-alpine3.14 /usr/local/bin/entr /usr/local/bin/.

# Shared libraries
RUN apk add --no-cache --update libc6-compat
RUN ln -s /lib64/ld-linux-x86-64.so.2 /lib/ld-linux-x86-64.so.2

# Timezone
RUN apk add --no-cache --update tzdata
ENV TZ=America/Sao_Paulo
RUN ln -s /usr/share/zoneinfo/$TZ /etc/localtime

# Clear apk cache
RUN rm -rf /var/cache/apk/*

# Yarn
RUN yarn set version stable

ARG NODE_ENV="production"
ARG BASE="/home/node"

ENV NODE_ENV=$NODE_ENV
ENV BASE=$BASE
ENV BASE_APP=$BASE/app

WORKDIR $BASE
ADD --chown=node:node . $BASE_APP

USER node

WORKDIR $BASE_APP
RUN yarn install



# Main Backend
# --------------------
# --------------------
FROM node:16.13-alpine3.14 as main
LABEL maintainer="lagden@gmail.com"

# Shared libraries
RUN apk add --no-cache --update libc6-compat
RUN ln -s /lib64/ld-linux-x86-64.so.2 /lib/ld-linux-x86-64.so.2

# Timezone
RUN apk add --no-cache --update tzdata
ENV TZ=America/Sao_Paulo
RUN ln -s /usr/share/zoneinfo/$TZ /etc/localtime

# Clear apk cache
RUN rm -rf /var/cache/apk/*

# Yarn
RUN yarn set version stable

ARG NODE_ENV="production"
ARG BASE="/home/node"

ENV NODE_ENV=$NODE_ENV
ENV BASE=$BASE
ENV BASE_APP=$BASE/app

WORKDIR $BASE
ADD --chown=node:node . $BASE_APP

USER node

WORKDIR $BASE_APP
RUN bin/node/prod.js
RUN yarn install
RUN rm -rf bin/docker bin/local bin/node
RUN rm -rf .prettierrc* .eslintrc* .git* .yarnrc* yarn.lock

CMD ["node", "server"]

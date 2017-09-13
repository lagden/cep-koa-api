FROM node:8.5.0
MAINTAINER Thiago Lagden <docker@lagden.in>

# variáveis de ambiente
ENV DEBUG=cep-api:*
ENV NODE_ENV=production
ENV PORT=3000
ENV HOME=/home/node
ENV APP=$HOME/consulta-cep

# cria a pasta do app, copia os arquivos e ajusta as permissões
RUN mkdir $APP
COPY . $APP
RUN chown -R node:node $HOME

# troca de usuário (node) e instala os pacotes
USER node
WORKDIR $APP
RUN npm i --silent --build-from-source --progress=false --production

# libera a porta e roda o comando
EXPOSE $PORT
CMD ["node", "index.js"]

# docker exec -it cepkoa_consulta_cep bash

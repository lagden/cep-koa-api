FROM node:8.5.0

# cria o usuário lagden
RUN useradd -ms /bin/bash lagden

# seta as variáveis de ambiente
ENV HOME=/home/lagden
ENV APP=$HOME/consulta-cep

# cria a pasta do app
RUN mkdir $APP

# copia o package.json e ajusta as permissões
COPY package.json $APP/.
RUN chown -R lagden:lagden $HOME

# troca de usuário (lagden) e instala os pacotes
USER lagden
WORKDIR $APP
RUN npm i --silent --build-from-source --progress=false --production

# troca de usuário (root), copia os arquivos do app, ajusta as permissões e deleta o usuário node
USER root
COPY . $APP
RUN chown -R lagden:lagden $APP
RUN userdel -r node

# troca de usuário (lagden), libera a porta 3000 e roda o comando
USER lagden
EXPOSE 3000
CMD ["npm", "start"]

# docker exec -it cepkoa_cep bash

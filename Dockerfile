# Use uma imagem base do Node.js
FROM node:18

# Crie um diretório de trabalho
WORKDIR /app

# Copie o package.json e o package-lock.json para instalar dependências
COPY package*.json ./

# Instale Python, make e gcc para compilar pacotes nativos
RUN apt-get update && apt-get install -y python3 make g++ && \
    npm install && \
    npm rebuild bcrypt --build-from-source

# Copie o restante dos arquivos do projeto
COPY . .

# Exponha a porta da API
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]

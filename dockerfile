# Use uma imagem Node.js como base
FROM node:14

# Configurar o diretório de trabalho
WORKDIR /app

# Copiar os arquivos do aplicativo para o contêiner
COPY . .

# Instalar as dependências
RUN npm install

# Expor a porta 8080
EXPOSE 8080

# Comando para iniciar o aplicativo
CMD ["npm", "run","dev"]
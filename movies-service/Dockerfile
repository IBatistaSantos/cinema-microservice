FROM node:14

WORKDIR /usr/app

COPY ./package.json ./

RUN npm i --silent

COPY . .

RUN npm run build && \
  rm -rf src babel.config.js tsconfig.json && \
  npm prune --production

EXPOSE 3333

CMD ["npm", "start"]
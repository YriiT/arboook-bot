FROM node:12

RUN mkdir -p /arboook-bot-server/node_modules && chown -R node:node /arboook-bot

WORKDIR /arboook-bot-server

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 8080

CMD [ "node", "index.js" ]
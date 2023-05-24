FROM node:18

RUN mkdir -p /arboook-bot/node_modules && chown -R node:node /arboook-bot

WORKDIR /arboook-bot

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 8080

CMD [ "node", "index.js" ]
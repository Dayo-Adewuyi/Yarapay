FROM node:alpine

USER node

WORKDIR /home/node/code

COPY --chown=node:node . .

RUN npm ci

CMD ["npm", "run", "dev"]
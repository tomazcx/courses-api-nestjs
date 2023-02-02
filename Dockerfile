FROM node:18.12.1-alpine3.16

RUN apk add --no-cache bash
RUN npm install -g @nestjs/cli

USER node

WORKDIR /home/node/app

FROM node:current-alpine

WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json

RUN yarn install --no-lockfile

COPY . .

CMD ["yarn", "start"]
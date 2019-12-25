FROM node:12.10.0-alpine
RUN apk add --no-cache --virtual .gyp python make g++
EXPOSE 3000 9229

WORKDIR /home/app

COPY package.json /home/app/
COPY package-lock.json /home/app/

RUN npm ci

COPY . /home/app

CMD [ "node", "src/app.js" ]
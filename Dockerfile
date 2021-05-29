FROM node:14-alpine

RUN npm install -g @angular/cli

USER node

RUN mkdir -p /home/node/spoty-app

WORKDIR /home/node/spoty-app

COPY . .

RUN npm install

EXPOSE 4200

CMD [ "ng", "serve", "--host", "0.0.0.0"]


FROM node:20 as runtime

WORKDIR /app

COPY server.package.json package.json
RUN npm install

COPY dist/ dist/
COPY ssl/ ssl/
COPY server.js .
COPY .env .

FROM node:20 as build

WORKDIR /build

COPY package.json .
RUN npm install --verbose

COPY public/ public/
COPY src/ src/
COPY .eslintrc.cjs .
COPY index.html .
COPY tsconfig.json .
COPY tsconfig.node.json .
COPY vite.config.ts .

RUN npm run build

FROM node:20 as runtime

WORKDIR /app

COPY server.package.json package.json
RUN npm install --verbose

COPY --from=build /build/dist/ dist/
COPY ssl/ ssl/
COPY server.js .
COPY .env .

EXPOSE 443

CMD [ "npm", "run", "start:prod" ]

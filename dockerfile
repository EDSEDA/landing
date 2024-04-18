from node:20

WORKDIR /landing

RUN npm run buld

COPY dist dist
COPY .env .env
COPY ssl ssl

EXPOSE 443

CMD [ "NODE_ENV=prod node start.js" ]

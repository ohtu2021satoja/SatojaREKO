FROM node:15-alpine3.10

WORKDIR /usr/src/app

COPY /server/package.json .

RUN npm install --production && adduser -D appuser

USER appuser

EXPOSE 3003

CMD ["node", "/server/index.js"]
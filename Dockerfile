FROM node:15-alpine3.10

WORKDIR /usr/src/app

COPY /server .

RUN npm install --production && adduser -D appuser

USER appuser

EXPOSE 3003

EXPOSE 5432

CMD ["node", "index.js"]
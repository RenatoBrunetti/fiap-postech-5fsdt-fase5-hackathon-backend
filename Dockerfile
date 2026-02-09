FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install --silent

COPY . .

RUN npm run build

ARG NODE_ENV
ARG PORT

ENV NODE_ENV=${NODE_ENV}
ENV PORT=${PORT}

RUN echo "NODE_ENV=${NODE_ENV}" > .env
RUN echo "PORT=${PORT}" > .env

EXPOSE ${PORT}

CMD ["node", "dist/server.js"]

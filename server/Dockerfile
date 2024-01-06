FROM node:18.13.0-alpine as server_builder

WORKDIR /app

COPY package.*.json ./
COPY . .

RUN npm install
RUN npm run build




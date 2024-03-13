FROM node:16-alpine
WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY db.json .
RUN npm install
COPY . .
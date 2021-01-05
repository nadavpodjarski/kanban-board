FROM node:12-alpine

WORKDIR /app
COPY . /app
COPY package.json ./app/package.json

RUN npm install --silent

EXPOSE 3000

CMD ["npm","start"]
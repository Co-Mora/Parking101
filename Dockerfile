FROM node:10.13.0-alpine

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "prod"]

EXPOSE 80
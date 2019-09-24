FROM node:latest

WORKDIR /usr/src/api 

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3003
CMD ["npm","start"]
FROM node:14

WORKDIR /comments_app_frontend

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]
